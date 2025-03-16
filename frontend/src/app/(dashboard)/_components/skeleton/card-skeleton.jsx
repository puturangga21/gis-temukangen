import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const CardSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4].map((index) => (
        <Card
          className='gap-0'
          key={index}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <Skeleton className='h-6 w-full rounded-md' />
          </CardHeader>
          <CardContent>
            <Skeleton className='h-6 w-12 rounded-md' />
          </CardContent>
        </Card>
      ))}
    </>
  );
};
export default CardSkeleton;
