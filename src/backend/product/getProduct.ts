'use server'

import ProductRepository from "./productRepository"

export default async function getProduct(slug: string){
    return await ProductRepository.getProduct(slug);
}