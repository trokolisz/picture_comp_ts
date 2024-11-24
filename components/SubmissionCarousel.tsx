'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Submission {
    participant: string;
    competition: string;
    image: string;
}

interface CarouselProps {
    submissions: Submission[];
}

export default function SubmissionCarousel({ submissions }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying || submissions.length <= 3) return;

        const interval = setInterval(() => {
            setCurrentIndex((current) => (current + 1) % submissions.length);
        }, 3000); // Rotate every 3 seconds

        return () => clearInterval(interval);
    }, [isAutoPlaying, submissions.length]);

    const visibleSubmissions = submissions.slice(currentIndex, currentIndex + 3);
    if (visibleSubmissions.length < 3 && submissions.length > 3) {
        visibleSubmissions.push(...submissions.slice(0, 3 - visibleSubmissions.length));
    }

    const nextSlide = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((current) => (current + 1) % submissions.length);
    };

    const prevSlide = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((current) => (current - 1 + submissions.length) % submissions.length);
    };

    if (submissions.length === 0) {
        return <div>No submissions available</div>;
    }

    return (
        <div className="relative group">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {visibleSubmissions.map((submission, index) => (
                    <div
                        key={`${submission.participant}-${index}`}
                        className="relative rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-300 shadow-lg"
                    >
                        <img
                            src={submission.image}
                            alt={`${submission.participant}'s Submission`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white text-center p-4">
                            <p className="text-lg font-bold">{submission.participant}</p>
                            <p className="text-sm mt-1">{submission.competition}</p>
                        </div>
                    </div>
                ))}
            </div>

            {submissions.length > 3 && (
                <>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={prevSlide}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={nextSlide}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </>
            )}
        </div>
    );
} 