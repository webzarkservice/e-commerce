import { Button, Card } from "../../components/ui";
import PageFrame from "../PageFrame";

export default function Account() {
  const logout = () => {
    localStorage.removeItem("webzark-auth");
    window.location.href = "/login";
  };

  return (
    <PageFrame title="Your account" intro="Manage your profile, orders, and purchasing details.">
      <div className="mb-6 flex justify-end">
        <Button variant="secondary" onClick={logout}>Sign out</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <a href="/account/profile"><Card data-aos="fade-up" className="p-5"><h2 className="font-display font-bold text-navy">Profile</h2><p className="mt-2 text-sm text-muted">Keep contact details current.</p></Card></a>
        <a href="/account/orders"><Card data-aos="fade-up" data-aos-delay="80" className="p-5"><h2 className="font-display font-bold text-navy">Orders</h2><p className="mt-2 text-sm text-muted">Review recent purchases.</p></Card></a>
        <Card data-aos="fade-up" data-aos-delay="160" className="p-5"><h2 className="font-display font-bold text-navy">Support</h2><p className="mt-2 text-sm text-muted">Get help choosing hardware.</p></Card>
      </div>
    </PageFrame>
  );
}
