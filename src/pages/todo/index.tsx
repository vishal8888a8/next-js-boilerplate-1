import TodoList from "@/components/Todo/TodoList";
import { getTodos, getTodosByDueDate } from "@/services/todo.service";
import type { TodoData } from "@/types/todo.type";
import type { GetServerSideProps } from "next";
import { markTodoAsDone } from "@/services/todo.service";

interface TodoProps {
  todos: TodoData[];
}

async function CheckboxToggle(id: string) {
  await markTodoAsDone(id);
}

export default function Todo({ todos }: TodoProps) {
  return <TodoList CheckboxToggle={CheckboxToggle} todos={todos} />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let dueDate =
    ctx.query.dueDate ??
    new Date(Date.now() + 19800000).toISOString().split("T")[0]; // setting the date in yyyy-mm-dd format and adding a 5 hr 30 min offset for indian time
  console.log("dueDate", dueDate);
  let todos: TodoData[] = [];
  try {
    if (!dueDate) {
      todos = await getTodos();
      return {
        props: {
          todos,
        },
      };
    }
    todos = await getTodosByDueDate(dueDate as string);
    return {
      props: {
        todos,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        todos: [],
      },
    };
  }
};
