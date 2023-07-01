"use client"
import { useMemo, useState, useEffect } from "react";
import Modal from "./Modal"
import useRentModal from "@/app/hooks/useRentModal"
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import Map from "../Map";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
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

    const setCustomValue = (id: string, value:any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onBack = () => {
        setStep((value) => value - 1);
        console.log(step);
    }

    const onNext = () => {
        setStep((value) => value + 1);
        console.log(step);
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
                <Map />
            </div>
        )
    }


    return (
        <Modal 
            isOpen={rentModal.isOpen}
            body={bodyContent}
            title="Become a pet sitter today"
            onClose={rentModal.onClose}
            onSubmit={onNext}
            actionLabel={actionLabel}
            secondaryLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        />
    )
}

export default RentModal;