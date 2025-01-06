'use server'

import cartRepository from "./cartRepository";

export default async function removeToCart(idCartItem: number){
    return await cartRepository.removeToCart(idCartItem);
}