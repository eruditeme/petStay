import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getUserListings() {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser){
            return [];
        }

        const userListing = await prisma.listing.findFirst({
            where: {
                userId: currentUser.id
            }
        })

        if (!userListing) {
            return null;
        }

        return {
            userListing
        }

        return userListing;
    } catch (error: any) {
        throw new Error(error);
    }
}