栋

Okay, I need to create a crazy todo app that's 10x the features. Let's start with the tagline. It should be something insane. Maybe "Todo: The Cyberpunk Apocalypse Survival Planner" – that sounds wild.

Next, the tech stack. The user wants modern tech, so Next.js, Supabase, tRPC, shadcn, and a custom AI agent. Also, add some Easter eggs and a debug menu.

For the project structure, I'll have the usual folders: app, components, pages, styles, utils. But also add some fun folders like easter-eggs and debug-menu.

In the app folder, the todo app will be in pages/index.tsx. The components will include TodoList, TodoInput, and DebugMenu. The styles will use shadcn's tailwind classes.

The Supabase setup needs a todos table with id, task, is_complete, and created_at. The tRPC routes will handle creating, updating, and deleting todos. The AI agent could be a simple function that gives motivational quotes.

The Easter egg could be a secret message when the user completes all tasks. The debug menu should have buttons to add test todos, clear all, or toggle the AI agent.

The code for the TodoInput component will handle adding new tasks. The TodoList will display each task with a checkbox and delete button. The DebugMenu has the secret easter egg and debug options.

For the styles, I'll use some cyberpunk colors – neon green and purple. The AI agent's quotes can be random from an array.

Testing the app: when the user adds a task, it goes to Supabase. Toggling complete updates the status. Deleting removes it. The Easter egg triggers when all tasks are done, showing a secret message.

The debug menu allows adding test todos, clearing all, and toggling the AI agent. The AI agent gives quotes when enabled.

How to run it: use the provided commands with Next.js, Supabase, and tRPC. The Easter egg is activated by completing all tasks, and the debug menu is accessible via a button.
</think>

**Todo: The Cyberpunk Apocalypse Survival Planner**  
*(Because your to-do list should also predict the end of the world and let you fight it with a laser sword.)*  

Alright, here's the full stack:

```
todo-apocalypse-survival-planner/
├── app/
│   ├── pages/
│   │   └── index.tsx
│   ├── components/
│   │   ├── TodoInput.tsx
│   │   ├── TodoList.tsx
│   │   └── DebugMenu.tsx
│   ├── utils/
│   │   ├── aiAgent.ts
│   │   └── supabaseClient.ts
│   └── styles/
│       └── globals.css
├── supabase/
│   └── tables/
│       └── todos.sql
├── trpc/
│   ├── router.ts
│   └── types.ts
├── package.json
└── .env
```

---

**supabase/tables/todos.sql**
```sql
CREATE TABLE todos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task TEXT NOT NULL,
  is_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

**trpc/types.ts**
```ts
export type Todo = {
  id: string;
  task: string;
  is_complete: boolean;
  created_at: Date;
};
```

---

**trpc/router.ts**
```ts
import { createTRPCRouter, publicProcedure } from '@trpc/server';
import { z } from 'zod';

export const todoRouter = createTRPCRouter({
  addTodo: publicProcedure
    .input(z.object({ task: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { data } = await ctx.supabase.from('todos').insert([{ task: input.task }]);
      return data[0];
    }),

  toggleTodo: publicProcedure
    .input(z.object({ id: z.string(), is_complete: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      const { data } = await ctx.supabase
        .from('todos')
        .update([{ is_complete: input.is_complete }])
        .eq('id', input.id);
      return data[0];
    }),

  deleteTodo: publicProcedure.input(z.object({ id: z.string() })).mutation(async ({ input, ctx }) => {
    const { data } = await ctx.supabase.from('todos').delete().eq('id', input.id);
    return data;
  }),

  getTodos: publicProcedure.query(({ ctx }) => {
    return ctx.supabase.from('todos').select('*');
  }),
});
```

---

**utils/supabaseClient.ts**
```ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);
```

---

**utils/aiAgent.ts**
```ts
const motivationalQuotes = [
  'You are the chosen one. The apocalypse is just a to-do list away.',
  'Every task you complete is a step toward saving humanity.',
  'The matrix has you. But your todo app is stronger.',
  'Do not fear the end. It will be completed by you.',
];

export const getAIQuote = () => {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
};
```

---

**components/TodoInput.tsx**
```tsx
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
```

---

**components/TodoList.tsx**
```tsx
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
```

---

**components/DebugMenu.tsx**
```tsx
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
```

---

**pages/index.tsx**
```tsx
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
```

---

**styles/globals.css**
```css
body {
  background: linear-gradient(135deg, #1a1a1a, #0f0f0f);
  color: #ffffff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

button {
  transition: all 0.2s ease-in-out;
}
```

---

**package.json**
```json
{
  "name": "todo-apocalypse-survival-planner",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "@tanstack/react-query": "^4.25.0",
    "@supabase/supabase-js": "^2.8.2",
    "next": "^13.5.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.3.3",
    "typescript": "^5.3.3"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

---

**.env**
```env
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
```

---

How do you want to run it?  
Copy this command and run it:  
```bash
npx create-next-app@latest todo-apocalypse-survival-planner && cd todo-apocalypse-survival-planner && npm install @tanstack/react-query @supabase/supabase-js tailwindcss
```