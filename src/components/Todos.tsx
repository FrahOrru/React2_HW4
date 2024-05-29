import { useEffect, useState } from 'react';
import { Heart } from '@/components/icons/Heart';
import { Close } from '@/components/icons/Close';
import { AddTodo } from '@/components/AddTodo';
import { client } from '@/lib/client';
import { ADD_TODO_MUTATION, DELETE_TODO_MUTATION, FINISH_TODO_MUTATION } from '@/graphql/operations';

export type Todo = {
  id: number;
  desc: string;
  finished: boolean;
};

type TodosProps = {
  listId: number;
  list: Todo[];
};

export const Todos = ({ list = [], listId }: TodosProps) => {
  const [todos, setTodos] = useState<Todo[]>(list);

  useEffect(() => {
    setTodos(list);
  }, [list]);

  const onAddHandler = async (desc: string) => {
    try {
      const { addTODO } = await client.request<{ addTODO: Todo }>(ADD_TODO_MUTATION, {
        listId,
        desc,
      });
      setTodos((prevTodos) => [...prevTodos, addTODO]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const onRemoveHandler = async (id: number) => {
    try {
      await client.request(DELETE_TODO_MUTATION, { todoId: id });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const onFinishHandler = async (id: number) => {
    try {
      const { finishTODO } = await client.request<{ finishTODO: Todo }>(FINISH_TODO_MUTATION, { todoId: id });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, finished: finishTODO.finished } : todo))
      );
    } catch (error) {
      console.error('Error finishing todo:', error);
    }
  };

  return (
    <div>
      <h2 className="text-center text-5xl mb-10">My TODO list</h2>
      <ul>
        {todos.map((item) => (
          <li
            key={item.id}
            className="py-2 pl-4 pr-2 bg-gray-900 rounded-lg mb-4 flex justify-between items-center min-h-16"
          >
            <p className={item.finished ? 'line-through' : ''}>{item.desc}</p>
            {!item.finished && (
              <div className="flex gap-2">
                <button
                  className="btn btn-square btn-accent"
                  onClick={() => onFinishHandler(item.id)}
                >
                  <Heart />
                </button>
                <button
                  className="btn btn-square btn-error"
                  onClick={() => onRemoveHandler(item.id)}
                >
                  <Close />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <AddTodo onAdd={onAddHandler} />
    </div>
  );
};
