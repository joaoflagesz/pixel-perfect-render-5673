import { createStart, createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";
const errors = createMiddleware().server(async ({ next }) => {
  try { return await next(); }
  catch (error) { console.error(error); throw error; }
});
const csrf = createCsrfMiddleware({ filter: (ctx) => ctx.handlerType === "serverFn" });
export const startInstance = createStart(() => ({ requestMiddleware: [errors, csrf] }));
