import { NextRequest, NextResponse} from "next/server";
import authService from "./backend/auth/auth-service";

{/* Middleware will be executed for all requests except for paths that correspond to static Next.js files 
    (such as images, JavaScript files, favicon.ico, etc.) */}
export const config = {
    matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
  };

  {/*These are public routes. Can be accessed by any user, even if they are not authenticated*/}
  const publicRoutes = [
    '/',
    '/signin',
    '/signup',
    '/category',
    '/search',
    '/product', 
  ];
  
  {/*These are private routes. Can only be accessed by authenticated users*/}
  const privateRoutes = [
    '/favorite',
    '/cart'
  ]

  {/*The function is executed whenever a request arrives at the server.*/}
  export async function middleware(req: NextRequest) {

    const pathname = req.nextUrl.pathname; {/*Get the path of the URL the user is trying to access*/}
    const session = await authService.isSessionValid(); {/*Checks if the user is authenticated.*/}

    {/*publicRoutes.some returns true if the route matches any of the conditions*/}
    const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));
  
    {/*privateRoutes.some returns true if the route matches any of the conditions*/}
    const isPrivateRoute = privateRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));

    {/*If the user is authenticated and tries to enter the login page he will be redirected to "/"*/}
    if (session && (pathname === '/signup' || pathname === '/signin')) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    {/*If the user is not authenticated and tries to enter a private route, they will be redirected to the login page*/}
    if (!session && isPrivateRoute && !isPublicRoute) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
  
    {/*If the request is valid, it allows the request to continue normally*/}
    return NextResponse.next();
}