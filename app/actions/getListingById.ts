import prisma from "../libs/prismadb";
interface IParams {
  listingId: string;
}

export default async function getLisitingById(params: IParams) {
  try {
    const { listingId } = params;
    const lisiting = await prisma.listing.findUnique({ where: { id: listingId }, include: { user: true } });
    if (!lisiting) {
      return null;
    }
    return { ...lisiting, createdAt: lisiting.createdAt.toISOString(), user: { ...lisiting.user, createdAt: lisiting.user.createdAt.toISOString(), updatedAt: lisiting.user.updatedAt.toISOString(), emailVerified: lisiting.user.emailVerified?.toISOString() || null } };
  } catch (error: any) {
    throw new Error(error);
  }
}
