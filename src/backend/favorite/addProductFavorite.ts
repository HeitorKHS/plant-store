'use server'

import favoriteRepository from "./favoriteRepository";

export default async function addProductFavorite(idProduct: number){
    return await favoriteRepository.addProductFavorite(idProduct);
}