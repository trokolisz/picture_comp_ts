import { get, ref } from 'firebase/database';
import { database } from '../../../FirebaseConfig';
import Link from 'next/link';
import { User } from "./columns"
import { DataTable } from "./data-table"

async function getUsersFromApi() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
  try {
    const data = await response.json();
    if (data.success) {
      return data.data;
    } else {
      console.error('Failed to fetch users:', data.message);
      return [];
    }
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
}

export default async function Home() {
  const users = await getUsersFromApi();

  return (
    <div className="container mx-auto py-10">
      <DataTable data={users} />
    </div>
  );
}
