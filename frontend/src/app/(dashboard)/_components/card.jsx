import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, MapPin } from 'lucide-react';
import { fetchLocation } from '@/app/(dashboard)/lib/data';

const OverviewCard = async () => {
  const totalMarker = await fetchLocation();

  return (
    <>
      <Card className='gap-0'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Marker</CardTitle>
          <MapPin className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {totalMarker?.locations?.length || 0}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default OverviewCard;
