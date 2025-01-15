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
            where: {stock:{gt: 0}},
            orderBy:{quantity_sold: "desc"},
            take: 8,
        });
    }

    static async getNewProduct(){
        return await prisma.product.findMany({
            where: {stock:{gt: 0}},
            orderBy:{createdAt: "desc"},
            take: 8,
        });
    }

    static async getProduct(slug: string){

        return await prisma.product.findUnique({
            where: { slug },
        });

    }

    static async getProducts(slug: string, page: number, order: string, type: string){

        const orderBy:any = getOrderBy(order);
        
        if (orderBy === null || page <= 0) return null;
    
        const whereCondition = {
            AND: [
                { category: { contains: slug } },
                type ? { type_slug: type } : {},
            ],
        };
    
        const products = await prisma.product.findMany({
            where: whereCondition,
            skip: (page - 1) * 6,
            take: 6,
            orderBy: orderBy,
        });
    
        if (!products) return null;
    
        const total = await prisma.product.count({
            where: whereCondition,
        });
    
        const totalPages = Math.ceil(total / 6);
        
        if (page > totalPages) return null;
    
        const types = await prisma.product.findMany({
            where: { category: { contains: slug } },
            select: { type: true, type_slug: true },
            distinct: ['type', 'type_slug'],
        });
    
        return {
            products,
            total,
            totalPages,
            types,
        };
        
    }

    static async getSearch(search: string, page: number, order: string, type: string) {

        const orderBy:any = getOrderBy(order);

        if (!orderBy || page <= 0) return null;
    
        const whereCondition = {
            AND: [
                { name: { contains: search } },
                type ? { type_slug: type } : {},
            ],
        };
    
        const products = await prisma.product.findMany({
            where: whereCondition,
            skip: (page - 1) * 6,
            take: 6,
            orderBy: orderBy,
        });
    
        if (!products) return null;
    
        const total = await prisma.product.count({
            where: whereCondition,
        });
    
        const totalPages = Math.ceil(total / 6);
        if (page > totalPages) return null;
    
        const types = await prisma.product.findMany({
            where: { name: { contains: search } },
            select: { type: true, type_slug: true },
            distinct: ['type', 'type_slug'],
        });
    
        return {
            products,
            total,
            totalPages,
            types,
        };

    }

}