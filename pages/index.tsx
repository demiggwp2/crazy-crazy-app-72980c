import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTodos } from '../trpc';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import DebugMenu from '../components/DebugMenu';

export default function Home() {
  const { data: todos } = useQuery(getTodos);

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold text-purple-500">Todo: The Cyberpunk Apocalypse Survival Planner</h1>
      <p className="mt-2 text-purple-300">Your to-do list is your weapon. Complete tasks to survive the end.</p>
      <TodoInput />
      <TodoList />
      <DebugMenu />
    </div>
  );
}
