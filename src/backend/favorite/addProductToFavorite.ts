'use server'

import FavoriteRepository from "./FavoriteRepository";

export default async function addProductToFavorite(idProduct: number){
    return await FavoriteRepository.addProductToFavorite(idProduct);
}