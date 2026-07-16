import { redirect } from "next/navigation";

export default function RootPage() {
  // Automatically redirects anyone landing on "/" straight to "/login"
  redirect("/login");
}