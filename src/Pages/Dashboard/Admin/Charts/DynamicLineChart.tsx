import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';

interface BookingData {
    startDate: string;
    amount: number;
}

const DynamicLineChart: React.FC = () => {
    const [data, setData] = useState<(string | number)[][]>([['Date', 'Price']]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const axiosPublic = useAxiosPublic();

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosPublic.get('/bookings-data');
            const bookings: BookingData[] = response.data;

            if (bookings.length === 0) {
                setError("No booking data available.");
                setLoading(false);
                return;
            }

            // Find the minimum start date to calculate days from
            const minDate = Math.min(...bookings.map(item => new Date(item.startDate).getTime()));

            // Map the fetched data to the format required for the chart
            const chartData = bookings.map(item => {
                const date = new Date(item.startDate);
                const formattedDate = date.toLocaleDateString(); // Format the date for x-axis
                return [formattedDate, item.amount]; // Use formatted date for the x-axis
            });

            // Set the chart data
            setData(prevData => [...prevData, ...chartData]);
        } catch (error: unknown) {
            // Type assertion to access error message safely
            if (error instanceof Error) {
                setError("Error fetching data: " + error.message);
            } else {
                setError("An unknown error occurred."); // Handle unknown error type
            }
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const options = {
        title: 'Price Over Days',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: {
            title: 'Date',
            gridlines: { count: 15 },
            minorGridlines: { count: 4 },
        },
        vAxis: {
            title: 'Price (in $)',
            gridlines: { count: 10 },
            format: 'currency',
        },
        tooltip: { isHtml: true },
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

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
