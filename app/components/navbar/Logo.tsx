"use client";

import Image from "next/image";
import {useRouter} from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center cursor-pointer">
            <Image onClick={() => router.push("/")} alt="Logo" height="50" width="50" src="/images/hamster.png"></Image>
            <div>Paws Pet Sitting</div>
        </div>
    )
}

export default Logo;