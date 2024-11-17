import { notFound } from 'next/navigation';
import React from 'react';

interface User {
    username: string;
    full_name: string; 
    email: string;
    is_active?: boolean;
    password: string;
    role: string;
    created_at?: string;
    updated_at?: string; 
  }



interface Props{
    params: Promise<{ username: string}>
}


const UserDetailPage = async ({params}: Props) => {
  const { username } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/users/${username}`);
  const user = await response.json();

  if (!response.ok) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-2xl font-bold mb-4">User Detail</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="stat">
              <div className="stat-title">Username</div>
              <div className="stat-value">{user.username}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Full Name</div>
              <div className="stat-value">{user.full_name}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Email</div>
              <div className="stat-value">{user.email}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Role</div>
              <div className="stat-value">{user.role}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Active</div>
              <div className="stat-value">{user.is_active ? 'Yes' : 'No'}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Created At</div>
              <div className="stat-value">{user.created_at}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Updated At</div>
              <div className="stat-value">{user.updated_at}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default UserDetailPage
