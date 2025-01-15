import { useEffect, useState } from "react";

import { Product } from "@/core/models/Product";
import Backend from "@/backend";

export interface cartProps{
    cartItem:{
        product: Product,
        quantity: number,
        id: number,
    }[],
    total: number,
}

export default function useCart(){

    const [cart, setCart] = useState<cartProps>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(()=>{
        updateCart();
    },[])

    async function updateCart(){
        setLoading(true);
        await Backend.cart.getCart().then(setCart);
        setLoading(false);
    }

    return{
        cart,
        loading,
        removeProductToCart: (idCartItem: number)=>{
            Backend.cart.removeProductToCart(idCartItem);
            updateCart();
        },
        addQuantity:(idCartItem: number)=>{
            Backend.cart.addQuantity(idCartItem);
            updateCart();
        },
        removeQuantity:(idCartItem: number)=>{
            Backend.cart.removeQuantity(idCartItem);
            updateCart();
        },
        checkout:()=>{
            Backend.cart.checkout();
            updateCart();
        }
    }

}