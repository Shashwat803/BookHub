import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/sign-in', '/sign-up'])

export default clerkMiddleware(async (auth, req) => {
  console.log(`Middleware running for: ${req.nextUrl.pathname}`);
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}