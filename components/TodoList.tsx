import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getTodos, toggleTodo, deleteTodo } from '../trpc';

export default function TodoList() {
  const { data: todos } = useQuery(getTodos);
  const { mutate: toggle } = useMutation(toggleTodo);
  const { mutate: remove } = useMutation(deleteTodo);

  return (
    <div className="space-y-2">
      {todos?.data.map((todo) => (
        <div
          key={todo.id}
          className={`p-3 rounded-lg flex items-center justify-between ${
            todo.is_complete ? 'bg-green-100 border-l-4 border-green-500' : 'bg-gray-800 text-white'
          }`}
        >
          <span className={todo.is_complete ? 'line-through' : ''}>{todo.task}</span>
          <div className="flex space-x-2">
            <button
              onClick={() =>
                toggle({
                  id: todo.id,
                  is_complete: !todo.is_complete,
                })
              }
              className="text-green-500 hover:text-green-700"
            >
              {todo.is_complete ? 'Unchecked' : 'Check'}
            </button>
            <button
              onClick={() => remove({ id: todo.id })}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
