import FormTask from "@/components/tasks/form-task"
import TaskList from "@/components/tasks/task-list"
import { Suspense } from "react"

const TaskPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">task</h1>
      
      <FormTask>
        
      </FormTask>
      
      <Suspense fallback={<div>Loading tasks...</div>}>
        <TaskList>

        </TaskList>
      </Suspense>
    </div>
  )
}

export default TaskPage