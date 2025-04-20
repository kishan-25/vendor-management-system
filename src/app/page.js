"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen text-black">
      <p>Redirecting to login page...</p>
    </div>
  );
}