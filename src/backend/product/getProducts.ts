'use server'

import ProductRepository from "./productRepository";

export default async function getProducts(slug: string, page: number, order: string, type: string){
    return await ProductRepository.getProducts(slug, page, order, type);
}