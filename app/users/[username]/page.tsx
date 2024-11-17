import { notFound } from 'next/navigation';
import React from 'react';

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



interface Props{
    params: Promise<{ username: string}>
}


const UserDetailPage = async ({params}: Props) => {
  const { username } = await params;
  if (username != "admin") notFound();
  return (
    <div>
        <h1>User Detail</h1>
        <p>Id: {username}</p>
    </div>
  );
}


export default UserDetailPage
