import Link from "next/link";
import { Page } from "@/components/Page";

export default function NotFound() {
  return (
    <Page label="404" title="command not found">
      <p className="-mt-6 max-w-xl font-mono text-muted">
        <span className="text-accent">$</span> open this-page<br />
        open: this-page: not found
      </p>
      <p className="mt-6">
        <Link href="/" className="text-accent underline underline-offset-4">
          cd ~
        </Link>{" "}
        <span className="text-muted">or press Ctrl K and ask the terminal.</span>
      </p>
    </Page>
  );
}
