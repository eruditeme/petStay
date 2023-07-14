"use client";
 import {toast} from "react-hot-toast";
 import axios from "axios";
 import { useCallback, useState } from "react";
 import { SafeReservation, SafeUser } from "../types";
 import Heading from "../components/Heading";
 import Container from "../components/container/Container";
import { useRouter } from "next/navigation";
import ReservationCard from "../components/listings/ReservationCard";

 interface ReservationsClientProps {
    reservations: SafeReservation[];
 }

const ReservationClient: React.FC<ReservationsClientProps> = ({
    reservations
}) => {
    const router = useRouter();
    return ( 
        <Container>
            <Heading 
                title="Reservations"
                subtitle="Bookings for your pet sitting services"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations.map((reservation) => (
                    <ReservationCard 
                        key = {reservation.id}
                        reservation={reservation}
                        data= {reservation.listing}
                    />
                ))}
            </div>
        </Container>
    );
}
 
export default ReservationClient;