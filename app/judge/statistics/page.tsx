"use client";

import { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, LineElement, PointElement);

export default function StatisticsSection() {
  const [statistics, setStatistics] = useState<{
    totalCompetitions: number;
    activeCompetitions: number;
    totalPhotosJudged: number;
    dailyJudgingActivity: { date: string; count: number }[];
    photosPendingReview: number;
    totalJudges: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    async function fetchStatistics() {
      try {
        const response = await fetch("/api/judgeStatistics");
        const data = await response.json();

        if (data.success) {
          const { totalCompetitions, activeCompetitions, totalPhotosJudged, dailyJudgingActivity, photosPendingReview, totalJudges } = data.data;

          const uploadsPerDay = Object.entries(dailyJudgingActivity).map(([date, count]) => ({
            date,
            count: Number(count),
          }));

          setStatistics({
            totalCompetitions,
            activeCompetitions,
            totalPhotosJudged,
            dailyJudgingActivity: uploadsPerDay,
            photosPendingReview,
            totalJudges,
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

  const averagePhotosPerDay =
    statistics && statistics.dailyJudgingActivity
      ? statistics.dailyJudgingActivity.reduce((total, day) => total + day.count, 0) / statistics.dailyJudgingActivity.length
      : 0;

  const chartData = {
    labels: statistics?.dailyJudgingActivity.map((day) => day.date) || [],
    datasets: [
      {
        label: "Photos Judged",
        data: statistics?.dailyJudgingActivity.map((day) => day.count) || [],
        backgroundColor: "rgba(82, 190, 128, 0.8)",
        borderColor: "rgba(82, 190, 128, 1)",
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ["Average Photos Judged Per Day"],
    datasets: [
      {
        label: "Average Photos Judged Per Day",
        data: [averagePhotosPerDay],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-6 py-2 text-lg font-semibold focus:outline-none transition-all duration-300 ${
            activeTab === "general" ? "text-white bg-[#52be80] border-b-4 border-green-800" : "text-gray-700"
          }`}
          onClick={() => setActiveTab("general")}
        >
          General Stats
        </button>
        <button
          className={`px-6 py-2 text-lg font-semibold focus:outline-none transition-all duration-300 ${
            activeTab === "activity" ? "text-white bg-[#52be80] border-b-4 border-green-800" : "text-gray-700"
          }`}
          onClick={() => setActiveTab("activity")}
        >
          Judging Activity
        </button>
        <button
          className={`px-6 py-2 text-lg font-semibold focus:outline-none transition-all duration-300 ${
            activeTab === "performance" ? "text-white bg-[#52be80] border-b-4 border-green-800" : "text-gray-700"
          }`}
          onClick={() => setActiveTab("performance")}
        >
          Performance Metrics
        </button>
      </div>

      {/* General Stats Tab */}
      {activeTab === "general" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Total Competitions</h3>
              <p className="text-3xl font-bold text-green-600">{statistics?.totalCompetitions}</p>
            </div>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Active Competitions</h3>
              <p className="text-3xl font-bold text-blue-600">{statistics?.activeCompetitions}</p>
            </div>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Total Photos Judged</h3>
              <p className="text-3xl font-bold text-orange-600">{statistics?.totalPhotosJudged}</p>
            </div>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Photos Pending Review</h3>
              <p className="text-3xl font-bold text-yellow-600">{statistics?.photosPendingReview}</p>
            </div>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Total Judges</h3>
              <p className="text-3xl font-bold text-purple-600">{statistics?.totalJudges}</p>
            </div>
          </div>
        </div>
      )}

      {/* Judging Activity Tab */}
      {activeTab === "activity" && (
        <div style={{ width: "100%", height: "400px", marginBottom: "24px" }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}

      {/* Performance Metrics Tab */}
      {activeTab === "performance" && (
        <div style={{ width: "100%", height: "300px", marginBottom: "24px" }}>
          <Line data={lineChartData} options={chartOptions} />
        </div>
      )}
    </section>
  );
}
