'use server'

import favoriteRepository from "./favoriteRepository";

export default async function removeProductFavorite(id: number){
    return await favoriteRepository.removeProductFavorite(id);
}