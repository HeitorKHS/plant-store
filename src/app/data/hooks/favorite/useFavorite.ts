import { useEffect, useState } from "react";
import Backend from "@/backend";
import { Product } from "@/core/models/Product";

export interface favoriteItem{
    id: number,
    product: Product,
}

export default function useFavorite(){

    const [favorite, setFavorite] = useState<favoriteItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(()=>{
        updateFavorite();
    },[])

    async function updateFavorite(){
        setLoading(true);
        await Backend.favorite.getFavorite().then(setFavorite);
        setLoading(false);
    }

    return{
        favorite,
        loading,
        removeProductToFavorite:(idFavoriteItem: number)=>{
            Backend.favorite.removeProductToFavorite(idFavoriteItem);
            updateFavorite();
        }
    }

}