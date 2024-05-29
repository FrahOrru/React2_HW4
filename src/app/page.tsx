"use client";
import { MyLists } from '@/components/MyLists';
import { client } from '@/lib/client';
import { MY_EMAIL_KEY } from '../constants/email';
import { TodoList, GET_TODO_LISTS_QUERY } from '@/graphql/operations';
import { useEffect, useState } from 'react';

export default function Home() {
  const fetchData = async () => {
    try {
      const { getTODOLists } = await client.request<{ getTODOLists: TodoList[] }>(GET_TODO_LISTS_QUERY, {
        email: MY_EMAIL_KEY,
      });
      return getTODOLists;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const [todoLists, setTodoLists] = useState<TodoList[]>([]);

  useEffect(() => {
    fetchData().then((data) => setTodoLists(data));
  }, []);

  return (
    <div className="p-8 flex items-center flex-col">
      <div className="w-full max-w-[500px]">
        <MyLists list={todoLists} />
      </div>
    </div>
  );
}
