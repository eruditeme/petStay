"use client";

import Image from "next/image";
import {useRouter} from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        <div className="md:block cursor-pointer">
            <Image alt="Logo" height="50" width="50" src="/images/hamster.png"></Image>
            <div>PetStay</div>
        </div>
    )
}

export default Logo;