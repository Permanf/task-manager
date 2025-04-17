import prisma  from '../../lib/prisma'
import { TaskSchema } from '../../lib/schemas'
import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData()
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      priority: formData.get('priority'),
      dueDate: new Date(formData.get('dueDate') as string).toISOString(),
      completed: formData.get('completed') === 'on'
    }

    const parsed = TaskSchema.safeParse(data)
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error }), {
        status: 400
      })
    }
    const task = await prisma.task.create({ data: parsed.data })
    return new Response(JSON.stringify(task), { status: 201 })

  } catch (error) {
    console.error('Error creating task:', error)
    return new Response(JSON.stringify({ error: 'Database error' }), {
      status: 500
    })
  }
}