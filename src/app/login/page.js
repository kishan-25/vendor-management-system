"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Create a separate component that uses useSearchParams
function LoginContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const signoutParam = searchParams.get("signout");

  useEffect(() => {
    if (signoutParam === "true") {
      signOut({ redirect: false });
    }
  }, [signoutParam]);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-black">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Vendor Management System</h1>
        
        {status === "authenticated" ? (
          <div className="text-center">
            <p className="mb-4">Logged in as {session.user?.name}</p>
            <p className="text-sm text-gray-500 mb-4">Redirecting to dashboard...</p>
            <button
              onClick={() => signOut({ redirect: false })}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="mb-4">Please login to continue</p>
            <button
              onClick={() => signIn("google")}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Login with Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Fallback component for Suspense
function LoginFallback() {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-xl">Loading login page...</h1>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginContent />
    </Suspense>
  );
}