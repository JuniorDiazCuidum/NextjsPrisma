import Link from "next/link";

function NotFound() {
  return (
    <section className="flex h-[calc(100vh-7rem)] justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">NOT FOUND</h1>
        <Link href="/" className="text-slate-400 text-2xl mt-5">Volver a las tareas</Link>
      </div>
    </section>
  );
}

export default NotFound;