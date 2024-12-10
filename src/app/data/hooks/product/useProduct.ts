import { Product } from "@/core/models/Product";
import { useEffect, useState } from "react"
import Backend from "@/backend";

export default function useProduct( {slug} : {slug: string} ){

    const [product, setProduct] = useState<Product>();

    useEffect(()=>{
        getProduct();
    },[])

    async function getProduct(){
        const fetchedProduct = await Backend.product.getProduct(slug);
        if(fetchedProduct){
            setProduct(fetchedProduct);
        }
    }

    return{
        product,
    }

}