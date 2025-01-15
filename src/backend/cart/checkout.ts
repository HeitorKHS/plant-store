'use server'

import CartRepository from "./CartRepository";

export default async function checkout(){
    return await CartRepository.checkout();
}