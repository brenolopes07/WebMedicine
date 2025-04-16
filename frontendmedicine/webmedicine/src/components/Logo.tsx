
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Logo() {
  const router = useRouter();
  return (
    <div onClick={()=>router.push(`/homepage`)} className="z-30 flex justify-center items-center  cursor-pointer">
      <div className="bg-blue-500 flex mr-2 justify-center items-center rounded-full min-w-10 min-h-10">
        <p className="text-white text-xl font-bold">W</p>
      </div>
      <h4 className="font-bold text-lg">Web Medicine</h4>
    </div>
  );
}
