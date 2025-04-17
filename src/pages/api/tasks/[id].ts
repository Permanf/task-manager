import prisma from '../../../lib/prisma'
import { TaskSchema } from '../../../lib/schemas'
import type { APIRoute } from 'astro'


export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const id = params.id
    const formData = await request.formData()
    const existingTask = await prisma.task.findUnique({
      where: { id }
    })

    if (!existingTask) {
      return new Response(JSON.stringify({ error: 'Task not found' }), { status: 404 })
    }

    const mergedData = {
      title: formData.get('title') || existingTask.title,
      description: formData.get('description') || existingTask.description,
      priority: formData.get('priority') || existingTask.priority,
      dueDate: new Date(formData.get('dueDate') as string).toISOString() || existingTask.dueDate.toISOString(),
      completed: formData.get('completed') ? formData.get('completed') === 'true' || formData.get('completed') === 'on' : existingTask.completed,
    }

    const PartialTaskSchema = TaskSchema.partial()
    const parsed = PartialTaskSchema.safeParse(mergedData)

    if (!parsed.success) {
      return new Response(JSON.stringify({
        error: parsed.error.flatten().fieldErrors
      }), { status: 400 })
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: parsed.data
    })

    return new Response(JSON.stringify(updatedTask), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}

export const DELETE: APIRoute = async ({ params }) => {
  try {
    await prisma.task.delete({ where: { id: params.id } })
    return new Response(null, { status: 204 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 })
  }
}