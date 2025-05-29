import LeafletMap from '@/app/(dashboard)/ruas-jalan/_components/map/index';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import CardSkeleton from '../_components/skeleton/card-skeleton';
import OverviewCard from './_components/card';
import ChartTotal from './_components/chartTotal';

export default function Home() {
  return (
    <div className='space-y-4'>
      <div className='flex items-start flex-col md:flex-row justify-between space-y-2 md:space-y-0'>
        <h1 className='text-xl md:text-2xl font-bold'>
          Geographic Information Dashboard
        </h1>
      </div>

      <Separator />

      <div className='grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-4'>
        <div className='lg:row-span-2 lg:col-start-2 lg:row-start-1'>
          <Suspense fallback={<CardSkeleton />}>
            <ChartTotal />
          </Suspense>
        </div>
        <div className='lg:col-start-1 lg:row-start-1'>
          <Suspense fallback={<CardSkeleton />}>
            <OverviewCard />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<CardSkeleton />}>
            <OverviewCard />
          </Suspense>
        </div>
      </div>

      {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-1 gap-4'>
        <Suspense fallback={<CardSkeleton />}>
          <OverviewCard />
        </Suspense>

        <Suspense fallback={<CardSkeleton />}>
          <ChartTotal />
        </Suspense>
      </div> */}

      <LeafletMap />
    </div>
  );
}
