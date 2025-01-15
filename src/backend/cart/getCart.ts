'use server'

import CartRepository from "./CartRepository";

export default async function getCart(){
    return await CartRepository.getCart();
}