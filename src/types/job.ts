export type JobStatus = "open" | "closed" | "assigned";
export type PayType = "fixed" | "hourly" | "offer";
export type JobSort = "newest" | "budget_high" | "budget_low" | "deadline_soon";

export type ApplicationStatus = "pending" | "accepted" | "rejected";
export type EngagementType = "one_off" | "ongoing";
export type Urgency = "asap" | "flexible";

export type Job = {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory: string | null;
  location: string;
  payType: PayType;
  /** Minimum or single budget (£). For `offer`, often 0. */
  payAmount: number;
  /** Upper bound for budget range; null if single figure */
  payAmountMax: number | null;
  deadlineAt: string | null;
  engagementType: EngagementType;
  urgency: Urgency;
  status: JobStatus;
  posterId: string;
  posterName: string;
  createdAt: string;
};

export type Application = {
  id: string;
  jobId: string;
  applicantId: string;
  applicantName: string;
  message: string;
  /** Quote / proposed amount in £ when bidding */
  proposedAmount: number | null;
  /** Optional one-line contact hint for the poster (e.g. phone, email). */
  contactNote: string | null;
  status: ApplicationStatus;
  createdAt: string;
};

export type CreateJobInput = {
  title: string;
  description: string;
  category: string;
  subcategory: string | null;
  location: string;
  payType: PayType;
  payAmount: number;
  payAmountMax: number | null;
  deadlineAt: string | null;
  engagementType: EngagementType;
  urgency: Urgency;
};

export type CreateApplicationInput = {
  jobId: string;
  message: string;
  proposedAmount: number | null;
  contactNote: string | null;
};
