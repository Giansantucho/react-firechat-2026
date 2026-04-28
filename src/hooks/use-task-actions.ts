import { useUser, useFirestore, useFirestoreCollectionData } from "reactfire"
import {
    addDoc,
    collection, 
    deleteDoc, 
    doc, 
    query, 
    updateDoc, 
    where, 
    /*updateDoc,  
    deleteDoc, 
    doc */
} from "firebase/firestore"
import type { Tasks } from "@/schemas/task.schema"


export const useTaskActions = () => {

    const {data: user} = useUser()
    //console.log({user})

    if(!user){
        throw new Error("user not indicated");
    }

    const db = useFirestore()
    const taskCollectionRef = collection(db, "tasks")

    const tasksQuery = query(
        taskCollectionRef,
        where("userId", "==", user!.uid)
    )

    const {status, data: tasks} = useFirestoreCollectionData(tasksQuery, {
        idField: "id",
        suspense: true
    })

    //CREATE
    const createTask = async (data: {title: string, description?: string;}) => {
        const newTask = {
            ...data,
            completed: false,
            userId: user!.uid,

        }

        return await addDoc(taskCollectionRef, newTask)
    }

    // DELETE
    const deleteTask = async (taskId: string) => {
        const taskDoc = doc(db, "tasks", taskId);
        return await deleteDoc(taskDoc);
    }

    const toggleTaskCompleted = async (taskId: string) => {
        const task = tasks.find((task)=> task.id === taskId)

        if(!task){
            throw new Error("not found")
        }

        const taskDoc = doc(db, "tasks", taskId)

        return await updateDoc(taskDoc, {
            completed: !task.completed,
        })

    }


    return{
        tasks: tasks as Tasks[],
        isLoading: status == "loading",
        createTask,
        deleteTask,
        toggleTaskCompleted
    }
}