import prisma from "../db";
import bcrypt from "bcrypt";
import authService from "../auth/auth-service";

export default class userRepository{

    static async createUser(name: string, email: string, password: string){

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data:{
                name: name,
                email: email,
                password: hashedPassword,
                Favorite: { create: {} }, 
                cart: { create: {} }, 
            },
        });

    } 

    static async loginUser(email: string, password: string){

        const user = await prisma.user.findUnique({
            where: {email},
        });

        if(user){

            const isMatch = await bcrypt.compare(password, user.password);

            if(isMatch){
                await authService.encrypt({id: user.id, name: user.name, email: user.email});
            }

        }

    }

    static async logoutUser(){
        await authService.logout();
    }

    static async getUser(){

        const isVallid = await authService.isSessionValid();

        if(isVallid){

            const {id, name, email}:any = await authService.getUser();
            return{
                id,
                name,
                email
            }

        }

        return null

    }

}