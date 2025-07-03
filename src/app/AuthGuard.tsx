
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading

    if (!session) {
      router.push('/auth/signin');
      return;
    }

    // If first login is true, redirect to change password page
    if (session.user?.firstLogin && router.pathname !== '/auth/change-password') {
      router.push('/auth/change-password');
      return;
    }

  }, [session, status, router]);

  if (status === 'loading' || !session) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>; // Or a loading spinner
  }

  return <>{children}</>;
}
