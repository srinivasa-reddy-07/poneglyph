import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/features/auth/queries';

import WorkspaceIdJoinClient from './client';


const WorkspaceIdJoinPage = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  return <WorkspaceIdJoinClient />
};

export default WorkspaceIdJoinPage;
