// "use client";

// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { DottedSeparator } from "@/components/dotted-separator";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
// import { cn } from "@/lib/utils";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { useCreateTask } from "../api/use-create-task";
// import { createTaskSchema } from "../schemas";
// import DatePicker from "@/components/date-picker";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { MemberAvatar } from "@/features/members/components/member-avatar";
// import { TaskStatus } from "../types";
// import { ProjectAvatar } from "@/features/projects/components/project-avatar";
// import { useRouter } from "next/navigation";

// interface CreateTaskFormProps {
//   onCancel?: () => void;
//   projectOptions: { id: string; name: string; imageUrl: string }[];
//   memberOptions: { id: string; name: string }[];
// }

// export const CreateTaskForm = ({
//   onCancel,
//   projectOptions,
//   memberOptions,
// }: CreateTaskFormProps) => {
//   const router = useRouter()
//   const { mutate, isPending } = useCreateTask();
//   const workspaceId = useWorkspaceId();

//   const form = useForm<z.infer<typeof createTaskSchema>>({
//     resolver: zodResolver(createTaskSchema.omit({ workspaceId: true })),
//     defaultValues: {
//       workspaceId,
//       name: "",
//       description: "",
//       status: TaskStatus.TODO,
//       assigneeId: "",
//       projectId: "",
//       dueDate: undefined, 
//     },
//   });

//   const onSubmit = (values: z.infer<typeof createTaskSchema>) => {
//     mutate(
//       { json: { ...values, workspaceId } },
//       {
//         onSuccess: ({ data }) => {
//           form.reset();
//           router.push(`/workspaces/${workspaceId}/tasks/${data.$id}`)
//           // onCancel?.();
//         },
//       }
//     );
//   };

//   return (
//     <Card className="w-full h-full border-none shadow-none">
//       <CardHeader className="flex p-7">
//         <CardTitle className="text-xl font-bold">Create a new Task</CardTitle>
//       </CardHeader>

//       <div className="px-7">
//         <DottedSeparator />
//       </div>
//       <CardContent className="p-7">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <div className="flex flex-col gap-y-4">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Task Name</FormLabel>
//                     <FormControl>
//                       <Input {...field} placeholder="Enter task name" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Descripton field  */}
//               <FormField
//                 control={form.control}
//                 name="description"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Task Description (Optional)</FormLabel>
//                     <FormControl>
//                       <Input {...field} placeholder="Enter task description" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Date Field  */}
//               <FormField
//                 control={form.control}
//                 name="dueDate"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Due date</FormLabel>
//                     <FormControl>
//                       <DatePicker {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="assigneeId"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Assignee</FormLabel>
//                     <Select
//                       defaultValue={field.value}
//                       onValueChange={field.onChange}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select Assignee" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <FormMessage />
//                       <SelectContent>
//                         {memberOptions.map((member) => (
//                           <SelectItem
//                             key={member.id}
//                             value={member.id}
//                             className="cursor-pointer"
//                           >
//                             <div className="flex items-center gap-x-2">
//                               <MemberAvatar
//                                 className="size-6"
//                                 name={member.name}
//                               />
//                               {member.name}
//                             </div>
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </FormItem>
//                 )}
//               />

//               {/* Status field  */}
//               <FormField
//                 control={form.control}
//                 name="status"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Status</FormLabel>
//                     <Select
//                       defaultValue={field.value}
//                       onValueChange={field.onChange}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select status" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <FormMessage />
//                       <SelectContent>
//                         <SelectItem
//                           className="cursor-pointer"
//                           value={TaskStatus.BACKLOG}
//                         >
//                           Backlog
//                         </SelectItem>
//                         <SelectItem
//                           className="cursor-pointer"
//                           value={TaskStatus.IN_PROGRESS}
//                         >
//                           In Progress
//                         </SelectItem>
//                         <SelectItem
//                           className="cursor-pointer"
//                           value={TaskStatus.IN_REVIEW}
//                         >
//                           In Review
//                         </SelectItem>
//                         <SelectItem
//                           className="cursor-pointer"
//                           value={TaskStatus.TODO}
//                         >
//                           Todo
//                         </SelectItem>
//                         <SelectItem
//                           className="cursor-pointer"
//                           value={TaskStatus.DONE}
//                         >
//                           Done
//                         </SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="projectId"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Project</FormLabel>
//                     <Select
//                       defaultValue={field.value}
//                       onValueChange={field.onChange}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select Project" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <FormMessage />
//                       <SelectContent>
//                         {projectOptions.map((project) => (
//                           <SelectItem
//                             key={project.id}
//                             value={project.id}
//                             className="cursor-pointer"
//                           >
//                             <div className="flex items-center gap-x-2">
//                               <ProjectAvatar
//                                 className="size-6"
//                                 name={project.name}
//                                 image={project.imageUrl}
//                               />
//                               {project.name}
//                             </div>
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <DottedSeparator className="py-7" />
//             {/* Modal Buttons */}
//             <div className="flex items-center justify-between">
//               <Button
//                 type="button"
//                 size={"lg"}
//                 variant={"secondary"}
//                 onClick={onCancel}
//                 disabled={isPending}
//                 className={cn(!onCancel && "invisible")}
//               >
//                 Cancel
//               </Button>
//               <Button type="submit" size={"lg"} disabled={isPending}>
//                 Create Task
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// };


"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateTask } from "../api/use-create-task";
import { createTaskSchema } from "../schemas";
import DatePicker from "@/components/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { TaskStatus } from "../types";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";

interface CreateTaskFormProps {
  onCancel?: () => void;
  projectOptions: { id: string; name: string; imageUrl?: string }[];
  memberOptions: { id: string; name: string }[];
}

export const CreateTaskForm = ({
  onCancel,
  projectOptions,
  memberOptions,
}: CreateTaskFormProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useCreateTask();

  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema.omit({ workspaceId: true })),
    defaultValues: {
      workspaceId,
      name: "",
      description: "",
      status: TaskStatus.TODO,
      assigneeId: "",
      projectId: "",
      dueDate: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof createTaskSchema>) => {
    mutate(
      { json: { ...values, workspaceId } },
      {
        onSuccess: ({ data }) => {
          form.reset();
          // Navigate to the newly created task
          router.push(`/workspaces/${workspaceId}/tasks/${data.$id}`);
          // onCancel?.();
        },
      }
    );
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">Create a new Task</CardTitle>
      </CardHeader>

      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter task name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Description (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter task description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due date</FormLabel>
                    <FormControl>
                      <DatePicker {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assigneeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignee</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Assignee" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        {memberOptions.map((member) => (
                          <SelectItem
                            key={member.id}
                            value={member.id}
                            className="cursor-pointer"
                          >
                            <div className="flex items-center gap-x-2">
                              <MemberAvatar
                                className="size-6"
                                name={member.name}
                              />
                              {member.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        <SelectItem value={TaskStatus.BACKLOG}>Backlog</SelectItem>
                        <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
                        <SelectItem value={TaskStatus.IN_REVIEW}>In Review</SelectItem>
                        <SelectItem value={TaskStatus.TODO}>Todo</SelectItem>
                        <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Project" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        {projectOptions.map((project) => (
                          <SelectItem
                            key={project.id}
                            value={project.id}
                            className="cursor-pointer"
                          >
                            <div className="flex items-center gap-x-2">
                              <ProjectAvatar
                                className="size-6"
                                name={project.name}
                                image={project.imageUrl}
                              />
                              {project.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <DottedSeparator className="py-7" />
            <div className="flex items-center justify-between">
              <Button
                type="button"
                size="lg"
                variant="secondary"
                onClick={onCancel}
                disabled={isPending}
                className={cn(!onCancel && "invisible")}
              >
                Cancel
              </Button>
              <Button type="submit" size="lg" disabled={isPending}>
                Create Task
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};