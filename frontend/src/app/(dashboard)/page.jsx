import LeafletMap from '@/app/(dashboard)/_components/map/index';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
  return (
    <div className='space-y-4'>
      <div className='flex items-center flex-col md:flex-row justify-between space-y-2 md:space-y-0'>
        <div className='w-full'>
          <h1 className='text-xl md:text-2xl font-bold'>
            Geographic Information Dashboard
          </h1>
          <p className='text-sm text-muted-foreground'>
            Visualize spatial data easily with an interactive map powered by
            Leaflet and Next.js.
          </p>
        </div>

        {/* Add Marker Button */}
        <Button
          className='w-full md:w-fit'
          asChild>
          <Link href={'/add-location'}>Add Marker</Link>
        </Button>
      </div>

      <LeafletMap />
    </div>
  );
}
