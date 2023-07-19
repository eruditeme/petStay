"use client";

import useCountries from "@/app/hooks/useCountries";
import { Listing, Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import {format} from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

interface ReservationCardProps {
    data: SafeListing;
    reservation: SafeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
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
                    <div className=" flex justify-center items-center py-4" style={{ backgroundImage: "url('/images/card_background.png')", backgroundSize: 'cover' }}></div>
                    <hr></hr>
                    <div className="p-4">
                        <div className="xs:text-xl sm:text-xl md:text-lg lg:text-md">
                            Reservation
                        </div>
                        <div className="xs:text-lg sm:text-md md:text-md lg:text-sm">
                            <div className="text-slate-500">
                                Pet sitter: {data.listingOwner}
                            </div>
                            <div className="text-slate-500">
                                Client: {reservation?.userName}
                            </div>
                            <div className="text-slate-500">
                                Date: {reservationDate}
                            </div>
                            <div className="text-slate-500">
                                Start Time: {reservation.startTime}
                            </div>
                            <div className="text-slate-500">
                                End Time: {reservation.endTime}
                            </div>
                            <div className="text-slate-500">
                                Earnings: $ {price}
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="xs:text-lg sm:text-md md:text-md lg:text-sm px-4 py-2">
                        Client Address: {reservation.address}, {reservation.province}, {reservation.country} {reservation.code}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ReservationCard;