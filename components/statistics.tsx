"use client";

import { useEffect, useState } from "react";

export default function StatisticsSection() {
  const [statistics, setStatistics] = useState<{
    totalPhotosUploaded: number;
    totalPhotosUploadedInLast7Days: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStatistics() {
      try {
        const response = await fetch("/api/getPhotos"); 
        const data = await response.json();

        if (data.success) {
          setStatistics(data.data);
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

  return (
    <section className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-4">Statistics</h2>
      <div className="flex justify-around">
        <div>
          <h3 className="text-xl font-semibold">Total Photos Uploaded</h3>
          <p className="text-3xl font-bold text-green-600">
            {statistics?.totalPhotosUploaded}
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Photos Uploaded Last 7 Days</h3>
          <p className="text-3xl font-bold text-blue-600">
            {statistics?.totalPhotosUploadedInLast7Days}
          </p>
        </div>
      </div>
    </section>
  );
}
