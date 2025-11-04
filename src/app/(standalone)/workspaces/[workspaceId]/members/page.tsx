import { getCurrentUser } from "@/features/auth/queries";
import WorkspaceMembersList from "@/features/workspaces/components/workspace-members-list";
import { redirect } from "next/navigation";

const WorkspaceMembersPage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="w-full lg:max-w-xl">
      <WorkspaceMembersList />
    </div>
  );
};

export default WorkspaceMembersPage;
