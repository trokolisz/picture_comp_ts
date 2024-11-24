import { NextResponse } from 'next/server';

export async function GET() {
  const submissions = [
    {
      participant: "Team Alpha",
      competition: "Nature Photography 2024",
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e"
    },
    {
      participant: "Team Beta", 
      competition: "Wildlife Contest",
      image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d"
    },
    {
      participant: "Team Gamma",
      competition: "Landscape Masters",
      image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a"
    },
    {
      participant: "Team Delta",
      competition: "Urban Photography",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000"
    },
    {
      participant: "Team Epsilon",
      competition: "Architecture 2024",
      image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2"
    }
  ];

  return NextResponse.json({
    success: true,
    data: submissions
  });
}
