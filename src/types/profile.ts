export type WorkerProfile = {
  userId: string;
  displayName: string;
  bio: string;
  skills: string[];
  location: string;
  photoUrl: string | null;
  portfolioUrls: string[];
  availabilityNote: string;
  /** km from location; null = remote / not specified */
  serviceRadiusKm: number | null;
};

export type CreateProfileInput = Omit<WorkerProfile, "userId">;
