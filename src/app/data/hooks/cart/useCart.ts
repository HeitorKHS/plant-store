import Backend from "@/backend";
import { useEffect, useState } from "react"
import { Product } from "@/core/models/Product";

export interface cartItemProps{
    product: Product,
    quantity: number,
    id: number,
}

export interface cartProps{
    cartId: number,
    cartItems: cartItemProps[],
    total: number,    
}

export default function useCart(){

    const [cart, setCart] = useState<cartProps>();

    useEffect(()=>{
        updateCart();
    },[])

    function updateCart(){
        Backend.cart.getCart().then(setCart);
    }

    return{
        cart,
        addToCart:(idCartItem: number)=>{ 
            Backend.cart.addToCart(idCartItem);
            updateCart();
        },
        removeToCart:(idCartItem: number)=>{ 
            Backend.cart.removeToCart(idCartItem);
            updateCart();
        },
        removeProduct:(idCartItem: number)=>{
            Backend.cart.removeProduct(idCartItem);
            updateCart();
        },
        checkout:(cartId: number)=>{
            Backend.cart.checkout(cartId);
            updateCart();
        }
    }

}