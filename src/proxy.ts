import { NextRequest, NextResponse } from "next/server";

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get("host") || "";

  const hostnameWithoutPort = hostname.split(":")[0];
  const rootDomainWithoutPort = ROOT_DOMAIN.split(":")[0];

  const isRootDomain =
    hostnameWithoutPort === rootDomainWithoutPort ||
    hostnameWithoutPort === "localhost";

  if (isRootDomain) {
    return NextResponse.next();
  }

  if (hostnameWithoutPort.endsWith(`.${rootDomainWithoutPort}`)) {
    const subdomain = hostnameWithoutPort.replace(`.${rootDomainWithoutPort}`, "");
    
    if (subdomain && subdomain !== hostnameWithoutPort) {
      url.pathname = `/${subdomain}${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
