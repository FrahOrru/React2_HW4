"use client";

import { client } from '@/lib/client';
import { useEffect, useState } from 'react';
import { TodoList, GET_TODO_LIST_QUERY } from '@/graphql/operations';
import { Todos } from '@/components/Todos';

type MyListPageProps = {
  params: { listId: string };
};

export default function MyListPage({ params: { listId } }: MyListPageProps) {
  const fetchData = async () => {
    try {
      const { getTODOList } = await client.request<{ getTODOList: TodoList }>(GET_TODO_LIST_QUERY, {
        listId: parseInt(listId),
      });
      return getTODOList;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  const [todoList, setTodoList] = useState<TodoList | null>(null);

  useEffect(() => {
    fetchData().then((data) => setTodoList(data));
  }, [listId]);

  return (
    <div className="flex align-center justify-center p-16 sm:p-8">
      {todoList && <Todos listId={todoList.id} list={todoList.todos} />}
    </div>
  );
}
