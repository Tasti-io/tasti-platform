import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // For now, allow all requests (auth will be added next iteration)
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
