'use server'

import favoriteRepository from "./favoriteRepository";

export default async function getFavorite(){
    return await favoriteRepository.getFavorite();
}