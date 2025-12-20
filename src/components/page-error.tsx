import { AlertTriangle } from "lucide-react";

interface PageErrorProps {
  message: string;
}
const PageError = ({ message = "Something went wrong" }: PageErrorProps) => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <AlertTriangle className="size-6 text-muted-foreground mb-2" />
      <p className="text-sm font-medium text-muted-foreground">{message}</p>
    </div>
  );
};

export default PageError;
