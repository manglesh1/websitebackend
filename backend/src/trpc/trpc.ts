
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { TRPCError, initTRPC } from '@trpc/server';
 
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create();

const middleware = t.middleware

const isAuth = middleware(async (opts) => {
    const{ getUser } = getKindeServerSession();
    const user = await getUser();

    if(!user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED"})
    }

    return opts.next({
        ctx: {
            userId: user.id,
            user,
        }
    })
})

 
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;

export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth)