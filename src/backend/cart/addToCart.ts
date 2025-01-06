'use server'

import cartRepository from "./cartRepository";

export default async function(idCartItem: number){
    return await cartRepository.addToCart(idCartItem);
}