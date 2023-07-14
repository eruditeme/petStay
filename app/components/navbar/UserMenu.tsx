"use client";

import {AiOutlineMenu} from 'react-icons/ai';
import Avatar from '../Avatar';
import { useState, useCallback } from 'react';
import MenuItem from '../navbar/MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
    currentUser?: User | null;
}

const UserMenu:React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const [isOpen, setIsOpen] = useState(false);

    function toggleOpen() {
        setIsOpen(!isOpen);
    };

    const onBook = useCallback(() => {
        if (!currentUser) {
            loginModal.onOpen();
        }
        else {
            //Open Booking Modal
            rentModal.onOpen();
        }

    }, [currentUser, loginModal, rentModal])

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={onBook} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full transition cursor-pointer">
                    Become a pet sitter
                </div>
                <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu />
                    <div className='hidden md:block'>
                        <Avatar />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 overflow-hidden right-0 top-12 text-sm bg-white'>
                    <div className='flex flex-col cursor-pointer'>
                        {currentUser ? (
                            <>
                                <MenuItem onClick={()=> router.push("/profile")} label="Profile"/>
                                <MenuItem onClick={()=> router.push("/reservations")} label="Reservations"/>
                                <MenuItem onClick={()=>{}} label="My Favorite Pet Sitters"/>
                                <hr />
                                <MenuItem onClick={()=>signOut()} label="Logout"/>
                            </>
                        ) : (
                            <>
                                <MenuItem onClick={loginModal.onOpen} label="Login"/>
                                <MenuItem onClick={registerModal.onOpen} label="Sign up"/>
                            </>
                        )}
                    </div>
                </div>
            )}

        </div>
    )
}

export default UserMenu;