'use server'

import FavoriteRepository from "./FavoriteRepository";

export default async function inFavorite(idProduct: number){
    return await FavoriteRepository.inFavorite(idProduct);
}