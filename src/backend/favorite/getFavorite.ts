'use server'

import FavoriteRepository from "./FavoriteRepository";

export default async function getFavorite(){
    return await FavoriteRepository.getFavorite();
}