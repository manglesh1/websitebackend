import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { db } from "../db"

export const getUserData = async () => {
    try {
        const { getUser } = getKindeServerSession();
        return await getUser();
    } catch {
        return null
    }
}

export const getData = async () => {
    try {
        const data = await db.data.findMany()
        return data
    } catch {
        return null
    }
}

export const getDataById = async (id:number) => {
    try {
        const data = await db.data.findUnique({
            where: {
                id
            },
        })
        return data
    } catch {
        return null
    }
}

export const getDataWithLocation = async (location?:string) => {
    try {
        if(!location) {
            return await getData()
        } 
        const data = await db.data.findMany({
            where: {
                OR: [
                    { location: { contains: location } }, // Matches if location contains the provided string
                    { location: null } // Matches if location is an empty string
                ]
            }
        }); 
        return data;
    } catch {
        return null
    }
}

export const getDataWithLocationAndPage = async ({page, location}:{page:string, location?:string}) => {
    try {
        const data = await getDataWithLocation(location)
        if(!data) return null
        const filteredData = data.filter(m => {
            if(m.path) {
                console.log(m.path)
                return m.path!.toUpperCase().includes(page.toUpperCase())
            }
        });  
        return filteredData;
    } catch {
        return null
    }
}

// Get all data from Blog model
export const getBlogData = async () => {
    try {
        const data = await db.blog.findMany();
        return data;
    } catch {
        return null;
    }
};

export const getBlogById = async (id:number) => {
    try {
        const data = await db.blog.findUnique({
            where: {
                id
            },
        })
        console.log(data)
        return data
    } catch {
        return null
    }
}

// Get all data from BlogReviews model
export const getBlogReviewsData = async () => {
    try {
        const data = await db.blogReviews.findMany();
        return data;
    } catch {
        return null;
    }
};

export const getBlogReviewById = async (id:number) => {
    try {
        const data = await db.blogReviews.findUnique({
            where: {
                id
            },
        })
        return data
    } catch {
        return null
    }
}

// Get all data from Locations model
export const getLocationsData = async () => {
    try {
        const data = await db.locations.findMany();
        return data;
    } catch {
        return null;
    }
};

export const getLocationById = async (id:number) => {
    try {
        const data = await db.locations.findUnique({
            where: {
                id
            },
        })
        return data
    } catch {
        return null
    }
}

// Get all data from Config model
export const getConfigData = async () => {
    try {
        const data = await db.config.findMany();
        return data;
    } catch {
        return null;
    }
};

export const getConfigById = async (id:number) => {
    try {
        const data = await db.config.findUnique({
            where: {
                id
            },
        })
        return data
    } catch {
        return null
    }
}

// Get all data from Promo model
export const getPromoData = async () => {
    try {
        const data = await db.promo.findMany();
        return data;
    } catch {
        return null;
    }
};
export const getPromoById = async (id:number) => {
    try {
        const data = await db.promo.findUnique({
            where: {
                id
            },
        })
        return data
    } catch {
        return null
    }
}

// Get all data from BirthdayPackages model
export const getBirthdayPackagesData = async () => {
    try {
        const data = await db.birthdayPackages.findMany();
        return data;
    } catch {
        return null;
    }
};

export const getBirthdayPackageById = async (id:number) => {
    try {
        const data = await db.birthdayPackages.findUnique({
            where: {
                id
            },
        })
        return data
    } catch {
        return null
    }
}

// Get all data from FAQ model
export const getFAQData = async () => {
    try {
        const data = await db.fAQ.findMany();
        return data;
    } catch {
        return null;
    }
};

export const getFAQById = async (id:number) => {
    try {
        const data = await db.fAQ.findUnique({
            where: {
                id
            },
        })
        return data
    } catch {
        return null
    }
}


