import Google from 'next-auth/providers/google';
import type { NextAuthConfig } from 'next-auth';

// Lightweight auth config safe for Edge Runtime (no DB adapter).
// Used by middleware and as the base for the full auth config in auth.ts.
export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'select_account',
        },
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnSignIn = nextUrl.pathname === '/sign-in';
      const isRoot = nextUrl.pathname === '/';

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to /sign-in
      }

      if (isLoggedIn && (isOnSignIn || isRoot)) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      if (!isLoggedIn && isRoot) {
        return Response.redirect(new URL('/sign-in', nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
