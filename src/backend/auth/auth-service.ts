import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const key = new TextEncoder().encode(process.env.AUTH_SECRET);

export default class authService{

    static async decrypt(token: string){
        const { payload } = await jwtVerify(token, key);
        return payload;
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async encrypt(payload: any) {
        const session = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256',})
        .setExpirationTime('1d')
        .sign(key);
    
        const {exp} = await this.decrypt(session);

        (await cookies()).set('session', session, {expires: (exp as number) * 1000, path: '/', httpOnly: true});
    }

    static async isSessionValid(){

        const sessionCookie = (await cookies()).get('session');
        
        if (sessionCookie){
            const { value } = sessionCookie;
            const {exp} = await this.decrypt(value);
            const currentDate = new Date().getTime();

            return ((exp as number) * 1000) > currentDate;
        }

        return false
    }

    static async getUser(){

        const sessionCookie = (await cookies()).get('session');

        if (sessionCookie){
            const { value } = sessionCookie;
            const {id, name, email, cart, favorite} = await this.decrypt(value);
            return {
                id,
                name,
                email,
                cart,
                favorite
            };
        }

        return null
    }

    static async logout(){
        return (await cookies()).delete('session');
    }

}