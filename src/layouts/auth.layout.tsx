import { Navigate, Outlet } from "react-router"
import { useSigninCheck } from "reactfire";

const AuthLayout = () => {
  
  const {status, data: signInCheckResult, hasEmitted} = useSigninCheck();

  // If the user is not signed in, or if the sign-in status is still loading, show a loading message
  if(status === "loading" || !hasEmitted) {
    return <div>Loading...</div>;
  }

  if(status === "success" && signInCheckResult?.signedIn) {
    return <Navigate to="/admin"  replace />
  }

  
  
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-4 py-10">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout