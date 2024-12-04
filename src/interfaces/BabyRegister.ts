import {Dayjs} from "dayjs";

export interface BabyRegister {
    id: number,
    obs?: string,
    type: 'eat' | 'sleep' | 'diaper',
}

export interface SleepRegister extends BabyRegister {
    startDate: Dayjs,
    endDate: Dayjs,
}

interface FoodType {
    type: 'feedingBottle' | 'breastFeeding';
}

interface FedingBottleFood extends FoodType {
    quantity: number,
    date: Date,
}

interface BreastfeedingFood extends FoodType {
    side: 'left' | 'right' | 'both',
    startDate: Dayjs,
    endDate: Dayjs,
}

export interface EatRegister extends BabyRegister {
    food: FoodType
}

export  interface DiaperRegister extends BabyRegister {
    date: Dayjs,
    state: 'pee' | 'poop' | 'both' | 'neither',
}