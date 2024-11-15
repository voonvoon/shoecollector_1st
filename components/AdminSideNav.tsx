
import Link from "next/link";

export default function AdminSideNav() {
  return (
    <nav className="flex justify-center mb-3">
      <Link href="/dashboard/admin" className="text-blue-500 hover:text-blue-700 mx-2">
        Admin
      </Link>
      <Link href="/dashboard/admin/category" className="text-blue-500 hover:text-blue-700 mx-2">
        Categories
      </Link>
    </nav>
  );
}
