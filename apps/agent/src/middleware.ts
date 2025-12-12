import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import SessionManager from './libs/SessionManager';

const route = {
  path: {
    protected: {
      agent: ['/account'],
    },
    public: [
      '/sign-in',
      '/sign-in/verify-2fa',
      '/sign-up',
      '/verify',
      '/forgot-password',
      '/reset-password',
    ],
  },
};

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const utils = new SessionManager();

  const isProtectedRoute = route.path.protected.agent.some((p) =>
    path.startsWith(p),
  );
  const isPublicRoute = route.path.public.includes(`${path}`);

  const cookie = (await cookies()).get('xa92be3')?.value;
  const session = await utils.decrypt(cookie, process.env.REFRESH_TOKEN);

  if (isProtectedRoute && (!session || session.role !== 'agent')) {
    await utils.deleteSession('xa91fe7');
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
  }

  if (isPublicRoute && session && session.role === 'agent') {
    return NextResponse.redirect(
      new URL('/account/dashboard/overview', req.nextUrl),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
