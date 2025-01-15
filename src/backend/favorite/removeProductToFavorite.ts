'use server'

import FavoriteRepository from "./FavoriteRepository";

export default async function removeProductToFavorite(idFavoriteItem: number){
    return await FavoriteRepository.removeProductToFavorite(idFavoriteItem);
}