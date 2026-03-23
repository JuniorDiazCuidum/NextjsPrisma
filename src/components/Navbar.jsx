import Link from "next/link";
function Navbar() {
  return (
    <nav className="bg-slate-900">
      <div className="container mx-auto flex justify-between items-center py-3">
        <Link href="/">
          <h3 className="font-bold text-3xl">NextCRUD</h3>
        </Link>

        <ul className="flex gap-x-4 text-lg font-bold">
          <li>
            <Link href="/new" className="hover:text-slate-400">
              New
            </Link>
          </li>

          <li>
            <Link href="/about" className="hover:text-slate-400">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;