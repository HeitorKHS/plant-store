'use server'

import ProductRepository from "./ProductRepository";

export default async function getProducts(slug: string, page: number){
    return await ProductRepository.getProducts(slug, page);
}