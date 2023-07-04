"use client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";
import { User } from '@prisma/client';

interface HeartButtonProps {
    listingId: string;
    currentUser?: User | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
    listingId,
    currentUser
}) => {
    const [hasFavorited, setHasFavorited] = useState(false);
    const toggleFavorite = () => {
        setHasFavorited(!hasFavorited);
    };

    return (
        (currentUser && <div onClick={toggleFavorite} className="relative hover:opacity-80 transition cursor-pointer">
            <AiOutlineHeart 
                size={28}
                className="fill-white absolute -top-[1px] -right-[2px]"
            />
            <AiFillHeart 
                onClick={toggleFavorite}
                size={28}
                className={`absolute -top-[1px] -right-[2px] ${hasFavorited ? "fill-rose-700" : "fill-neutral-500/70"}`}
            />
        </div>)
    )
}

export default HeartButton;