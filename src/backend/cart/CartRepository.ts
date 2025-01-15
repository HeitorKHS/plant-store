import prisma from "../db";
import authService from "../auth/auth-service";

export default class CartRepository{

    static async getCart(){

        if(await authService.isSessionValid()){

            const { cart } = await authService.getUser() as { cart:number };

            const cartItem = await prisma.cartItem.findMany({
                where:{
                    cartId: cart,
                },
                include:{
                    product: true,
                },
            });
            
            let total = 0; 
            cartItem.forEach(item => total += item.quantity * item.product.price);

            return {
                cartItem: cartItem,
                total: total,
            };

        }

        return {
            cartItem: [],
            total: 0,
        };

    }

    static async inCart(idProduct: number){
    
        if(await authService.isSessionValid()){

            const { cart } = await authService.getUser() as { cart:number };

            const item = await prisma.cartItem.findFirst({
                where:{
                    cartId: cart,
                    productId: idProduct,
                }
            })
    
            return item?.id || null;

        }

        return null;

    }

    static async removeProductToCart(idCartItem: number){

        await prisma.cartItem.delete({
            where: {
                id: idCartItem,
            },
        }); 

        return null;

    }

    static async addProductToCart(idProduct: number) {

        if(await authService.isSessionValid()){

            const { cart } = await authService.getUser() as { cart:number };
        
            const item = await prisma.cartItem.create({
                data: {
                        productId: idProduct,
                        cartId: cart, 
                    },
            });

            return item.id; 

        }

    }         

    static async addQuantity(idCartItem: number){

        await prisma.cartItem.update({
            where: { id: idCartItem },
            data: {
                quantity: {
                    increment: 1,
                },
            },
        })

    }
    
    static async removeQuantity(idCartItem: number){

        await prisma.cartItem.update({
            where: { id: idCartItem },
            data:{
                quantity:{
                    decrement: 1,
                },
            },
        })
    }

    static async checkout(){

        if(await authService.isSessionValid()){

            const { cart } = await authService.getUser() as { cart: number }

            const cartUser = await prisma.cart.findUnique({
                where: { id:cart },
                include: {
                    cartItems: true,
                }
            })
    
            if(cartUser){
                
                cartUser.cartItems.forEach( async (item) => {
                    
                    await prisma.product.update({
                        where:{ id: item.productId },
                        data:{
                            stock: {decrement: item.quantity},
                            quantity_sold: {increment: item.quantity},
                        },
                    })
    
                });
    
                await prisma.cartItem.deleteMany({
                    where: { cartId:cartUser.id },
                })
    
            }

        }

    }

}