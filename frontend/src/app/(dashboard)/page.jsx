import OverviewCard from '@/app/(dashboard)/_components/card';
import LeafletMap from '@/app/(dashboard)/_components/map/index';
import CardSkeleton from '@/app/(dashboard)/_components/skeleton/card-skeleton';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <div className='space-y-4'>
      <div className='flex items-start flex-col md:flex-row justify-between space-y-2 md:space-y-0'>
        <h1 className='text-xl md:text-2xl font-bold'>
          Geographic Information Dashboard
        </h1>

        <Button
          className='w-full md:w-fit'
          asChild>
          <Link href={'/add-location'}>Add Marker</Link>
        </Button>
      </div>

      <Separator />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-1 gap-4'>
        <Suspense fallback={<CardSkeleton />}>
          <OverviewCard />
        </Suspense>
      </div>

      <LeafletMap />
    </div>
  );
}
