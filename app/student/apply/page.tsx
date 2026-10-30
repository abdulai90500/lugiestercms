'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ApplyPage from '@/app/apply/page';

export default function StudentApplyRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    router.replace(query ? `/apply?${query}` : '/apply');
  }, [router, searchParams]);

  return <ApplyPage />;
}
