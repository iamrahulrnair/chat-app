import { Button } from "@/components";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { notFound, redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/auth/login');
  }

  return (
    <div className="text-red-500">
    </div>
  )
}
