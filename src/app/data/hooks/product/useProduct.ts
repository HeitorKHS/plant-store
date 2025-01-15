import Backend from "@/backend";

import { Product } from "@/core/models/Product";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useProduct( { slug } : { slug: string } ){
 
    const router = useRouter();

    const [product, setProduct] = useState<Product|null>();
    const [loading, setLoading] = useState<boolean>(true);
    const [inFavorite, setInFavorite] = useState<number|null>();
    const [inCart, setInCart] = useState<number|null>(null);

    useEffect(()=>{
       getProduct();
    },[slug])

    async function getProduct(){
        setLoading(true)
        const fetchProduct = await Backend.product.getProduct(slug);
        if(fetchProduct){
            setProduct(fetchProduct);
            Backend.cart.inCart(fetchProduct.id).then(setInCart);
            Backend.favorite.inFavorite(fetchProduct.id).then(setInFavorite);
        }
        setLoading(false)
    }

    return{
        product,
        loading,
        inCart,
        inFavorite,
        removeProductToCart:(idCartItem: number)=>{
            Backend.cart.removeProductToCart(idCartItem).then(setInCart);
        },
        addProductToCart: async (idProduct: number)=>{
            const response = await Backend.cart.addProductToCart(idProduct);
            if(response){
                setInCart(response);
            }else{
                router.push("/signin");
            }
        },
        removeProductToFavorite:(idFavoriteItem: number)=>{
            Backend.favorite.removeProductToFavorite(idFavoriteItem).then(setInFavorite);
        },
        addProductToFavorite: async (idProduct: number)=>{
            const response = await Backend.favorite.addProductToFavorite(idProduct);
            if(response){
                setInFavorite(response);
            }else{
                router.push("/signin");
            }
        }
    }

}