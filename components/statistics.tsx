"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function StatisticsSection() {
  const [statistics, setStatistics] = useState<{
    totalPhotosUploaded: number;
    totalPhotosUploadedInLast7Days: number;
    uploadsPerDay: { date: string; count: number }[];
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStatistics() {
      try {
        const response = await fetch("/api/getPhotos");
        const data = await response.json();

        if (data.success) {
          //console.log("API Response:", data);

          const { totalPhotosUploaded, totalPhotosUploadedInLast7Days, dailyPhotoUploads } = data.data;

          const uploadsPerDay = Object.entries(dailyPhotoUploads).map(([date, count]) => ({
            date,
            count: Number(count),
          }));

          setStatistics({
            totalPhotosUploaded,
            totalPhotosUploadedInLast7Days,
            uploadsPerDay,
          });
        } else {
          setError(data.message || "Failed to fetch statistics");
        }
      } catch (err) {
        setError("An error occurred while fetching statistics");
      } finally {
        setLoading(false);
      }
    }

    fetchStatistics();
  }, []);

  if (loading) {
    return <p>Loading statistics...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const chartData = {
    labels: statistics?.uploadsPerDay.map((day) => day.date) || [],
    datasets: [
      {
        label: "Photos Uploaded",
        data: statistics?.uploadsPerDay.map((day) => day.count) || [],
        backgroundColor: "rgba(82, 190, 128, 0.8)",
        borderColor: "rgba(82, 190, 128, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#d4d4d4",
        },
      },
    },
  };

  return (
    <section className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Statistics</h2>
      <div className="mb-6 text-center">
        <p className="text-lg">
          <strong>Total Photos Uploaded:</strong>{" "}
          <span className="text-green-600 text-3xl font-bold">
            {statistics?.totalPhotosUploaded}
          </span>
        </p>
        <p className="text-lg">
          <strong>Last 7 Days:</strong>{" "}
          <span className="text-blue-600 text-3xl font-bold">
            {statistics?.totalPhotosUploadedInLast7Days}
          </span>
        </p>
      </div>
      <Bar data={chartData} options={chartOptions} />
    </section>
  );
}
