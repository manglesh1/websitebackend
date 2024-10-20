import * as z from "zod"

export const DataSchema = z.object({
    id: z.number().optional(),
    location: z.string().nullable().optional(),
    pageid: z.string().nullable().optional(),
    isactive: z.number().nullable().optional(), // Assuming `Float` is mapped to number
    desc: z.string().nullable().optional(),
    parentid: z.string().nullable().optional(),
    path: z.string().nullable().optional(),
    pagetype: z.string().nullable().optional(),
    title: z.string().nullable().optional(),
    metatitle: z.string().nullable().optional(),
    metadescription: z.string().nullable().optional(),
    seosection: z.string().nullable().optional(),
    icon: z.string().nullable().optional(),
    booknowurl: z.string().nullable().optional(),
    video: z.string().nullable().optional(),
    smallimage: z.string().nullable().optional(),
    smalltext: z.string().nullable().optional(),
    headerimage: z.string().nullable().optional(),
    imageTitle: z.string().nullable().optional(),
    section1: z.string().nullable().optional(),
    sectionImage: z.string().nullable().optional(),
    section2: z.string().nullable().optional(),
    section2Image: z.string().nullable().optional(),
    Seoheader: z.string().nullable().optional(),
    ruleyes: z.string().nullable().optional(),
    ruleno: z.string().nullable().optional(),
    warnings: z.string().nullable().optional(),
    booknowlink: z.string().nullable().optional(),
});

export const BlogSchema = z.object({
    id: z.number().optional(),
    location: z.string().nullable().optional(),
    title: z.string().nullable().optional(),
    category: z.string().nullable().optional(),
    tags: z.string().nullable().optional(),
    shortdesc: z.string().nullable().optional(),
    format: z.string().nullable().optional(),
    image: z.string().nullable().optional(),
    video: z.string().nullable().optional(),
    postdate: z.string().nullable().optional(), // Assuming `postdate` is a string
    views: z.number().nullable().optional(), // Float mapped to number
    author: z.string().nullable().optional(),
    htmldesc: z.string().nullable().optional(),
});

export const BlogReviewsSchema = z.object({
    id: z.number().optional(),
    comment: z.string(),
    user: z.string().nullable().optional(),
});

export const LocationsSchema = z.object({
    id: z.number().optional(),
    locations: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    map: z.string().nullable().optional(),
    locationid: z.string().nullable().optional(),
    hours: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
    desc: z.string().nullable().optional(),
    smallimage: z.string().nullable().optional(),
    tag: z.string().nullable().optional(),
    rollerurl: z.string().nullable().optional(),
    facebook: z.string().nullable().optional(),
    insta: z.string().nullable().optional(),
    twitter: z.string().nullable().optional(),
    tiktok: z.string().nullable().optional(),
});

export const ConfigSchema = z.object({
    id: z.number().optional(),
    location: z.string().nullable().optional(),
    key: z.string().nullable().optional(),
    value: z.string().nullable().optional(),
});

export const PromoSchema = z.object({
    id: z.number().optional(),
    location: z.string().nullable().optional(),
    promo: z.string().nullable().optional(),
    img: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    startdate: z.string().optional(),
    enddate: z.string().optional(),
});

export const BirthdayPackagesSchema = z.object({
    id: z.number().optional(),
    location: z.string().nullable().optional(),
    plantitle: z.string().nullable().optional(),
    category: z.string().nullable().optional(),
    price: z.number().nullable().optional(), // Assuming price is a float
    period: z.string().nullable().optional(),
    includes: z.string().nullable().optional(),
});

export const FAQSchema = z.object({
    id: z.number().optional(),
    location: z.string().nullable().optional(),
    question: z.string().nullable().optional(),
    answer: z.string().nullable().optional(),
});

  
  