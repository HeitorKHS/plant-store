import prisma from "../db";
import bcrypt from "bcrypt";
import authService from "../auth/auth-service";

export default class UserRepository{

    static async createUser(name: string, email: string, password: string){

        if(await prisma.user.count() >= 5){

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
            include: { 
                cart: true,
                Favorite: true,
            }
        });

        if(!user || !(await bcrypt.compare(password, user.password))){

            throw new Error( user ? "Incorrect password" : "User not found");

        }

        await authService.encrypt({id: user.id, name: user.name, email: user.email, cart: user.cart?.id, favorite: user.Favorite?.id});

    }

    static async getUser(){

        if(await authService.isSessionValid()){

            const {id, name, email, cart, favorite} = await authService.getUser() as {id: number, name: string, email: string, cart: number, favorite: number};
            
            return{
                id,
                name,
                email,
                cart,
                favorite
            }

        }

        return null

    }

    static async logoutUser(){
        await authService.logout();
    }

}