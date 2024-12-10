import prisma from "../db";

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

    static async getProducts(slug: string, page: number){

        const products = await prisma.product.findMany({
            where: {
                category: {
                    contains: slug,
                },
            },
            skip: (page-1) * 6,
            take: 6,
        });

        const total = await prisma.product.count({
            where: {
                category: {
                    contains: slug,
                },
            },
        });

        return{
            products,
            total,
        }

    }

}