import Container from "../components/container/Container";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing, SafeUser } from "../types";
import Heading from "../components/Heading";
import { User } from "@prisma/client";

interface FavoriteClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}

const FavoritesClient: React.FC<FavoriteClientProps> = ({
    listings,
    currentUser
}) => {
    return (
        <Container>
            <Heading 
                title="Favorite Pet Sitters"
                subtitle="List of the pet sitters you have favorited!"
            />
            <div className="mt-10 grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {listings.map((listing) => (
                    <ListingCard 
                        currentUser={currentUser}
                        key={listing.id}
                        data={listing}
                    />
                ))}
            </div>

        </Container>
    )
}
 
export default FavoritesClient;