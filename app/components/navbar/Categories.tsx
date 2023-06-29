"use client";
import Container from "../container/Container";
import { FaDog, FaCat, FaKiwiBird, FaFish } from 'react-icons/fa';
import { GiRabbit, GiSandSnake} from 'react-icons/gi';
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        label: "Dogs",
        icon: FaDog,
        description: "Dogs often need regular exercise, feeding, and attention throughout the day. If you're away for an extended period, a pet sitter can ensure that your dog gets the necessary care, including walks, playtime, and companionship."
    },
    {
        label: "Cats",
        icon: FaCat,
        description: "Cats are generally more independent than dogs, but they still require daily care, such as feeding, litter box cleaning, and playtime. A pet sitter can provide these essential tasks and also offer companionship and monitoring while you're away."
    },
    {
        label: "Birds",
        icon: FaKiwiBird,
        description: "Birds, such as parrots or canaries, need proper feeding, cage cleaning, and social interaction. A pet sitter can follow their feeding routine, ensure a clean environment, and spend time talking or playing with them."
    },
    {
        label: "Small mammals",
        icon: GiRabbit,
        description: "Small mammals like rabbits, guinea pigs, hamsters, or ferrets need daily feeding, cleaning of their enclosures, and social interaction. A pet sitter can handle these tasks, provide fresh food and water, and offer playtime and exercise."
    },
    {
        label: "Reptiles",
        icon: GiSandSnake,
        description: "Reptiles, including snakes, lizards, and turtles, require specific care instructions. They need proper heating, lighting, feeding, and sometimes tank cleaning. A knowledgeable pet sitter can follow their care routine and monitor their well-being."
    },
    {
        label: "Fish",
        icon: FaFish,
        description: "Fish may not need as much interaction as other pets, but they still require regular feeding and maintenance of their aquarium. A pet sitter can feed them the correct amount, check water quality, and ensure the tank's overall condition."
    },
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get("category");
    const pathname = usePathname();
    const isMainPage = pathname === "/";

    if (!isMainPage) {
        return null;
    }

    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item)=> (
                    <CategoryBox 
                        key={item.label}
                        label={item.label}
                        selected={category === item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    )
}

export default Categories;