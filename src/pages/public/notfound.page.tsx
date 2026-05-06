import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TriangleAlert } from "lucide-react";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <Card className="mx-auto max-w-lg">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <TriangleAlert className="h-5 w-5 text-primary" />
              Página no encontrada
            </CardTitle>
            <CardDescription>
              La ruta que intentaste abrir no existe.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-start">
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default NotFoundPage