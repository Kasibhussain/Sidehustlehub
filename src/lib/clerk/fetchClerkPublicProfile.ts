import { clerkClient } from "@clerk/nextjs/server";

export type ClerkPublicProfile = {
  displayName: string;
  imageUrl: string | null;
};

/**
 * Loads a user's public display info from Clerk (works for any valid `userId`).
 * Returns null if the user does not exist or the backend request fails.
 */
export async function fetchClerkPublicProfile(
  userId: string,
): Promise<ClerkPublicProfile | null> {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    const fullName = [user.firstName, user.lastName]
      .filter((p): p is string => Boolean(p && String(p).trim()))
      .join(" ")
      .trim();

    const primary = user.primaryEmailAddressId
      ? user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
      : undefined;
    const email =
      primary?.emailAddress ?? user.emailAddresses[0]?.emailAddress;

    const displayName =
      fullName ||
      (user.username && String(user.username).trim()) ||
      (email ? email.split("@")[0] : "") ||
      "Member";

    return {
      displayName,
      imageUrl: user.imageUrl,
    };
  } catch {
    return null;
  }
}
