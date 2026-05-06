import Navbar from "@/components/navbar";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router"
import { useSigninCheck, useUser } from "reactfire"

const AdminLayout = () => {
  
  const {status, data: signInCheckResult, hasEmitted} = useSigninCheck();

  // If the user is not signed in, or if the sign-in status is still loading, show a loading message
  if(status === "loading" || !hasEmitted) {
    return <div>Loading...</div>;
  }

  if(status === "success" && !signInCheckResult?.signedIn) {
    return <Navigate to="/auth/login"  replace />
  }


  return (
    <Suspense fallback={<div>Loading user...</div>}>
      <AuthenticatedLayout></AuthenticatedLayout>
    </Suspense>
    
  )
}

export default AdminLayout

const AuthenticatedLayout = () => {
  useUser({
    suspense: true
  })
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4">
        <Outlet />
      </main>
    </div>
  )
}