"use client";
 import {toast} from "react-hot-toast";
 import axios from "axios";
 import { useCallback, useState } from "react";
 import Heading from "../components/Heading";
 import Container from "../components/container/Container";
import { User } from "@prisma/client";

 interface ProfileClientProps {
    user: User;
 }

const ProfileClient: React.FC<ProfileClientProps> = ({
    user
}) => {
    return ( 
        <Container>
            <Heading 
                title="Profile"
                subtitle="Update your profile here"
            />
            <div className="">
                
            </div>
        </Container>
    );
}
 
export default ProfileClient;