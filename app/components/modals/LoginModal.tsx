"use client";

import axios from "axios";
import {useCallback,useState} from "react";
import {FieldValues,SubmitHandler,useForm} from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from '../Heading';
import Input from "../inputs/Input";
import { toast } from 'react-hot-toast';
import {signIn } from "next-auth/react"
import Button from "../Button";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useRouter } from "next/navigation";

const LoginModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true);
        signIn("credentials", {
            ...data,
            redirect: false
        })
        .then((callback) => {
            setLoading(false);
            if (callback?.ok) {
                toast.success("Logged in");
                router.refresh();
                loginModal.onClose();
                if(callback?.error) {
                    toast.error(callback.error);
                }
            }
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to PetStay" subtitle="Sign In" center/>
            <label>Email</label>
            <Input 
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type = "email"
                placeholder="Enter email here" 
            />
            <label>Password</label>
            <Input 
                id="password"
                label="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="password"
                placeholder="Enter password here" 
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr></hr>
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>
                        Don&apos;t have an account?
                    </div>
                    <div onClick={loginModal.onClose} className="text-neutral-800 cursor-pointer hover:underline">
                        Sign up here
                    </div>
                </div>

            </div>
        </div>
    )
    return (
        <Modal 
            disabled={isLoading} 
            isOpen={loginModal.isOpen} 
            title="Login" 
            actionLabel="Continue" 
            onClose={loginModal.onClose} 
            onSubmit={handleSubmit(onSubmit)}
            body = {bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal;