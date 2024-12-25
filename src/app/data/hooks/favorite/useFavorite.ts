import { useEffect, useState } from "react";
import Backend from "@/backend";
import { Product } from "@/core/models/Product";

export interface favoriteItem{
    id: number,
    product: Product,
}

export default function useFavorite(){

    const [favorite, setFavorite] = useState<favoriteItem[]>();

    useEffect(()=>{
        updateFavorite();
    },[])

    function updateFavorite(){
        Backend.favorite.getFavorite().then(setFavorite);
    }

    return{
        favorite,
        removeProduct: (id: number)=>{
            Backend.favorite.removeProductFavorite(id);
            updateFavorite();
        }
    }

}