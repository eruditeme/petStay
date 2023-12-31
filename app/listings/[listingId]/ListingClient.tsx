'use client';

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from 'date-fns';
import useCountries from "@/app/hooks/useCountries";

import useLoginModal from "@/app/hooks/useLoginModal";
import Image from "next/image";
import { Reservation, Listing, User } from "@prisma/client";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { SafeReservation, SafeUser } from "@/app/types";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

interface ListingClientProps {
    reservations?: SafeReservation[];
    listing: Listing & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    reservations = [],
    currentUser
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });

            dates = [...dates, ...range];
        });

        return dates;
    }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const compatibleAnimals = listing.category.map(item => item.toLowerCase()).join(", ");
    const {getByValue} = useCountries();
    const loc = getByValue(listing.locationValue);
    const [startTime, setStartTime] = useState("8:00 pm");
    const [endTime, setEndTime] = useState("8:00 am");

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
        setIsLoading(true);

        axios.post('/api/reservations', {
            totalPrice,
            startdate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id,
            startTime,
            endTime
        })
        .then(() => {
            toast.success('Listing reserved!');
            setDateRange(initialDateRange);
        })
        .catch(() => {
            toast.error('Something went wrong.');
        })
        .finally(() => {
            setIsLoading(false);
        })
    },
    [
        totalPrice, 
        dateRange, 
        listing?.id,
        router,
        currentUser,
        loginModal
    ]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
        const dayCount = differenceInDays(
            dateRange.endDate, 
            dateRange.startDate
        );
        
        if (dayCount && listing.price) {
            setTotalPrice(dayCount * listing.price);
        } else {
            setTotalPrice(listing.price);
        }
        }
    }, [dateRange, listing.price]);

    return ( 
        <div>
            <div className="flex lg:ps-20 md:ps-10 ps-5 py-5" style={{ backgroundImage: "url('/images/bkgnd.jpeg')", backgroundSize: 'cover' }}>
                <div className="me-6">
                    <Image 
                        height={200}
                        width={200}
                        alt = "Listing"
                        src= {listing.image !== "" ? listing.image : "/images/default.jpeg"}
                        className="rounded-full"
                    />
                </div>
                <div className="lg:text-3xl md:text-2xl text-xl font-extrabold lg:pt-10 md:pt-8 pt-4">
                    <div>
                        {listing.title}
                    </div>
                    <div className="text-xl font-bold pt-1">
                        {listing.listingOwner}
                    </div>
                    <div className="text-sm font-semibold pt-1">
                        {loc?.region}, {loc?.label}
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className="lg:px-20 md:px-10 px-7 pt-4 flex flex-wrap text-lg text-neutral-500">
                <div className="mb-8">
                    <div className="text-black font-medium pt-12">Description</div>
                    <div className="mb-3">{listing.description}</div>
                    <div className="text-black font-medium">Information</div>
                    <div>{listing.listingOwner} pet sits {compatibleAnimals}</div>
                </div>
                <div className="md:ms-auto">
                    <ListingReservation
                        price={listing.price}
                        totalPrice={totalPrice}
                        onChangeDate={(value) => setDateRange(value)}
                        onStartTime={(value) => setStartTime(value)}
                        onEndTime={(value) => setEndTime(value)}
                        dateRange={dateRange}
                        onSubmit={onCreateReservation}
                        disabled={isLoading}
                        disabledDates={disabledDates}
                        startTime={startTime}
                        endTime={endTime}
                    />
                </div>
            </div>
        </div>
        );
    }
   
    export default ListingClient;