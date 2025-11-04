"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useJoinWorkspace } from "../api/use-join-workspace";
import { useInviteCode } from "../hooks/use-invite-code";
import { useWorkspaceId } from "../hooks/use-workspace-id";

interface JoinWorkspaceFormProps {
  initialValues: {
    name: string;
  };
}

const JoinWorkspaceForm = ({ initialValues }: JoinWorkspaceFormProps) => {
  const router = useRouter();
  const { mutate, isPending } = useJoinWorkspace();
  const inviteCode = useInviteCode();
  const workspaceId = useWorkspaceId();

  const handleJoinWorkspace = () => {
    mutate(
      {
        param: { workspaceId },
        json: { code: inviteCode },
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join Workspace</CardTitle>
        <CardDescription>
          You&apos;ve been invited to join the{" "}
          <strong>{initialValues.name}</strong> workspace.
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator className="p-7" />
      </div>
      <CardContent className="p-7">
        <div className="flex flex-col gap-2 items-center justify-between lg:flex-row">
          <Button
            className="w-full lg:w-fit"
            type="button"
            variant={"secondary"}
            asChild
            size={"lg"}
            disabled={isPending}
          >
            <Link href={"/"}>Cancel</Link>
          </Button>
          <Button
            className="w-full lg:w-fit"
            type="button"
            size={"lg"}
            onClick={handleJoinWorkspace}
            disabled={isPending}
          >
            Join Workspace
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JoinWorkspaceForm;
