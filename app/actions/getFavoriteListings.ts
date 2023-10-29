import prisma from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }
    const favorite = await prisma.listing.findMany({ where: { id: { in: [...(currentUser.favoriteIds || [])] } } });
    const safeFavorite = favorite.map((fav) => ({ ...fav, createdAt: fav.createdAt.toISOString() }));
    return safeFavorite;
  } catch (error: any) {
    throw new Error(error);
  }
}
