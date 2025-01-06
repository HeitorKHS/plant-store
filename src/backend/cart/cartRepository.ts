import prisma from "../db";
import authService from "../auth/auth-service";

export default class cartRepository{

    static async getCart(){

        const isValid = await authService.isSessionValid();

        if(isValid){
            
            const {id}:any = await authService.getUser();

            const cart = await prisma.cart.findUnique({
                where: {
                    userId: id,
                },
                include: {
                    cartItems: {
                        include: {
                            product: true,
                        },
                    },
                },
            });

            if(cart) {
                let total = 0; 
                cart.cartItems.forEach(item => {
                    total += item.quantity * item.product.price;
                });

                return {
                    cartId: cart.id,
                    cartItems: cart.cartItems,
                    total: total,
                };
            }
            
        }
    
        return {
            cartId: 0,
            cartItems: [],
            total: 0,
        };

    }

    static async inCart(idProduct: number){

        const isValid = await authService.isSessionValid();
    
        if (isValid){
            const { id }: any = await authService.getUser();
            
            const cart = await prisma.cart.findUnique({
                where: { userId: id },
                include: { cartItems: true },
            });
        
            return cart?.cartItems.find(item => item.productId === idProduct)?.id || null;
        }

        return null;
    }

    static async removeProduct(idCartItem: number){

        await prisma.cartItem.delete({
            where: {
                id: idCartItem,
            },
        }); 
    }

    static async addProduct(idProduct: number) {
        const isValid = await authService.isSessionValid();
    
        if (isValid) {
            
            const { id }: any = await authService.getUser();
    
            const userCart = await prisma.cart.findUnique({
                where: { userId: id }, 
            });
    
            if (userCart) {
                const item = await prisma.cartItem.create({
                    data: {
                        productId: idProduct,
                        cartId: userCart.id, 
                    },
                });
                
                return item.id; 
            }         
        } else {
            return null;
        }
    }

    static async addToCart(idCartItem: number){

        await prisma.cartItem.update({
            where: { id: idCartItem },
            data: {
                quantity: {
                    increment: 1,
                },
            },
        })

    }

    static async removeToCart(idCartItem: number){

        await prisma.cartItem.update({
            where: { id: idCartItem },
            data:{
                quantity:{
                    decrement: 1,
                },
            },
        })
    }

    static async checkout(cartId: number){

        const cart = await prisma.cart.findUnique({
            where: { id:cartId },
            include: {
                cartItems: true,
            }
        })

        if(cart){
            
            cart.cartItems.forEach( async (item) => {
                
                await prisma.product.update({
                    where:{ id: item.productId },
                    data:{
                        stock: {decrement: item.quantity},
                        quantity_sold: {increment: item.quantity},
                    },
                })

            });

            await prisma.cartItem.deleteMany({
                where: { cartId:cart.id },
            })

        }

    }

}