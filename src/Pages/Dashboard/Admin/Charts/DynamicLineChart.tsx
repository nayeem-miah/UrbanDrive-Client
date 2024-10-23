import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios'; // Importing Axios

interface BookingData {
  startDate: string; // The date property from your API
  amount: number;    // The amount property for the price
}

const DynamicLineChart: React.FC = () => {
  const [data, setData] = useState<(string | number)[][]>([
    ['Days', 'Price'], // Initial headers
  ]);

  // Function to fetch data from the API using Axios
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/bookings-data');
      const bookings: BookingData[] = response.data; // Axios returns data in the response object
// console.log(bookings);
      // Map the fetched data to the format required for the chart
      const chartData = bookings.map(item => {
        const date = new Date(item.startDate); // Parse the date
        const day = date.toLocaleDateString(); // Format the date as needed
        return [day, item.amount]; // Use amount for the price
      });

      setData(prevData => [...prevData, ...chartData]); // Update the chart data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  // Chart options
  const options = {
    title: 'Price Over Days',
    curveType: 'function',
    legend: { position: 'bottom' },
    hAxis: { title: 'Days' }, // X-axis labeled as 'Days'
    vAxis: { title: 'Price (in $)' }, // Y-axis labeled as 'Price'
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
