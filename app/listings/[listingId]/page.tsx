import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import Image from "next/image";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({params}: {params: IParams}) => {
    const listing = await getListingById(params);

    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }

    const compatibleAnimals = listing.category.map(item => item.toLowerCase()).join(", ");
    return ( 
        <ClientOnly>
            <div className="lg:px-20 md:px-10 px-5 grid grid-rows-1 grid-flow-col gap-4 py-4" style={{ backgroundImage: "url('/images/bkgnd.jpeg')", backgroundSize: 'cover' }}>
                <div className="row-span-3">
                    <Image 
                        height={200}
                        width={200}
                        alt = "Listing"
                        src= {listing.image !== "" ? listing.image : "/images/default.jpeg"}
                        className="rounded-full"
                    />
                </div>
                <div className="col-span-8 text-3xl font-extrabold pt-10">
                    <div>
                        {listing.title}
                    </div>
                    <div className="text-xl font-bold pt-1">
                        {listing.listingOwner}
                    </div>
                    <div className="text-lg font-semibold pt-1">
                        Location: {listing.locationValue}
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className="lg:px-20 md:px-10 px-5 pt-4 text-lg flex flex-row gap-4 text-neutral-500">
                <div className="flex-col">
                    <div className="text-black font-medium">
                        Description
                    </div>
                    <div className="mb-3">
                        {listing.description}
                    </div>
                    <div className="text-black font-medium">
                        Information
                    </div>
                    <div>
                        {listing.listingOwner} pet sits {compatibleAnimals}
                    </div>
                </div>
                <div className="flex-col">
                    <div className="text-black font-medium">
                        Description
                    </div>
                    <div className="mb-3">
                        {listing.description}
                    </div>
                    <div className="text-black font-medium">
                        Information
                    </div>
                    <div>
                        {listing.listingOwner} pet sits {compatibleAnimals}
                    </div>
                </div>
            </div>
        </ClientOnly> 
    );
}
 
export default ListingPage;