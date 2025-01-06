'use server'

import cartRepository from "./cartRepository";

export default async function removeProduct(idCartItem: number){
    return cartRepository.removeProduct(idCartItem);
}