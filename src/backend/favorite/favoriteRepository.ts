import authService from "../auth/auth-service";
import prisma from "../db";

export default class favoriteRepository{

    static async getFavorite(){

        const isValid = await authService.isSessionValid();

        if(isValid){
            const {id}:any = await authService.getUser();

            const favorite = await prisma.favorite.findUnique({
                where:{
                    userId: id,
                },
                include:{
                    favoriteItems:{
                        include:{
                            product: true,
                        },
                    },
                },
            });

            return favorite?.favoriteItems ?? [];

        }

    }

    static async removeProductFavorite(id: number){

        await prisma.favoriteItem.delete({
            where:{
                id: id,
            },
        });

    }

    static async addProductFavorite(idProduct: number) {
        const isValid = await authService.isSessionValid();
    
        if (isValid) {
            
            const { id }: any = await authService.getUser();
    
            const userFavorite = await prisma.favorite.findUnique({
                where: { userId: id }, 
            });
    
            if (userFavorite) {
                const item = await prisma.favoriteItem.create({
                    data: {
                        productId: idProduct,
                        favoriteId: userFavorite.id, 
                    },
                });
                
                return item.id; 
            }         
        } else {
            return null;
        }
    }

    static async inFavorite(idProduct: number){

        const isValid = await authService.isSessionValid();
    
        if (isValid){
            const { id }: any = await authService.getUser();
            
            const favorite = await prisma.favorite.findUnique({
                where: { userId: id },
                include: { favoriteItems: true },
            });
        
            return favorite?.favoriteItems.find(item => item.productId === idProduct)?.id || null;
        }

        return null;
    }

}