import LeafletMap from '@/app/(dashboard)/add-ruas-jalan/_components/map/index';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className='space-y-4'>
      <div className='flex items-start flex-col md:flex-row justify-between space-y-2 md:space-y-0'>
        <h1 className='text-xl md:text-2xl font-bold'>
          Tambahkan Ruas Jalan Baru
        </h1>

        {/* <Button
          className='w-full md:w-fit'
          asChild>
          <Link href={'/add-location'}>Add Marker</Link>
        </Button> */}
      </div>

      <Separator />

      <LeafletMap />
    </div>
  );
}
