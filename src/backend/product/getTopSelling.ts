'use server'

import ProductRepository from "./productRepository";

export default async function getTopSelling(){
    return await ProductRepository.getTopSelling();
}