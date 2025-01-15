'use server'

import CartRepository from "./CartRepository";

export default async function removeQuantity(idCartItem: number){
    return await CartRepository.removeQuantity(idCartItem);
}