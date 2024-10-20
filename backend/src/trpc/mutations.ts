import { BirthdayPackagesSchema, BlogReviewsSchema, BlogSchema, ConfigSchema, DataSchema, FAQSchema, LocationsSchema, PromoSchema } from "@/lib/schema";
import { privateProcedure } from "./trpc";
import { z } from "zod";
import { db } from "@/lib/db";

export const mutations = {
    //route to create data
    createData: privateProcedure.input(DataSchema).mutation(async ({ input }) => {
        const data = await db.data.create({
            data:{
                ...input,
            },
        });
        return data;
    }),

    //route to update data
    updateData: privateProcedure.input(DataSchema).mutation(async ({ input }) => {
        const {id ,...rest} = input;
        const data = await db.data.update({
            data: rest,
            where:{
                id
            }
        });
        return data;
    }),
    
    //route to delete data
    deleteData: privateProcedure.input(z.object({id:z.number()})).mutation(async ({input})=> {
        const { id } = input
    
        const data = await db.data.delete({
            where: {
                id
            }
        })
        return data
    }),


    //blog
    createBlog: privateProcedure.input(BlogSchema).mutation(async ({ input }) => {
        const data = await db.blog.create({
            data:{
                ...input,
            },
        });
        return data;
    }),

    updateBlog: privateProcedure.input(BlogSchema).mutation(async ({ input }) => {
        const {id ,...rest} = input;
        const data = await db.blog.update({
            data: rest,
            where:{
                id
            }
        });
        return data;
    }),
    
    deleteBlog: privateProcedure.input(z.object({id:z.number()})).mutation(async ({input})=> {
        const { id } = input
    
        const data = await db.blog.delete({
            where: {
                id
            }
        })
        return data
    }),

    //blog review
    createBlogReview: privateProcedure.input(BlogReviewsSchema).mutation(async ({ input }) => {
        const data = await db.blogReviews.create({
            data: {
                ...input
            }
        });
        return data;
    }),

    updateBlogReview: privateProcedure.input(BlogReviewsSchema).mutation(async ({ input }) => {
        const {id ,...rest} = input;
        const data = await db.blogReviews.update({
            data: rest,
            where:{
                id
            }
        });
        return data;
    }),
    
    deleteBlogReview: privateProcedure.input(z.object({id:z.number()})).mutation(async ({input})=> {
        const { id } = input
    
        const data = await db.blogReviews.delete({
            where: {
                id
            }
        })
        return data
    }),

    //Locations
    createLocations: privateProcedure.input(LocationsSchema).mutation(async ({ input }) => {
        const data = await db.locations.create({
            data:{
                ...input,
            },
        });
        return data;
    }),

    updateLocations: privateProcedure.input(LocationsSchema).mutation(async ({ input }) => {
        const {id ,...rest} = input;
        const data = await db.locations.update({
            data: rest,
            where:{
                id
            }
        });
        return data;
    }),
    
    deleteLocations: privateProcedure.input(z.object({id:z.number()})).mutation(async ({input})=> {
        const { id } = input
    
        const data = await db.locations.delete({
            where: {
                id
            }
        })
        return data
    }),

    //config
    createConfig: privateProcedure.input(ConfigSchema).mutation(async ({ input }) => {
        const data = await db.config.create({
            data:{
                ...input,
            },
        });
        return data;
    }),

    updateConfig: privateProcedure.input(ConfigSchema).mutation(async ({ input }) => {
        const {id ,...rest} = input;
        const data = await db.config.update({
            data: rest,
            where:{
                id
            }
        });
        return data;
    }),
    
    deleteConfig: privateProcedure.input(z.object({id:z.number()})).mutation(async ({input})=> {
        const { id } = input
    
        const data = await db.config.delete({
            where: {
                id
            }
        })
        return data
    }),

    //Promo
    createPromo: privateProcedure.input(PromoSchema).mutation(async ({ input }) => {
        const {startdate,enddate,...rest} = input;
        const modifiedInput = {...rest, startdate:new Date(startdate??''), enddate:new Date(enddate??'')}
        const data = await db.promo.create({
            data:{
                ...modifiedInput
            },
        });
        return data;
    }),

    updatePromo: privateProcedure.input(PromoSchema).mutation(async ({ input }) => {
        const {id,startdate,enddate,...rest} = input;
        const modifiedInput = {...rest, startdate:new Date(startdate??''), enddate:new Date(enddate??'')}
        const data = await db.promo.update({
            data: {...modifiedInput},
            where:{
                id
            }
        });
        return data;
    }),
    
    deletePromo: privateProcedure.input(z.object({id:z.number()})).mutation(async ({input})=> {
        const { id } = input
    
        const data = await db.promo.delete({
            where: {
                id
            }
        })
        return data
    }),

    //BirthdayPackages
    createBirthdayPackages: privateProcedure.input(BirthdayPackagesSchema).mutation(async ({ input }) => {
        const data = await db.birthdayPackages.create({
            data:{
                ...input,
            },
        });
        return data;
    }),

    updateBirthdayPackages: privateProcedure.input(BirthdayPackagesSchema).mutation(async ({ input }) => {
        const {id ,...rest} = input;
        const data = await db.birthdayPackages.update({
            data: rest,
            where:{
                id
            }
        });
        return data;
    }),
    
    deleteBirthdayPackages: privateProcedure.input(z.object({id:z.number()})).mutation(async ({input})=> {
        const { id } = input
    
        const data = await db.birthdayPackages.delete({
            where: {
                id
            }
        })
        return data
    }),

    //FAQ
    createFAQ: privateProcedure.input(FAQSchema).mutation(async ({ input }) => {
        const data = await db.fAQ.create({
            data:{
                ...input,
            },
        });
        return data;
    }),

    updateFAQ: privateProcedure.input(FAQSchema).mutation(async ({ input }) => {
        const {id ,...rest} = input;
        const data = await db.fAQ.update({
            data: rest,
            where:{
                id
            }
        });
        return data;
    }),
    
    deleteFAQ: privateProcedure.input(z.object({id:z.number()})).mutation(async ({input})=> {
        const { id } = input
    
        const data = await db.fAQ.delete({
            where: {
                id
            }
        })
        return data
    }),
}