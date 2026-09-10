import { Card } from "../../components/ui";
import PageFrame from "../PageFrame";

export default function AffiliateDisclosure() {
  return (
    <PageFrame title="Affiliate disclosure" intro="Transparency matters: here is how retailer links on Webzark Marketplace work.">
      <Card className="max-w-3xl p-7 sm:p-10">
        <div className="space-y-7 text-base leading-7 text-muted">
          <section><h2 className="font-display text-xl font-extrabold tracking-[-.03em] text-navy">How we may earn money</h2><p className="mt-2">Some links to retailers are affiliate links. If you make a qualifying purchase after using one, Webzark may receive a commission at no additional cost to you.</p></section>
          <section><h2 className="font-display text-xl font-extrabold tracking-[-.03em] text-navy">Retailers handle your purchase</h2><p className="mt-2">Webzark is a comparison and discovery service, not the seller. Price, inventory, delivery, payment, returns, warranties, and customer support are controlled by the retailer you choose.</p></section>
          <section><h2 className="font-display text-xl font-extrabold tracking-[-.03em] text-navy">Check before you buy</h2><p className="mt-2">Guide prices and product details can change. Always confirm the current information and the retailer&apos;s terms before completing a purchase.</p></section>
        </div>
      </Card>
    </PageFrame>
  );
}
