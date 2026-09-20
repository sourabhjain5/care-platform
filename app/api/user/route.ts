import { auth } from '@/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return Response.json(null);
  }
  return Response.json(session.user);
}
