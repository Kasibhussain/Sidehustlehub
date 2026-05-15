import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

/** Read session in server components / actions. Does not modify Clerk config. */
export async function getSession() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await currentUser();
  const name =
    user?.firstName ||
    user?.emailAddresses[0]?.emailAddress?.split("@")[0] ||
    "Member";

  return {
    userId,
    name,
    email: user?.emailAddresses[0]?.emailAddress ?? null,
  };
}

export async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return session;
}
