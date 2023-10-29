import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  reservationsId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const { reservationsId } = params;
  if (!reservationsId || typeof reservationsId !== "string") {
    throw new Error("Invalid Id");
  }

  const reservation = await prisma.reservation.deleteMany({ where: { id: reservationsId, OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }] } });
  return NextResponse.json(reservation);
}
