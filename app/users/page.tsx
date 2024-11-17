import { get, ref } from 'firebase/database';
import { database } from '../../FirebaseConfig';
import Link from 'next/link';

interface User {
  username: string;
  full_name: string; 
  email: string;
  is_active: boolean;
  password: string;
  role: string;
  created_at: string;
  updated_at: string; 
}

async function getUsersFromApi() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users1`);
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
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Fetch Data from Firebase Realtime Database
      </h1>
      <div className="overflow-x-auto">
        <table className="table w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Full Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Is Active</th>
              <th className="border border-gray-300 px-4 py-2">Created At</th>
              <th className="border border-gray-300 px-4 py-2">Updated At</th>
              <th className="border border-gray-300 px-4 py-2">More</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user.email} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{user.username}</td>
              <td className="border border-gray-300 px-4 py-2">{user.full_name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.role}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.is_active ? 'Active' : 'Inactive'}
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.created_at}</td>
              <td className="border border-gray-300 px-4 py-2">{user.updated_at}</td>
              <td className="border border-gray-300 px-4 py-2">
              <Link href={`/users/${user.username}`} className="text-blue-500 underline">Profile</Link>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
