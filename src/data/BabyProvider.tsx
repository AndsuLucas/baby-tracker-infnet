import React, { createContext, useState, useContext, ReactNode } from "react";
import { BabyRegister as BabyRegisterInterface } from "../interfaces/BabyRegister";
import BabyDto from "./dto/BabyDto";

interface BabyContextType {
    babyDto: BabyDto | null;
    addRegister: (register: BabyRegisterInterface) => void;
    removeRegisterById: (id: number) => void;
    getCurrentId: () => number;
    updateBabyData: (name: string, birthDay: Date, weight: number, height: number) => void;
    getRegisterById: (id: number) => BabyRegisterInterface | undefined;
    updateRegister: (register: BabyRegisterInterface) => void;
}

interface BabyProps {
    children: ReactNode;
}

const BabyContext = createContext<BabyContextType | undefined>(undefined);

export const BabyProvider: React.FC<BabyProps> = ({ children }) => {
    const [babyDto, setBabyDto] = useState<BabyDto | null>(
        BabyDto.loadFromLocalStorage()
    );

    const addRegister = (register: BabyRegisterInterface) => {
        if (babyDto) {
            babyDto.addRegister(register);
            const updatedBabyDto = new BabyDto(
                babyDto.name,
                babyDto.birthDay,
                babyDto.weight,
                babyDto.height,
                babyDto.getRegisters()
            );
            setBabyDto(updatedBabyDto);
            updatedBabyDto.saveInLocalStorage();
        }
    };

    const getRegisterById = (id: number) => {
        if (babyDto) {
            return babyDto.getRegisterById(id);
        }
    }

    const removeRegisterById = (id: number) => {
        if (babyDto) {
            babyDto.removeRegisterById(id);
            const updatedBabyDto = new BabyDto(
                babyDto.name,
                babyDto.birthDay,
                babyDto.weight,
                babyDto.height,
                babyDto.getRegisters()
            );
            setBabyDto(updatedBabyDto);
            updatedBabyDto.saveInLocalStorage();
        }
    };

    const updateRegister = (register: BabyRegisterInterface) => {
        if (babyDto) {
            babyDto.editRegister(register);
            const updatedBabyDto = new BabyDto(
                babyDto.name,
                babyDto.birthDay,
                babyDto.weight,
                babyDto.height,
                babyDto.getRegisters()
            );
            setBabyDto(updatedBabyDto);
            updatedBabyDto.saveInLocalStorage
        }
    }

    const getCurrentId = () => (babyDto ? babyDto.getRegisters().length + 1 : 1);

    const updateBabyData = (
        name: string,
        birthDay: Date,
        weight: number,
        height: number
    ) => {
        if (babyDto) {
            babyDto.name = name;
            babyDto.birthDay = birthDay;
            babyDto.weight = weight;
            babyDto.height = height;
            const updatedBabyDto = new BabyDto(
                name,
                birthDay,
                weight,
                height,
                babyDto.getRegisters()
            );
            setBabyDto(updatedBabyDto);
            updatedBabyDto.saveInLocalStorage();
        }
    };

    return (
        <BabyContext.Provider
            value={{
                babyDto,
                addRegister,
                removeRegisterById,
                getCurrentId,
                updateBabyData,
                getRegisterById,
                updateRegister,
            }}
        >
            {children}
        </BabyContext.Provider>
    );
};

export const useBabyContext = (): BabyContextType => {
    const context = useContext(BabyContext);
    if (!context) {
        throw new Error("useBabyContext must be used within a BabyProvider");
    }
    return context;
};
