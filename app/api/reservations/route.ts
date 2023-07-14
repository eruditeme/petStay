import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { 
    listingId,
    startdate,
    endDate,
    totalPrice
   } = body;

   if (!listingId || !startdate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.listing.update({
      where: {
        id: listingId
      },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startdate,
            endDate,
            totalPrice,
            userName: currentUser.name || "",
            address: currentUser.address,
            code: currentUser.code,
            country: currentUser.country,
            province: currentUser.province
          }
        }
      }
    });
  
    return NextResponse.json(listingAndReservation);
}