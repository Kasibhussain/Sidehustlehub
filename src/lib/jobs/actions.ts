"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSession } from "@/lib/session";
import type {
  CreateJobInput,
  EngagementType,
  PayType,
  Urgency,
} from "@/types/job";
import type { CreateProfileInput } from "@/types/profile";
import type { CreateServiceInput } from "@/types/service";
import { jobsStore } from "./store";

export type JobActionState = { error: string } | null;

function parsePayType(v: FormDataEntryValue | null): PayType {
  const s = String(v ?? "fixed");
  if (s === "hourly") return "hourly";
  if (s === "offer") return "offer";
  return "fixed";
}

function parseEngagementType(v: FormDataEntryValue | null): EngagementType {
  return String(v ?? "one_off") === "ongoing" ? "ongoing" : "one_off";
}

function parseUrgency(v: FormDataEntryValue | null): Urgency {
  return String(v ?? "flexible") === "asap" ? "asap" : "flexible";
}

function parseOptionalNumber(v: FormDataEntryValue | null): number | null {
  const s = String(v ?? "").trim();
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function parseRequiredNumber(
  v: FormDataEntryValue | null,
): { ok: true; value: number } | { ok: false } {
  const s = String(v ?? "").trim();
  if (!s) return { ok: false };
  const n = Number(s);
  if (!Number.isFinite(n)) return { ok: false };
  return { ok: true, value: n };
}

function parseDeadline(v: FormDataEntryValue | null): string | null {
  const s = String(v ?? "").trim();
  if (!s) return null;
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

export async function createJobAction(
  _prevState: JobActionState,
  formData: FormData,
): Promise<JobActionState> {
  const session = await requireSession();

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "");
  const subcategoryRaw = String(formData.get("subcategory") ?? "").trim();
  const subcategory = subcategoryRaw || null;
  const location = String(formData.get("location") ?? "").trim();
  const payType = parsePayType(formData.get("payType"));
  const payAmountParsed = parseRequiredNumber(formData.get("payAmount"));
  const payAmountMax = parseOptionalNumber(formData.get("payAmountMax"));
  const deadlineAt = parseDeadline(formData.get("deadlineAt"));
  const engagementType = parseEngagementType(formData.get("engagementType"));
  const urgency = parseUrgency(formData.get("urgency"));

  if (!title || !description || !category || !location) {
    return { error: "Please fill in all required fields." };
  }

  let payAmount: number;
  if (payType === "offer") {
    if (!payAmountParsed.ok) {
      payAmount = 0;
    } else {
      payAmount = Math.max(0, payAmountParsed.value);
    }
  } else {
    if (!payAmountParsed.ok || payAmountParsed.value <= 0) {
      return { error: "Enter a valid pay amount." };
    }
    payAmount = payAmountParsed.value;
  }

  if (
    payAmountMax != null &&
    payAmountMax > 0 &&
    payAmountMax < payAmount &&
    payType !== "offer"
  ) {
    return { error: "Maximum budget must be at least the main amount." };
  }

  const input: CreateJobInput = {
    title,
    description,
    category,
    subcategory,
    location,
    payType,
    payAmount,
    payAmountMax:
      payAmountMax != null && payAmountMax > 0 ? payAmountMax : null,
    deadlineAt,
    engagementType,
    urgency,
  };

  const job = jobsStore.createJob(input, {
    id: session.userId,
    name: session.name,
  });
  revalidatePath("/jobs");
  revalidatePath("/dashboard");
  redirect(`/jobs/${job.id}`);
}

export async function applyToJobAction(
  _prevState: JobActionState,
  formData: FormData,
): Promise<JobActionState> {
  const session = await requireSession();
  const jobId = String(formData.get("jobId") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const proposedRaw = parseOptionalNumber(formData.get("proposedAmount"));

  if (!jobId) {
    return { error: "Missing job." };
  }
  if (message.length < 20) {
    return {
      error:
        "Tell the poster a bit more about yourself (at least 20 characters).",
    };
  }

  const job = jobsStore.getJob(jobId);
  if (!job) {
    return { error: "Job not found." };
  }
  if (job.status !== "open") {
    return { error: "This job is no longer accepting applications." };
  }
  if (job.posterId === session.userId) {
    return { error: "You cannot apply to your own job." };
  }

  if (job.payType === "offer") {
    if (proposedRaw == null || proposedRaw <= 0) {
      return { error: "Enter your proposed quote in £ for this job." };
    }
  }

  const proposedAmount =
    proposedRaw != null && proposedRaw > 0 ? proposedRaw : null;

  try {
    jobsStore.apply(
      { jobId, message, proposedAmount },
      { id: session.userId, name: session.name },
    );
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Could not submit application.",
    };
  }

  revalidatePath(`/jobs/${jobId}`);
  revalidatePath("/dashboard");
  redirect(`/jobs/${jobId}?applied=1`);
}

export async function closeJobFormAction(
  _prev: JobActionState,
  formData: FormData,
): Promise<JobActionState> {
  const jobId = String(formData.get("jobId") ?? "").trim();
  if (!jobId) {
    return { error: "Missing job." };
  }

  const session = await requireSession();
  const job = jobsStore.closeJob(jobId, session.userId);

  if (!job) {
    return { error: "Job not found or you are not the poster." };
  }

  revalidatePath(`/jobs/${jobId}`);
  revalidatePath("/jobs");
  revalidatePath("/dashboard");
  redirect(`/jobs/${jobId}`);
}

export async function acceptApplicationFormAction(
  _prev: JobActionState,
  formData: FormData,
): Promise<JobActionState> {
  const jobId = String(formData.get("jobId") ?? "").trim();
  const applicationId = String(formData.get("applicationId") ?? "").trim();
  if (!jobId || !applicationId) {
    return { error: "Missing application." };
  }

  const session = await requireSession();
  const result = jobsStore.acceptApplication(
    jobId,
    applicationId,
    session.userId,
  );
  if ("error" in result) {
    return { error: result.error };
  }

  revalidatePath(`/jobs/${jobId}`);
  revalidatePath("/dashboard");
  redirect(`/jobs/${jobId}`);
}

export async function rejectApplicationFormAction(
  _prev: JobActionState,
  formData: FormData,
): Promise<JobActionState> {
  const jobId = String(formData.get("jobId") ?? "").trim();
  const applicationId = String(formData.get("applicationId") ?? "").trim();
  if (!jobId || !applicationId) {
    return { error: "Missing application." };
  }

  const session = await requireSession();
  const result = jobsStore.rejectApplication(
    jobId,
    applicationId,
    session.userId,
  );
  if ("error" in result) {
    return { error: result.error };
  }

  revalidatePath(`/jobs/${jobId}`);
  revalidatePath("/dashboard");
  redirect(`/jobs/${jobId}`);
}

export async function saveProfileAction(
  _prev: JobActionState,
  formData: FormData,
): Promise<JobActionState> {
  const session = await requireSession();

  const displayName = String(formData.get("displayName") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const skillsRaw = String(formData.get("skills") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const photoUrlRaw = String(formData.get("photoUrl") ?? "").trim();
  const photoUrl = photoUrlRaw || null;
  const portfolioRaw = String(formData.get("portfolioUrls") ?? "").trim();
  const portfolioUrls = portfolioRaw
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  const availabilityNote = String(
    formData.get("availabilityNote") ?? "",
  ).trim();
  const radiusParsed = parseOptionalNumber(formData.get("serviceRadiusKm"));

  if (!displayName) {
    return { error: "Display name is required." };
  }

  const data: CreateProfileInput = {
    displayName,
    bio,
    skills: skillsRaw
      ? skillsRaw.split(",").map((s) => s.trim()).filter(Boolean)
      : [],
    location,
    photoUrl,
    portfolioUrls,
    availabilityNote,
    serviceRadiusKm:
      radiusParsed != null && radiusParsed > 0 ? radiusParsed : null,
  };

  jobsStore.upsertProfile(session.userId, data);

  revalidatePath("/profile");
  revalidatePath("/dashboard");
  revalidatePath(`/u/${session.userId}`);
  redirect("/profile?saved=1");
}

export async function createServiceAction(
  _prev: JobActionState,
  formData: FormData,
): Promise<JobActionState> {
  const session = await requireSession();

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "");
  const subcategoryRaw = String(formData.get("subcategory") ?? "").trim();
  const subcategory = subcategoryRaw || null;
  const priceParsed = parseRequiredNumber(formData.get("price"));
  const deliveryNoteRaw = String(formData.get("deliveryNote") ?? "").trim();
  const deliveryNote = deliveryNoteRaw || null;

  if (!title || !description || !category) {
    return { error: "Please fill in all required fields." };
  }
  if (!priceParsed.ok || priceParsed.value <= 0) {
    return { error: "Enter a valid price." };
  }

  const input: CreateServiceInput = {
    title,
    description,
    category,
    subcategory,
    price: priceParsed.value,
    deliveryNote,
  };

  const service = jobsStore.createService(input, {
    id: session.userId,
    name: session.name,
  });

  revalidatePath("/services");
  revalidatePath("/dashboard");
  revalidatePath(`/u/${session.userId}`);
  redirect(`/services/${service.id}`);
}
