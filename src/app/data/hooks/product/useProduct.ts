import { Product } from "@/core/models/Product";
import { useEffect, useState } from "react"
import Backend from "@/backend";
import { useRouter } from "next/navigation";

export default function useProduct( {slug} : {slug: string} ){
    
    const router = useRouter();

    const [product, setProduct] = useState<Product>();
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
        } else {
            router.push("/not-found")
        }
    }

    return{
        product,
        inFavorite,
        removeFavorite:(idFavoriteItem: number)=>{
            Backend.favorite.removeProductFavorite(idFavoriteItem);
            getProduct();
        },
        addFavorite:(idProduct: number)=>{
            const response = Backend.favorite.addProductFavorite(idProduct);
            if(response === null){
                router.push("/signin")
            }else{
                getProduct();
            }
        },
    }

}