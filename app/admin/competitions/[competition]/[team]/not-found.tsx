'use client'
import Head from "@/components/header";
import GoBack from "./go-back";

interface Props {
    params: { competition: string, team: string }
}

export default function TeamNotFound({ params }: Props) {
    // Add null check for params
    if (!params) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl font-bold mb-4">Error</h1>
                <p className="text-muted-foreground mb-8">
                The team you are looking for does not exist or has been deleted.
                </p>
            </div>
        );
    }

    const { competition, team } = params;
    return (
        <>
            <Head data={`admin/competitions/${competition}`} />
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl font-bold mb-4">Team Not Found</h1>
                <p className="text-muted-foreground mb-8">
                    The team you are looking for does not exist or has been deleted.
                </p>
                <GoBack competition={competition} />
            </div>
        </>
    );
}
