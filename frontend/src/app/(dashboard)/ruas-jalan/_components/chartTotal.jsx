'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { fetchKecamatanByDesaId, fetchRuasJalan } from '../../lib/data';

const chartConfig = {
  total: {
    label: 'Total Ruas Jalan',
    color: '#7e22ce',
  },
};

const ChartTotal = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const ruasJalan = await fetchRuasJalan();

        // ambil semua desa_id
        const desaIds = [...new Set(ruasJalan.map((ruas) => ruas.desa_id))];

        const kabupatenMap = new Map();

        await Promise.all(
          desaIds.map(async (desaId) => {
            const res = await fetchKecamatanByDesaId({ desaId });
            const kabupatenName = res?.data?.kabupaten?.kabupaten;

            // Hitung total ruas jalan berdasarkan kabupaten
            const total = ruasJalan.filter(
              (ruas) => ruas.desa_id === desaId
            ).length;

            if (kabupatenName) {
              kabupatenMap.set(
                kabupatenName,
                (kabupatenMap.get(kabupatenName) || 0) + total
              );
            }
          })
        );

        // Format data untuk chart
        const formattedChartData = Array.from(kabupatenMap.entries()).map(
          ([kabupaten, total]) => ({
            kabupaten,
            total,
          })
        );

        setChartData(formattedChartData);
      } catch (error) {
        console.error('Gagal memuat chart data:', error);
      }
    };

    loadData();
  }, []);

  console.log(chartData);

  return (
    <>
      <Card className='gap-0'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Chart Ruas Jalan
          </CardTitle>
          <MapPin className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className='max-h-[160px] w-full '>
            <BarChart
              accessibilityLayer
              data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='kabupaten'
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent color='#7e22ce' />}
              />
              <Bar
                dataKey='total'
                className='fill-primary'
                radius={8}
                name='Total'
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
};
export default ChartTotal;
