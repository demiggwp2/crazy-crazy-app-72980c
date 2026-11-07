import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { addTodo } from '../trpc';

export default function TodoInput() {
  const [task, setTask] = useState('');
  const { mutate } = useMutation(addTodo);

  return (
    <div className="flex mb-4">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a task to survive the apocalypse..."
        className="p-2 flex-1 border rounded-l"
      />
      <button
        onClick={() => {
          mutate({ task });
          setTask('');
        }}
        className="bg-purple-600 text-white p-2 rounded-r hover:bg-purple-700 transition-colors"
      >
        🔥 Add Task
      </button>
    </div>
  );
}
