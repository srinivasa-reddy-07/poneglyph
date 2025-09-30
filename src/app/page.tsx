import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="m-10 flex gap-4">
      <Button variant="default">
        Primary
      </Button>
      <Button variant="destructive">
        Destructive
      </Button>
      <Button variant="tertiary">
        Secondary
      </Button>
    </div>
  )
}
