"use client";
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, SafeUser } from "../types/types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface PropertyClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertyClient: React.FC<PropertyClientProps> = ({ listings, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeleteingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeleteingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeleteingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading
        title="Properties"
        subtitle="List of your properties"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((list) => (
          <ListingCard
            key={list.id}
            data={list}
            actionId={list.id}
            onAction={onCancel}
            disabled={deletingId === list.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertyClient;
