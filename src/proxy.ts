import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './lib/auth';

export async function proxy(request: NextRequest) {
     const session = await auth.api.getSession({
          headers: await headers()
     });

     if (session) {
          return NextResponse.next();
     }

     return NextResponse.redirect(new URL('/auth/login', request.url));
}

export const config = {
     matcher: [
          '/dashboard/user',
          '/dashboard/user/add-report',
          '/dashboard/user/my-reports',
          '/dashboard/user/profile'
     ],
};