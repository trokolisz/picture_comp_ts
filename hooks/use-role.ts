'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useRole(allowedRoles: Array<'admin' | 'judge' | 'competitor'>) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const userRole = localStorage.getItem('role');

    if (!userRole || !allowedRoles.includes(userRole as 'admin' | 'judge' | 'competitor')) {
      router.push('/login');
    } else {
      setIsAuthorized(true);
    }
  }, [allowedRoles, router]);

  return isAuthorized;
}
