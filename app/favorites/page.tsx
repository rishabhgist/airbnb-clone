import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
  const currentUser = await getCurrentUser();
  const listing = await getFavoriteListings();

  if (listing.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listing"
      />
    );
  }
  return (
    <FavoritesClient
      listing={listing}
      currentUser={currentUser}
    />
  );
};
export default ListingPage;
