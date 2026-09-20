import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { Login } from '../login';

export default async function SignInPage() {
  const session = await auth();
  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <Suspense>
      <Login />
    </Suspense>
  );
}
