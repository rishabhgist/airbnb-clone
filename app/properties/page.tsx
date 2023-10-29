import React from "react";
import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getLisitings from "../actions/getListings";
import PropertyClient from "./PropertyClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorize"
        subtitle="Please login"
      />
    );
  }
  const listings = await getLisitings({
    userId: currentUser.id,
  });
  if (listings.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you haven't added any properties"
      />
    );
  }

  return (
    <PropertyClient
      listings={listings}
      currentUser={currentUser}
    />
  );
};

export default PropertiesPage;
