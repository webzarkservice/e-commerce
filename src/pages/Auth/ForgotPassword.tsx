import { Button, Card, Input, Label } from "../../components/ui";
import PageFrame from "../PageFrame";

export default function ForgotPassword() {
  return <PageFrame centered title="Reset your password" intro="Enter your email and we will send reset instructions.">
    <Card data-aos="fade-up" className="max-w-md border-0 p-6"><Label htmlFor="email">Email</Label><Input id="email" type="email" /><Button className="mt-6 w-full" onClick={() => {}}>Send instructions</Button></Card>
  </PageFrame>;
}
