import type {
  Application,
  CreateApplicationInput,
  CreateJobInput,
  EngagementType,
  Job,
  Urgency,
} from "@/types/job";
import type { WorkerProfile } from "@/types/profile";
import type { CreateServiceInput, Service } from "@/types/service";
import { JOB_CATEGORIES } from "./constants";

const SEED_JOBS: Job[] = [
  {
    id: "job_seed_1",
    title: "Flat-pack furniture assembly",
    description:
      "IKEA desk and two bookcases. Tools provided on site. Estimated 3–4 hours.",
    category: "Moving & lifting",
    subcategory: "Assembly",
    location: "Manchester, M1",
    payType: "fixed",
    payAmount: 85,
    payAmountMax: null,
    deadlineAt: null,
    engagementType: "one_off",
    urgency: "flexible",
    status: "open",
    posterId: "seed_poster_1",
    posterName: "Alex",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "job_seed_2",
    title: "Weekend flyer distribution",
    description:
      "Distribute 500 flyers around the Northern Quarter. Must complete by Sunday 6pm.",
    category: "Delivery & errands",
    subcategory: "Same-day",
    location: "Manchester city centre",
    payType: "fixed",
    payAmount: 60,
    payAmountMax: 80,
    deadlineAt: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(),
    engagementType: "one_off",
    urgency: "asap",
    status: "open",
    posterId: "seed_poster_2",
    posterName: "Sam",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "job_seed_3",
    title: "Social content batch edit",
    description:
      "Edit 8 short-form clips (captions, light colour grade). Remote, Reels/TikTok format.",
    category: "Creative",
    subcategory: "Video",
    location: "Remote",
    payType: "hourly",
    payAmount: 25,
    payAmountMax: null,
    deadlineAt: null,
    engagementType: "ongoing",
    urgency: "flexible",
    status: "open",
    posterId: "seed_poster_1",
    posterName: "Alex",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "job_seed_4",
    title: "Office deep clean — make an offer",
    description:
      "Small co-working space (~80 sqm). Prefer evenings or weekends. Send your quote.",
    category: "Cleaning",
    subcategory: "Office",
    location: "Stockport",
    payType: "offer",
    payAmount: 0,
    payAmountMax: null,
    deadlineAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(),
    engagementType: "one_off",
    urgency: "flexible",
    status: "open",
    posterId: "seed_poster_2",
    posterName: "Sam",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
];

const SEED_SERVICES: Service[] = [
  {
    id: "svc_seed_1",
    sellerId: "seed_poster_1",
    sellerName: "Alex",
    title: "I will design a simple logo (3 concepts)",
    description:
      "Includes 3 black-and-white concepts, one revision round, and final PNG/SVG.",
    category: "Design",
    subcategory: "Branding",
    price: 120,
    deliveryNote: "5-day turnaround",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: "svc_seed_2",
    sellerId: "seed_poster_2",
    sellerName: "Sam",
    title: "I will run your errands in central Manchester (2h)",
    description:
      "Shopping pickup, post office, light admin. Within 5km of Northern Quarter.",
    category: "Delivery & errands",
    subcategory: "Shopping",
    price: 35,
    deliveryNote: "Book 24h ahead",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

const SEED_PROFILES: WorkerProfile[] = [
  {
    userId: "seed_poster_1",
    displayName: "Alex",
    bio: "Designer and handy problem-solver. 5+ years helping local businesses.",
    skills: ["Design", "Video", "Assembly"],
    location: "Manchester",
    photoUrl: null,
    portfolioUrls: ["https://example.com/portfolio"],
    availabilityNote: "Evenings and weekends",
    serviceRadiusKm: 15,
  },
  {
    userId: "seed_poster_2",
    displayName: "Sam",
    bio: "Reliable for delivery, events, and cleaning coordination.",
    skills: ["Delivery", "Events", "Cleaning"],
    location: "Greater Manchester",
    photoUrl: null,
    portfolioUrls: [],
    availabilityNote: "Weekends preferred",
    serviceRadiusKm: 20,
  },
];

export type JobListFilters = {
  category?: string;
  subcategory?: string;
  status?: Job["status"];
  search?: string;
  urgency?: Urgency;
  engagementType?: EngagementType;
  payType?: Job["payType"];
};

class MarketplaceStore {
  private jobs: Job[] = [...SEED_JOBS];
  private applications: Application[] = [];
  private services: Service[] = [...SEED_SERVICES];
  private profiles = new Map<string, WorkerProfile>(
    SEED_PROFILES.map((p) => [p.userId, p]),
  );

  listJobs(filters?: JobListFilters): Job[] {
    let result = [...this.jobs].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    if (filters?.category) {
      result = result.filter((j) => j.category === filters.category);
    }
    if (filters?.subcategory) {
      result = result.filter((j) => j.subcategory === filters.subcategory);
    }
    if (filters?.status) {
      result = result.filter((j) => j.status === filters.status);
    }
    if (filters?.urgency) {
      result = result.filter((j) => j.urgency === filters.urgency);
    }
    if (filters?.engagementType) {
      result = result.filter(
        (j) => j.engagementType === filters.engagementType,
      );
    }
    if (filters?.payType) {
      result = result.filter((j) => j.payType === filters.payType);
    }
    if (filters?.search?.trim()) {
      const q = filters.search.trim().toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q) ||
          j.category.toLowerCase().includes(q),
      );
    }

    return result;
  }

  getJob(id: string): Job | undefined {
    return this.jobs.find((j) => j.id === id);
  }

  createJob(input: CreateJobInput, poster: { id: string; name: string }): Job {
    const job: Job = {
      id: `job_${crypto.randomUUID()}`,
      ...input,
      status: "open",
      posterId: poster.id,
      posterName: poster.name,
      createdAt: new Date().toISOString(),
    };
    this.jobs.unshift(job);
    return job;
  }

  closeJob(jobId: string, posterId: string): Job | null {
    const job = this.jobs.find((j) => j.id === jobId && j.posterId === posterId);
    if (!job) return null;
    if (job.status === "closed") return job;
    job.status = "closed";
    return job;
  }

  listByPoster(posterId: string): Job[] {
    return this.listJobs().filter((j) => j.posterId === posterId);
  }

  apply(
    input: CreateApplicationInput,
    applicant: { id: string; name: string },
  ): Application {
    const job = this.getJob(input.jobId);
    if (!job || job.status !== "open") {
      throw new Error("This job is not accepting applications.");
    }
    const existing = this.applications.find(
      (a) => a.jobId === input.jobId && a.applicantId === applicant.id,
    );
    if (existing) {
      throw new Error("You have already applied to this job.");
    }

    const application: Application = {
      id: `app_${crypto.randomUUID()}`,
      jobId: input.jobId,
      applicantId: applicant.id,
      applicantName: applicant.name,
      message: input.message,
      proposedAmount: input.proposedAmount,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    this.applications.unshift(application);
    return application;
  }

  acceptApplication(
    jobId: string,
    applicationId: string,
    posterId: string,
  ): { ok: true } | { error: string } {
    const job = this.jobs.find((j) => j.id === jobId);
    if (!job || job.posterId !== posterId) {
      return { error: "Job not found or you are not the poster." };
    }
    if (job.status !== "open") {
      return { error: "This job is not open for new decisions." };
    }
    const app = this.applications.find(
      (a) => a.id === applicationId && a.jobId === jobId,
    );
    if (!app || app.status !== "pending") {
      return { error: "Application not found or already resolved." };
    }

    app.status = "accepted";
    for (const a of this.applications) {
      if (a.jobId === jobId && a.id !== applicationId && a.status === "pending") {
        a.status = "rejected";
      }
    }
    job.status = "assigned";
    return { ok: true };
  }

  rejectApplication(
    jobId: string,
    applicationId: string,
    posterId: string,
  ): { ok: true } | { error: string } {
    const job = this.jobs.find((j) => j.id === jobId);
    if (!job || job.posterId !== posterId) {
      return { error: "Job not found or you are not the poster." };
    }
    const app = this.applications.find(
      (a) => a.id === applicationId && a.jobId === jobId,
    );
    if (!app || app.status !== "pending") {
      return { error: "Application not found or already resolved." };
    }
    app.status = "rejected";
    return { ok: true };
  }

  listApplicationsForJob(jobId: string): Application[] {
    return this.applications
      .filter((a) => a.jobId === jobId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }

  listApplicationsByApplicant(applicantId: string): Application[] {
    return this.applications
      .filter((a) => a.applicantId === applicantId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }

  countApplicationsForJob(jobId: string): number {
    return this.applications.filter((a) => a.jobId === jobId).length;
  }

  hasApplied(jobId: string, applicantId: string): boolean {
    return this.applications.some(
      (a) => a.jobId === jobId && a.applicantId === applicantId,
    );
  }

  getProfile(userId: string): WorkerProfile | undefined {
    return this.profiles.get(userId);
  }

  upsertProfile(userId: string, data: Omit<WorkerProfile, "userId">): WorkerProfile {
    const next: WorkerProfile = { userId, ...data };
    this.profiles.set(userId, next);
    return next;
  }

  listServices(filters?: { category?: string; search?: string }): Service[] {
    let result = [...this.services].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    if (filters?.category) {
      result = result.filter((s) => s.category === filters.category);
    }
    if (filters?.search?.trim()) {
      const q = filters.search.trim().toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q),
      );
    }
    return result;
  }

  getService(id: string): Service | undefined {
    return this.services.find((s) => s.id === id);
  }

  createService(
    input: CreateServiceInput,
    seller: { id: string; name: string },
  ): Service {
    const service: Service = {
      id: `svc_${crypto.randomUUID()}`,
      sellerId: seller.id,
      sellerName: seller.name,
      ...input,
      createdAt: new Date().toISOString(),
    };
    this.services.unshift(service);
    return service;
  }

  listServicesBySeller(sellerId: string): Service[] {
    return this.listServices().filter((s) => s.sellerId === sellerId);
  }
}

const globalStore = globalThis as typeof globalThis & {
  __marketplaceStore?: MarketplaceStore;
};

function getStore(): MarketplaceStore {
  if (!globalStore.__marketplaceStore) {
    globalStore.__marketplaceStore = new MarketplaceStore();
  }
  return globalStore.__marketplaceStore;
}

export const jobsStore = {
  categories: JOB_CATEGORIES,
  listJobs: (filters?: JobListFilters) => getStore().listJobs(filters),
  getJob: (id: string) => getStore().getJob(id),
  createJob: (input: CreateJobInput, poster: { id: string; name: string }) =>
    getStore().createJob(input, poster),
  closeJob: (jobId: string, posterId: string) =>
    getStore().closeJob(jobId, posterId),
  listByPoster: (posterId: string) => getStore().listByPoster(posterId),
  apply: (
    input: CreateApplicationInput,
    applicant: { id: string; name: string },
  ) => getStore().apply(input, applicant),
  acceptApplication: (
    jobId: string,
    applicationId: string,
    posterId: string,
  ) => getStore().acceptApplication(jobId, applicationId, posterId),
  rejectApplication: (
    jobId: string,
    applicationId: string,
    posterId: string,
  ) => getStore().rejectApplication(jobId, applicationId, posterId),
  listApplicationsForJob: (jobId: string) =>
    getStore().listApplicationsForJob(jobId),
  listApplicationsByApplicant: (applicantId: string) =>
    getStore().listApplicationsByApplicant(applicantId),
  countApplicationsForJob: (jobId: string) =>
    getStore().countApplicationsForJob(jobId),
  hasApplied: (jobId: string, applicantId: string) =>
    getStore().hasApplied(jobId, applicantId),
  getProfile: (userId: string) => getStore().getProfile(userId),
  upsertProfile: (userId: string, data: Omit<WorkerProfile, "userId">) =>
    getStore().upsertProfile(userId, data),
  listServices: (filters?: { category?: string; search?: string }) =>
    getStore().listServices(filters),
  getService: (id: string) => getStore().getService(id),
  createService: (
    input: CreateServiceInput,
    seller: { id: string; name: string },
  ) => getStore().createService(input, seller),
  listServicesBySeller: (sellerId: string) =>
    getStore().listServicesBySeller(sellerId),
};
