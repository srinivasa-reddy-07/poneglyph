import { getCurrentUser } from "@/features/auth/queries";
import { redirect } from "next/navigation";

const WorkspaceIdPage = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  return <div>Workspace Id</div>;
};

export default WorkspaceIdPage;
