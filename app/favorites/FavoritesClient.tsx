import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing, SafeUser } from "../types/types";

interface FavoritesClientProps {
  listing: SafeListing[];
  currentUser?: SafeUser | null;
}
const FavoritesClient: React.FC<FavoritesClientProps> = ({ listing, currentUser }) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you have favorites"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listing.map((list) => (
          <ListingCard
            key={list.id}
            data={list}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
