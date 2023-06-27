"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import {useCallback,useState} from "react";
import {FieldValues,SubmitHandler,useForm} from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from '../Heading';
import Input from "../inputs/Input";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setLoading] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true);
        axios.post('/api/regiser', data)
        .then(() => {
            registerModal.onClose();
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setLoading(false);
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to PetStay" subtitle="Create an account" center/>
            <Input 
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )
    return (
        <Modal 
            disabled={isLoading} 
            isOpen={registerModal.isOpen} 
            title="Register" 
            actionLabel="Continue" 
            onClose={registerModal.onClose} 
            onSubmit={handleSubmit(onSubmit)}
            body = {bodyContent}
        />
    )
}

export default RegisterModal;