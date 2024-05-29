import Link from 'next/link';
import classNames from 'classnames';
import { CreateList } from '@/components/CreateList';
import { randomColor } from '@/utils/randomColor';
import { useState } from 'react';
import { DELETE_TODO_LIST_MUTATION } from '@/graphql/operations';
import { client } from '@/lib/client'; 

export type TodoList = {
  id: number;
  created_at: string;
  name: string;
  email: string;
};

type MyListsProps = {
  list: TodoList[];
};

export const MyLists = ({ list = [] }: MyListsProps) => {
  const [todoLists, setTodoLists] = useState<TodoList[]>(list);

  const onCreateHandler = (newTodoList: TodoList) => {
    setTodoLists([...todoLists, newTodoList]);
  };

  const onDeletedHandler = async (id: string) => {
    try {
      await client.request(DELETE_TODO_LIST_MUTATION, { listId: id });
      setTodoLists(todoLists.filter((list) => list.id !== parseInt(id)));
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };

  return (
    <div className="flex flex-col gap-8 text-center">
      <h1 className="text-4xl">{todoLists.length > 0 ? 'My TODO lists' : 'No lists yet!'}</h1>
      <ul>
        {todoLists.map((item) => (
          <li key={item.id}>
            {/* Remove the <a> child from Link */}
            <Link href={item.id.toString()}>
              <div
                className={classNames(
                  'py-2 pl-4 pr-2 bg-gray-900 rounded-lg mb-4 flex justify-between items-center min-h-16 text-black hover:scale-[1.02] transform transition duration-300 ease-in-out',
                  randomColor(),
                )}
              >
                {item.name}
              </div>
            </Link>
            <button onClick={() => onDeletedHandler(item.id.toString())}>Delete</button>
          </li>
        ))}
      </ul>
      <CreateList onCreate={onCreateHandler} />
    </div>
  );
};
