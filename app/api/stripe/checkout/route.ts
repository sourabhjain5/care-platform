// Stripe checkout route — currently unused.
// Kept as a stub for potential future payment integration.

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL('/dashboard', request.url));
}
