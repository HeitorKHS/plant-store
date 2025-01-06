import { Product } from "@/core/models/Product";
import { useEffect, useState } from "react"
import Backend from "@/backend";
import { useRouter } from "next/navigation";

export default function useProduct( {slug} : {slug: string} ){
    
    const router = useRouter();

    const [product, setProduct] = useState<Product>();
    const [error, setError] = useState<boolean>(false);
    const [inFavorite, setInFavorite] = useState<number|null>();
    const [inCart, setInCart] = useState<number|null>();

    useEffect(()=>{
        getProduct();
    },[])

    async function getProduct(){
        const fetchedProduct = await Backend.product.getProduct(slug);
        if(fetchedProduct){
            setProduct(fetchedProduct);
            Backend.favorite.inFavorite(fetchedProduct.id).then(setInFavorite);
            Backend.cart.inCart(fetchedProduct.id).then(setInCart);
            setError(false);
        } else {
            setError(true);
        }
    }

    return{
        error,
        product,
        inFavorite,
        inCart,
        removeFavorite:(idFavoriteItem: number)=>{
            Backend.favorite.removeProductFavorite(idFavoriteItem);
            setInFavorite(null);
        },
        addFavorite: async (idProduct: number)=>{
            const response = await Backend.favorite.addProductFavorite(idProduct);
            if(response){
                setInFavorite(response);
            }else{
                getProduct();router.push("/signin")
            }
        },
        removeCart:(idCartItem: number)=>{
            Backend.cart.removeProduct(idCartItem);
            setInCart(null);
        },
        addCart: async (idProduct: number)=>{
            const response = await Backend.cart.addProduct(idProduct);
            if(response){
                setInCart(response);
            }else{
                getProduct();router.push("/signin")
            }
        },
    }

}