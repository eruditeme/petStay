"use client";

import useCountries from "@/app/hooks/useCountries";
import { Listing, Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import {format} from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

interface ListingCardProps {
    data: SafeListing;
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser
}) => {
    const router = useRouter();
    const {getByValue} = useCountries();
    const location = getByValue(data.locationValue);
    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled) {
                return;
            }
    
            onAction?.(actionId);
        }, [onAction, actionId, disabled]
    )

    //Animals they selected they are comfortable with pet sitting
    const compatibleAnimals = data.category.map(item => item.toLowerCase()).join(", ");

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }
        return data.price;
    }, [reservation, data.price])

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }
        const start = new Date(reservation.startdate);
        const end = new Date(reservation.endDate);

        return `${format(start, "PP")} - ${format(end, "PP")}`
    }, [reservation])

    return (
        <div className="col-span-1 group">
            <div className="flex flex-col gap-2 w-full">
                <div className="w-full relative overflow-hidden border-2 rounded-xl">
                    <div className=" flex justify-center items-center py-4" style={{ backgroundImage: "url('/images/card_background.png')", backgroundSize: 'cover' }}>
                        <Image 
                            height={100}
                            width={100}
                            alt = "Listing"
                            src= {data.image !== "" ? data.image : "/images/default.jpeg"}
                            className="rounded-full"
                        />
                    </div>
                    <hr></hr>
                    <div className="p-4 cursor-pointer" onClick={() => router.push(`/listings/${data.id}`)} >
                        <div className="xs:text-xl sm:text-xl md:text-lg lg:text-md">
                            {data.title}
                        </div>
                        <div className="xs:text-lg sm:text-md md:text-md lg:text-sm">
                            <div className="text-slate-500">
                                {data.listingOwner}
                            </div>
                            <div className="text-slate-500 my-4">
                                Works with {compatibleAnimals}
                            </div>
                            <div className="text-slate-500">
                                $ {data.price} per night
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="xs:text-lg sm:text-md md:text-md lg:text-sm px-4 py-2">
                        {location?.region}, {location?.label}
                    </div>
                    <div className="absolute top-3 right-3">
                        <HeartButton 
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ListingCard;