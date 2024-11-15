import { ReactNode } from "react";
import AdminSideNav from "@/components/AdminSideNav";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface AdminDashboardProps {
  children: ReactNode;
}

export default async function AdminDashboard({
  children,
}: AdminDashboardProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  return (
    <>
      <AdminSideNav />
      {children}
    </>
  );
}
