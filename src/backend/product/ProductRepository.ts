import prisma from "../db";

function getOrderBy(sortOrder: string){

    switch (sortOrder) {
        case "": return {}
        case "featured": return {}; 
        case "newest": return { createdAt: 'desc' }; 
        case "lowprice": return { price: 'asc' };
        case "highprice": return{ price: 'desc' };
        case "bestsellers": return { quantity_sold: 'desc' }; 
        default: return null; 
    }

};

export default class ProductRepository{

    static async getTopSelling(){
        return await prisma.product.findMany({
            orderBy:{quantity_sold: "desc"},
            take: 8,
        });
    }

    static async getNewProduct(){
        return await prisma.product.findMany({
            orderBy:{createdAt: "desc"},
            take: 8,
        });
    }

    static async getProduct(slug: string){
        slug = slug.toLowerCase();
        return await prisma.product.findUnique({
            where: { slug },
        });
    }

    static async getProducts(slug: string, page: number, order: string, type: string){

        const orderBy:any = getOrderBy(order);

        if(orderBy === null || page <= 0) return null

        const products = await prisma.product.findMany({
            where: {
                AND:[
                    {category: {
                        contains: slug,
                    }},
                    type ? { type_slug: type } : {},
                ],
            },
            skip: (page-1) * 6,
            take: 6,
            orderBy: orderBy,
        });

        const total = await prisma.product.count({
            where: {
                AND:[
                    {category: {
                        contains: slug,
                    }},
                    type ? { type_slug: type } : {},
                ],
            },
        });

        const totalPages = Math.ceil(total / 6);

        if(page > totalPages)  return null

        const types = await prisma.product.findMany({
            where: {
                category: {
                    contains: slug,
                },
            },
            select:{
                type: true,
                type_slug: true,
            },
            distinct: ['type', 'type_slug'],
        });

        return{
            products,
            total,
            totalPages,
            types,
        }

    }

}