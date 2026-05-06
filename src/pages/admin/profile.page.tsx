import FormProfile from "@/components/profile/form-profile"
import { useUser } from "reactfire";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

const ProfilePage = () => {
  
  const {data: user} = useUser();

  if(!user){
    return <div className="text-red-500">Loading...</div>
  }

  
  return (
    <div className="py-4">
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Profile
          </CardTitle>
          <CardDescription>Actualiza tu información.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormProfile user={user}/>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfilePage