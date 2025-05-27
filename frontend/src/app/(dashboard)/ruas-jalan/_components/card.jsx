'use client';

import { fetchRuasJalan } from '@/app/(dashboard)/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

const OverviewCard = () => {
  const [totalMarker, setTotalMarker] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRuasJalan();

        console.log(data);
        setTotalMarker(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Card className='gap-0'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Total Ruas Jalan
          </CardTitle>
          <MapPin className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {/* {totalMarker?.locations?.length || 0} */}
            {loading ? <Skeleton className='w-10 h-8' /> : totalMarker || 0}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default OverviewCard;
