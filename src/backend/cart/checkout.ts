'use server'

import cartRepository from "./cartRepository";

export default async function checkout(cartId: number){
    return cartRepository.checkout(cartId);
}