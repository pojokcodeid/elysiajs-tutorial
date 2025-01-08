import { PrismaClient, Todo } from "@prisma/client";

const prisma = new PrismaClient();
class TodoModel {
  public static async getAllTodos(): Promise<Todo[]> {
    const todos = await prisma.todo.findMany();
    return todos;
  }

  public static async getTodoById(id: number): Promise<Todo | null> {
    const todo = await prisma.todo.findUnique({ where: { id } });
    return todo;
  }

  public static async createTodo(
    title: string,
    description: string,
    userId: number,
  ): Promise<Todo> {
    return await prisma.todo.create({
      data: {
        title,
        description,
        userId,
      },
    });
  }

  public static async updateTodo(
    id: number,
    title: string,
    description: string,
    userId: number,
  ): Promise<Todo> {
    return await prisma.todo.update({
      where: { id },
      data: { title, description, userId },
    });
  }

  public static async deleteTodo(id: number): Promise<Todo> {
    return await prisma.todo.delete({ where: { id } });
  }
}

export default TodoModel;
