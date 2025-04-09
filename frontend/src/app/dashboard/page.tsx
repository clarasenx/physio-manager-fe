'use client'

import { useRouter } from 'next/navigation';
import { logout } from '../actions/logout';

export default function Dashboard() {
  const router = useRouter();
  async function handleLogout() {
    await logout()
    router.replace("/login")
  }

  return (
    <div>
      alooo <br />
      <button className='p-3 m-10 text-amber-50 cursor-pointer bg-blue-500' onClick={handleLogout}>Logout</button>
    </div>
  )
}