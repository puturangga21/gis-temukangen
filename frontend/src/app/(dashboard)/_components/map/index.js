'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <Skeleton className='w-full h-[760px]' />,
});

export default Map;
