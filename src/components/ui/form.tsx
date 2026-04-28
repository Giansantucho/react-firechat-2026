"use client"

import * as React from "react"
import {
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form"

export const Form = FormProvider

export const FormField = Controller

export const FormItem = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-2">{children}</div>
}

export const FormLabel = ({ children }: { children: React.ReactNode }) => {
  return <label className="text-sm font-medium">{children}</label>
}

export const FormControl = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

export const FormMessage = ({ name }: { name: string }) => {
  const {
    formState: { errors },
  } = useFormContext()

  const error = errors[name as keyof typeof errors]

  if (!error) return null

  return (
    <p className="text-sm text-red-500">
      {error.message as string}
    </p>
  )
}

export const FormDescription = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <p className="text-sm text-muted-foreground">
      {children}
    </p>
  )
}

export default Form