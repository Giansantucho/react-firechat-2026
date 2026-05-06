import FormTask from "@/components/tasks/form-task"
import TaskList from "@/components/tasks/task-list"
import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardCheck } from "lucide-react"

const TaskPage = () => {
  return (
    <div className="py-4">
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-primary" />
            Tasks
          </CardTitle>
          <CardDescription>Organiza y revisa tus tareas.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormTask />
          <Suspense fallback={<div className="text-sm text-muted-foreground">Loading tasks...</div>}>
            <TaskList />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}

export default TaskPage