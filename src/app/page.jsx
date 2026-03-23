import { prisma } from "@/libs/prisma";
import TaskCard from "@/components/TaskCard";
import { neon } from '@neondatabase/serverless';

async function loadTasks() {
  return await prisma.task.findMany();
}

export default async function HomePage() {
  async function create(formData) {
    'use server';
    const comment = formData.get('comment');
    if (!comment) return;

    const sql = neon(process.env.DATABASE_URL);
    try {
      await sql.query('INSERT INTO comments (comment) VALUES ($1)', [comment]);
    } catch (err) {
      const msg = err && err.message ? String(err.message) : '';
      if (msg.includes("relation \"comments\" does not exist") || msg.includes('does not exist')) {
        const unpooledUrl = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
        if (!unpooledUrl) throw err;
        const sqlUnpooled = neon(unpooledUrl);
        await sqlUnpooled.query('CREATE TABLE IF NOT EXISTS comments (comment TEXT);');
        await sql.query('INSERT INTO comments (comment) VALUES ($1)', [comment]);
        return;
      }
      throw err;
    }
  }

  const tasks = await loadTasks();
  return (
    <section className="container mx-auto">
      <form action={create} className="mb-6">
        <input type="text" name="comment" placeholder="Write a comment" className="border p-2 mr-2" />
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Submit</button>
      </form>
      <div className="grid grid-cols-3 gap-3 mt-10">
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>
    </section>
  );
}
