import { Navigate, Outlet } from "react-router"
import { useSigninCheck } from "reactfire"

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
    <div>
      <Outlet></Outlet>
    </div>
  )
}

export default AdminLayout