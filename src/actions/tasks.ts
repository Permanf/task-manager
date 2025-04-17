import prisma from '../lib/prisma'

export async function getTasks() {
  return prisma.task.findMany()
}

export async function getTask(id: string) {
  return prisma.task.findUnique({ where: { id } })
}