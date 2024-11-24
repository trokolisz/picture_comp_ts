'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";



export default function GoBack({ competition }: { competition: string }) {
    return (
        <Link href={`/admin/competitions/${competition}`}>
        <Button>Return to Competitions</Button>
        </Link>
    )
}