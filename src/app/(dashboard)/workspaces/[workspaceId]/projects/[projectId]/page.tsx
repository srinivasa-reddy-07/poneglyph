import { getCurrentUser } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import ProjectIdClient from "./client";

const ProjectPage = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  return <ProjectIdClient />
};

export default ProjectPage;
