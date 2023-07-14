import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(
    request: Request
) {
    const body = await request.json();
    const {
        email,
        name,
        password,
        address,
        code,
        country,
        province
    } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma?.user.create({
        data: {
            email,
            image: "",
            name,
            address,
            code,
            country,
            province,
            hashedPassword
        }
    })

    return NextResponse.json(user);
}