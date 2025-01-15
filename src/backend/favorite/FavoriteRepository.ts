import prisma from "../db";
import authService from "../auth/auth-service";

export default class FavoriteRepository{

    static async getFavorite(){

        if(await authService.isSessionValid()){

            const { favorite } = await authService.getUser() as { favorite:number };

            const favoriteItem =  await prisma.favoriteItem.findMany({
                where:{
                    favoriteId: favorite,
                },
                include: {
                    product: true,
                },
            });

            return favoriteItem ?? []

        }

        return [];

    }

    static async inFavorite(idProduct: number){
    
        if(await authService.isSessionValid()){

            const { favorite } = await authService.getUser() as { favorite:number };

            const item = await prisma.favoriteItem.findFirst({
                where:{
                    favoriteId: favorite,
                    productId: idProduct,
                }
            })
    
            return item?.id || null;

        }

        return null;

    }

    static async removeProductToFavorite(idFavoriteItem: number){

        await prisma.favoriteItem.delete({
            where:{
                id:idFavoriteItem,
            },
        });

        return null;

    }

    static async addProductToFavorite(idProduct: number){

        if(await authService.isSessionValid()){

            const { favorite } = await authService.getUser() as { favorite:number };

            const item = await prisma.favoriteItem.create({
                data: {
                    productId:idProduct,
                    favoriteId:favorite,
                },
            });

            return item.id;

        }

    }

}