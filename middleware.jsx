import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt';

 
// This function can be marked `async` if using `await` inside
export  async function middleware(req) {
    console.log("All request properties" , req);
    const secret = process.env.NEXTAUTH_SECRET;
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log("Token" , token);

    if(!token){
        const url = new URL('/', req.url);
        url.searchParams.set('message', 'unauthorized');
        return NextResponse.redirect(url);

    }

    return NextResponse.next()

 
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/create-prompt/:path*' , '/update-prompt/:path*' , '/profile/:path*' ],
}