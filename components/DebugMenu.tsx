import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { addTodo, deleteTodo, toggleTodo } from '../trpc';
import { getAIQuote } from '../utils/aiAgent';

export default function DebugMenu() {
  const [showDebug, setShowDebug] = useState(false);
  const [testTask, setTestTask] = useState('Survive the Matrix');

  const { mutate: addTestTodo } = useMutation(addTodo);
  const { mutate: deleteAllTodos } = useMutation(deleteTodo);

  return (
    <div className="fixed bottom-0 left-0 p-4 bg-black bg-opacity-80 text-white">
      <button
        onClick={() => setShowDebug(!showDebug)}
        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition-colors"
      >
        {showDebug ? 'Hide Debug Menu' : 'Show Debug Menu'}
      </button>

      {showDebug && (
        <div className="mt-4 bg-gray-800 p-4 rounded shadow-lg">
          <h3 className="text-purple-500 font-bold">Debug Zone Activated</h3>
          <div className="mt-2">
            <input
              type="text"
              value={testTask}
              onChange={(e) => setTestTask(e.target.value)}
              placeholder="Enter a test task"
              className="p-2 border rounded w-full"
            />
            <button
              onClick={() => {
                addTestTodo({ task: testTask });
                setTestTask('Survive the Matrix');
              }}
              className="mt-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-colors"
            >
              Add Test Task
            </button>
          </div>
          <button
            onClick={() => {
              deleteAllTodos({ id: 'all' });
            }}
            className="mt-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
          >
            Clear All Todos (Apocalypse Reset)
          </button>
          <div className="mt-4">
            <p className="text-sm italic">AI Agent: "{getAIQuote()}"</p>
          </div>
        </div>
      )}
    </div>
  );
}
