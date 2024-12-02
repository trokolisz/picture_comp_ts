'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useRole(role: 'admin' | 'judge') {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const userRole = localStorage.getItem('role');

    if (!userRole || userRole !== role) {
      router.push('/login');
    }
  }, [role, router]);

  return null;
}
