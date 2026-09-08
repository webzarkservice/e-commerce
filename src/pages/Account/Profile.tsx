import { Button, Card, Input, Label } from "../../components/ui";
import PageFrame from "../PageFrame";

export default function Profile() {
  return <PageFrame title="Profile" intro="Update the details we use for your orders."><Card data-aos="fade-up" className="max-w-2xl border-0 p-6"><Label htmlFor="name">Name</Label><Input id="name" className="mb-4" /><Label htmlFor="company">Company</Label><Input id="company" className="mb-4" /><Label htmlFor="email">Email</Label><Input id="email" type="email" /><Button className="mt-6" onClick={() => {}}>Save profile</Button></Card></PageFrame>;
}
