import { mutations } from './mutations';
import { queries } from './queries';
import { router } from './trpc';
 
export const appRouter = router({
    ...queries,
    ...mutations,
});

export type AppRouter = typeof appRouter;