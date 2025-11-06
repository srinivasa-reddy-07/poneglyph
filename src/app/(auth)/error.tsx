"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="flex h-screen flex-col justify-center items-center gap-y-4">
      <AlertTriangle className="size-10" />
      <p className="text-md">Something went wrong</p>
      <Button variant={"secondary"} asChild>
        <Link href={"/"}>Return to Home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
