import Link from "next/link";
import { EmptyState } from "@/features/catalog/empty-state";
export default function PurchasesPage() {
  return (
    <>
      <header className="page-heading">
        <h1>Purchase history</h1>
      </header>
      <Link className="back-link" href="/settings">
        Back to Account Settings
      </Link>
      <EmptyState
        title="No purchases in this preview"
        description="This interface has not processed a transaction. Sample library courses are not receipts or proof of purchase."
      />
      <p className="flow-footnote">
        Payments, receipts and refunds require real, separately authorized
        commerce integration.
      </p>
    </>
  );
}

export const metadata = { title: "Purchase history" };
