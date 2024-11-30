import NavMenu from "@/components/navbar";
import { UploadCloud, Trophy, ArrowRightCircle } from "lucide-react";
import { cookies } from 'next/headers';
import SubmissionCarousel from '@/components/SubmissionCarousel';
import StatisticsSection from "@/components/statistics";

interface Submission {
  participant: string;
  competition: string;
  image: string;
}

interface Competition {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  judges?: string[];
  teams?: object;
  num_judges?: number;
  num_teams?: number;
}

async function getCompetitionsFromApi(): Promise<Competition[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/competitions`);
    const data = await response.json();

    if (data.success) {
      return data.data.filter((competition: Competition) => competition.is_active);
    } else {
      console.error('Failed to fetch competitions:', data.message || 'Unknown error');
      return [];
    }
  } catch (error) {
    console.error('Error fetching competitions:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
}

async function getSubmissionsFromApi(): Promise<Submission[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/submissions`);
    const data = await response.json();

    if (data.success) {
      return data.data;
    } else {
      console.error('Failed to fetch submissions:', data.message || 'Unknown error');
      return [];
    }
  } catch (error) {
    console.error('Error fetching submissions:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
}

function getRotatingSubmissions(submissions: Submission[], rotationsPerDay = 1) {
  if (!submissions.length) return [];

  // Calculate the current rotation based on the time of day
  const msPerDay = 24 * 60 * 60 * 1000;
  const msPerRotation = msPerDay / rotationsPerDay;
  const currentRotation = Math.floor(Date.now() / msPerRotation);
  const startIndex = currentRotation % submissions.length;

  // Get up to 3 submissions starting from the calculated index
  const result = [];
  for (let i = 0; i < 3 && i < submissions.length; i++) {
    const wrappedIndex = (startIndex + i) % submissions.length;
    result.push(submissions[wrappedIndex]);
  }
  return result;
}

export default async function Home() {
  const submissions = await getSubmissionsFromApi();
  const competitions = await getCompetitionsFromApi();

  // Get the submissions to display using time-based rotation
  const featuredSubmissions = getRotatingSubmissions(submissions);

  return (
    <div className="min-h-screen bg-[#e8f6f3]">
      <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg rounded-b-lg">
        <h1 className="text-2xl font-bold text-center">Picture Competition</h1>
        <NavMenu />
      </header>

      <section className="bg-[#52be80] text-white text-center p-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Picture Competition!</h1>
        <p className="text-xl mb-6">Showcase your photography skills, enter exciting competitions, and win amazing prizes!</p>
        <button className="bg-white text-[#52be80] px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-300">
          Join Now
        </button>
      </section>

      {/* How It Works Section */}
      <section className="text-center p-8">
        <h2 className="text-3xl font-bold mb-6">How It Works</h2>
      </section>

      {/* Cards Section */}
      <div className="flex flex-1 flex-col justify-center gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {/* Upload Photo Card */}
          <div className="aspect-video rounded-xl bg-muted/50 hover:bg-[#52be80] group flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col items-center text-center">
              <UploadCloud
                size={100}
                className="mb-4 text-[#52be80] group-hover:text-white transition-colors duration-300"
              />
              <h3 className="text-xl font-semibold group-hover:text-white transition-colors duration-300">
                Upload Your Photo
              </h3>
              <p className="text-gray-600 group-hover:text-white transition-colors duration-300">
                Share your best photo for the competition.
              </p>
            </div>
          </div>

          {/* Enter a Competition Card */}
          <div className="aspect-video rounded-xl bg-muted/50 hover:bg-[#52be80] group flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col items-center text-center">
              <ArrowRightCircle
                size={100}
                className="mb-4 text-[#52be80] group-hover:text-white transition-colors duration-300"
              />
              <h3 className="text-xl font-semibold group-hover:text-white transition-colors duration-300">
                Enter a Competition
              </h3>
              <p className="text-gray-600 group-hover:text-white transition-colors duration-300">
                Pick a competition that suits your style.
              </p>
            </div>
          </div>

          {/* Win Prizes Card */}
          <div className="aspect-video rounded-xl bg-muted/50 hover:bg-[#52be80] group flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col items-center text-center">
              <Trophy
                size={100}
                className="mb-4 text-[#52be80] group-hover:text-white transition-colors duration-300"
              />
              <h3 className="text-xl font-semibold group-hover:text-white transition-colors duration-300">
                Win Prizes
              </h3>
              <p className="text-gray-600 group-hover:text-white transition-colors duration-300">
                Get rewarded for your creativity!
              </p>
            </div>
          </div>
        </div>
      </div>

      <br />

      {/* Featured Submissions Section */}
      <section className="text-center p-8">
        <h2 className="text-3xl font-bold mb-6">Featured Submissions</h2>
        <SubmissionCarousel submissions={featuredSubmissions} />
      </section>

      {/* Active Competitions Section */}
      <section className="text-center p-8">
        <h2 className="text-3xl font-bold mb-6">Active Competitions</h2>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {competitions.length > 0 ? (
            competitions.map((competition, index) => (
              <div
                key={index}
                className="md:w-120 aspect-video rounded-xl bg-muted/50 p-6 flex flex-col items-center justify-center group transition transform hover:scale-105 hover:bg-[#52be80] duration-300"
              >
                <h3 className="text-xl font-semibold group-hover:text-white mb-4">
                  {competition.name}
                </h3>
                <p className="text-gray-600 group-hover:text-white">
                  {competition.description}
                </p>
                <p className="text-gray-600 group-hover:text-white mt-2">
                  Start Date: {competition.start_date}
                </p>
                <p className="text-gray-600 group-hover:text-white">
                  End Date: {competition.end_date}
                </p>
              </div>
            ))
          ) : (
            <p className="text-xl text-gray-500">No active competitions available</p>
          )}
        </div>
      </section>

      <br />

      {/* Statistics Section */}
      <section className="bg-[#e8f6f3] p-8">
        <StatisticsSection />
      </section>

      <br />

      {/* Placeholder Section */}
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
}
