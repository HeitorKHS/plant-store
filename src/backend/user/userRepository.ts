import prisma from "../db";
import bcrypt from "bcrypt";
import authService from "../auth/auth-service";
import { error } from "console";

export default class userRepository{

    static async createUser(name: string, email: string, password: string){

        const users = await prisma.user.count();

        if(users >= 5){

            const oldUser = await prisma.user.findFirst({
                orderBy: {
                    createdAt: 'asc',
                },
            })

            if(oldUser){

                await prisma.cartItem.deleteMany({
                    where: { cart: { userId: oldUser.id } },
                });
    
                await prisma.favoriteItem.deleteMany({
                    where: { favorite: { userId: oldUser.id } },
                });
    
                await prisma.cart.delete({
                    where: { userId: oldUser.id },
                });
    
                await prisma.favorite.delete({
                    where: { userId: oldUser.id },
                });
    
                await prisma.user.delete({
                    where: { id: oldUser.id },
                });
            }

        }

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
            } else{
                throw new Error("Incorrect password");
            }

        } else{
            throw new Error("User not found");
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