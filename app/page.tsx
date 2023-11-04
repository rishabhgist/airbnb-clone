export const dynamic = "force-dynamic";
import getCurrentUser from "./actions/getCurrentUser";
import getLisitings, { IListingParams } from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
  searchParams: IListingParams;
}

const Home: React.FC<HomeProps> = async ({ searchParams }) => {
  const listings = await getLisitings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showRest />;
  }

  return (
    <Container>
      <div className="pt-24 grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            data={listing}
            key={listing.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default Home;
