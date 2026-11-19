import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏥</span>
            <span className="font-bold text-xl text-blue-700">HealthOne</span>
          </Link>
          <div className="flex space-x-6">
            <Link href="/symptoms" className="text-gray-600 hover:text-blue-600 font-medium transition">Symptoms</Link>
            <Link href="/reports" className="text-gray-600 hover:text-blue-600 font-medium transition">Reports</Link>
            <Link href="/recommendations" className="text-gray-600 hover:text-blue-600 font-medium transition">Health Tips</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}