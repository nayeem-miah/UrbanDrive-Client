import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';

interface BookingData {
    startDate: string;
    amount: number;
}

const DynamicLineChart: React.FC = () => {
    const [data, setData] = useState<(string | number)[][]>([
        ['Days', 'Price'],
    ]);
    const axiosPublic = useAxiosPublic()

    const fetchData = async () => {
        try {
            const response = await axiosPublic.get('/bookings-data');
            const bookings: BookingData[] = response.data;
            const chartData = bookings.map(item => {
                const date = new Date(item.startDate);
                const day = date.toLocaleDateString();
                return [day, item.amount];
            });

            setData(prevData => [...prevData, ...chartData]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const options = {
        title: 'Price Over Days',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: { title: 'Days' },
        vAxis: { title: 'Price (in $)' },
    };

    return (
        <div>
            <Chart
                chartType="LineChart"
                width="100%"
                height="400px"
                data={data}
                options={options}
            />
        </div>
    );
};

export default DynamicLineChart;
