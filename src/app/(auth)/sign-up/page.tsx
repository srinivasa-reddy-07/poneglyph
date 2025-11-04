import { redirect } from "next/navigation";

import SignUpCard from "@/features/auth/components/sign-up-card";
import { getCurrentUser } from "@/features/auth/queries";

const SignUpPage = async () => {
  const user = await getCurrentUser();

  if (user) redirect("/");

  return <SignUpCard />;
};

export default SignUpPage;
