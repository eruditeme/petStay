import { User } from '@prisma/client';
import Container from '../container/Container';
import Logo from '../navbar/Logo'
import UserMenu from '../navbar/UserMenu';
import Categories from './Categories';
import { SafeUser } from '@/app/types';
import { Listing } from '@prisma/client';

interface NavbarProps {
    currentUser?: SafeUser | null;
    listing?: any | null;
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser,
    listing
}) => {
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                        <Logo />
                        <UserMenu currentUser={currentUser} listing={listing}/>
                    </div>
                </Container>
            </div>
            <Categories />
        </div>
    )
}

export default Navbar;