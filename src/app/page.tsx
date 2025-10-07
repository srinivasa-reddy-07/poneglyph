"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useCurrent } from "@/features/auth/api/use-current";
import { useLogout } from "@/features/auth/api/use-logout";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useCurrent();
  const { mutate } = useLogout();

  useEffect(() => {
    if (!isLoading && !data) {
      router.push("/sign-in");
    }
  }, [data]);

  return (
    <div className="text-2xl flex flex-col items-center justify-center h-screen gap-4">
      Only Authenticated Users can see this page
      <Button variant={"destructive"} onClick={() => mutate()}>
        Logout
      </Button>
    </div>
  );
}
