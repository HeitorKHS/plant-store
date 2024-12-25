'use server'

import favoriteRepository from "./favoriteRepository";

export default async function inFavorite(idProduct: number){
    return await favoriteRepository.inFavorite(idProduct);
}