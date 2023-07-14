"use client";

import axios from "axios";
import {FcGoogle} from "react-icons/fc";
import {useCallback,useState} from "react";
import {FieldValues,SubmitHandler,useForm} from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from '../Heading';
import Input from "../inputs/Input";
import { toast} from 'react-hot-toast';
import Button from "../Button";
import { useMemo } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";

enum STEPS {
    BASIC = 0,
    LOCATION = 1,

}

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [step, setStep] = useState(STEPS.BASIC);
    const [isLoading, setLoading] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            address: "",
            code: "",
            country: "",
            province: ""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.LOCATION) {
            return onNext();
        }
        setLoading(true);
        axios.post('/api/register', data)
        .then(() => {
            registerModal.onClose();
        })
        .catch((error) => {
            toast.error("Something went wrong");
        })
        .finally(() => {
            setLoading(false);
        })
    }

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal])

    const actionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return "Create";
        }
        return "Next";
    }, [step])

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.BASIC) {
            return undefined;
        }
        return "Back";
    }, [step])

    let bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Paws Pet Sitting" subtitle="Create an account" center/>
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
            <label>Full Name</label>
            <Input 
                id="name"
                label="name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                placeholder="Enter your full name here" 
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

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-4">
                <Heading title="Welcome to Paws Pet Sitting" subtitle="Create an account" center/>
                <label>Home Address</label>
                <Input 
                    id="address"
                    label="address"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    placeholder="Enter home address here" 
                />
                <label>Province</label>
                <Input 
                    id="province"
                    label="province"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    placeholder="Province" 
                />
                <label>Country</label>
                <Input 
                    id="country"
                    label="country"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    placeholder="Country" 
                />
                <label>Postal Code</label>
                <Input 
                    id="code"
                    label="code"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    placeholder="Postal Code" 
                />
            </div>
        )
    }

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr></hr>
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>
                        Already have an account?
                    </div>
                    <div onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline">
                        Login
                    </div>
                </div>

            </div>
        </div>
    )
    return (
        <Modal 
            disabled={isLoading} 
            isOpen={registerModal.isOpen} 
            title="Register" 
            actionLabel={actionLabel} 
            onClose={registerModal.onClose} 
            onSubmit={handleSubmit(onSubmit)}
            body = {bodyContent}
            footer={footerContent}
            secondaryLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.BASIC ? undefined : onBack}
        />
    )
}

export default RegisterModal;