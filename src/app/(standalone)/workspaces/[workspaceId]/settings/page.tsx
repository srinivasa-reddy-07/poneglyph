import { getCurrentUser } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import WorkspaceSettingsPageClient from "./client";

const WorkspaceIdSettingsPage = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  return <WorkspaceSettingsPageClient />
};

export default WorkspaceIdSettingsPage;
