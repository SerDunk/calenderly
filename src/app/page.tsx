import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <Container>
      <div className="flex flex-col justify-center items-center w-full h-screen gap-6">
        <div>
          <h1 className="text-4xl font-bold text-center p-2">Calenderly</h1>
        </div>
        <div className="text-xl">
          <p>Dynamic UI Calender to keep track of events</p>
        </div>
        <div>
          <Button asChild className="rounded">
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
