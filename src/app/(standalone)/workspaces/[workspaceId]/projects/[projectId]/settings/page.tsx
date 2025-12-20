import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/features/auth/queries';

import ProjectSettingsClient from './client';

const ProjectSettingsPage = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  return <ProjectSettingsClient />
};

export default ProjectSettingsPage;
