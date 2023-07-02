"use client"
import { useMemo, useState, useEffect } from "react";
import Modal from "./Modal"
import useRentModal from "@/app/hooks/useRentModal"
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Input from '../inputs/Input';
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    DESCRIPTION = 2,
    PRICE = 3
}

const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, setValue, watch, formState:{errors},reset} = useForm<FieldValues>({
        defaultValues: {
            category: "",
            location: null,
            imageSrc: "",
            price: 1,
            title: "",
            description: ""
        }
    })
    const category = watch("category");
    const location = watch("location");

    const Map = useMemo(() => dynamic(() => import("../Map"), {
        ssr: false
    }), [location]);

    const setCustomValue = (id: string, value:any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }

        setIsLoading(true);
        axios.post("/api/listings", data)
        .then(() => {
            toast.success("Listing Created");
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
        })
        .catch(() => {
            toast.error("Something went wrong")
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return "Create";
        }
        return "Next";
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return "Back";
    }, [step])

    let bodyContent = (
        <div className="flex flex-col gap-9">
            <Heading 
                title="Which of these animals are you planning on pet sitting?"
                subtitle="Pick a category"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput 
                            onClick={(category) => setCustomValue("category", category)}
                            selected = {category === item.label}
                            label = {item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
    
    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="What are you located?"
                    subtitle="Let pet owners know how close you are to them"
                />
                <CountrySelect 
                    onChange={(value) => setCustomValue("location", value)}
                    value = {location}
                />
                <Map center={location?.latlng}/>
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                title="Describe yourself"
                subtitle="Try to keep it short and sweet!"
                />
                <div>Title</div>
                <Input 
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    placeholder="Enter Title Here"
                />
                <div>Description</div>
                <Input 
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    placeholder="Enter Description Here"
                    required
                />
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                title="Price"
                subtitle="How much do you charge for pet sitting each night?"
                />
                <Input 
                    id ="price"
                    label="price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    return (
        <Modal 
            isOpen={rentModal.isOpen}
            body={bodyContent}
            title="Become a pet sitter today"
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        />
    )
}

export default RentModal;