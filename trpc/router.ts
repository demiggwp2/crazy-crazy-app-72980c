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
