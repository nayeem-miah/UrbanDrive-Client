
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";

interface BookingData {
    _id: string;
    hostIsApproved: string;

}

const DynamicPieChart: React.FC = () => {
    const [piChartData, setPiChartData] = useState<(string | number)[][]>([
        ["Status", "Count"],
        ["Success", 0],
        ["Pending", 0],
        ["Cancel", 0],
    ]);
    const axiosPublic = useAxiosPublic()
    const options = {
        title: "Booking Approval Status",
        colors: ["#4CAF50", "#FFEB3B", "#F44336"],
    };
    useEffect(() => {
        const fetchChartData = async () => {
            try {
                // Fetch the data from your backend API
                const response = await axiosPublic.get<BookingData[]>("/bookings-data");
                const bookingData = response.data;

                const statusCounts = bookingData.reduce(
                    (acc, booking) => {
                        if (booking.hostIsApproved === "Success") acc.success += 1;
                        else if (booking.hostIsApproved === "pending") acc.pending += 1;
                        else acc.cancel += 1;
                        return acc;
                    },
                    { success: 0, pending: 0, cancel: 0 }
                );

                // Update the Pie Chart data
                const updatedData: (string | number)[][] = [
                    ["Status", "Count"],
                    ["Success", statusCounts.success],
                    ["Pending", statusCounts.pending],
                    ["Cancel", statusCounts.cancel],
                ];

                setPiChartData(updatedData);
            } catch (error) {
                console.error("Error fetching booking data:", error);
            }
        };

        fetchChartData();
    }, []);

    return (
        <div>
          
            <Chart
                chartType="PieChart"
                data={piChartData}
                width={"100%"}
                height={"400px"}
                options={options}
            />
        </div>
    );
};

export default DynamicPieChart;
