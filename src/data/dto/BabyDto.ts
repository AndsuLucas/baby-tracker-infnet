import { BabyRegister as BabyRegisterInterface } from '../../interfaces/BabyRegister';

class BabyDto {
    public name: string = 'Benício';
    public birthDay: Date = new Date();
    public weight: number = 0;
    public height: number = 0;
    private registers: BabyRegisterInterface[];
    public static babyHashMappedById: Map<string, BabyRegisterInterface> = new Map();
    public static sortedRegisters: BabyRegisterInterface[] = [];

    constructor(
        name: string,
        birthDay: Date,
        weight: number,
        height: number,
        registers: BabyRegisterInterface[]
    ) {
        this.name = name;
        this.birthDay = birthDay;
        this.weight = weight;
        this.height = height;
        this.registers = registers;
    }

    removeRegisterById(id: number) {
        this.registers = this.registers.filter(register => register.id !== id);
        BabyDto.babyHashMappedById.delete(id.toString());
        BabyDto.sortedRegisters = [];
    }

    addRegister(register: BabyRegisterInterface) {
        this.registers.push(register);
        BabyDto.babyHashMappedById.set(register.id.toString(), register);
        BabyDto.sortedRegisters = [];
    }

    getRegisters() {
        if (BabyDto.sortedRegisters.length > 0) {
            return BabyDto.sortedRegisters;
        }

        BabyDto.sortedRegisters = this.registers.sort((a, b) => {
            return b.id - a.id;
        });

        return BabyDto.sortedRegisters;
    }

    getRegisterById(id: number) {
        if (BabyDto.babyHashMappedById.has(id.toString())) {
            console.log('babyHashMappedById', BabyDto.babyHashMappedById.get(id.toString()));
            return BabyDto.babyHashMappedById.get(id.toString());
        }

        return this.registers.find((register) => register.id === id);
    }

    editRegister(register: BabyRegisterInterface) {
        this.registers = this.registers.map((r) => {
            if (r.id === register.id) {
                return register;
            }
            return r;
        });

        BabyDto.babyHashMappedById.set(register.id.toString(), register);
    }

    saveInLocalStorage() {
        localStorage.setItem('babyDTO', JSON.stringify(this));
    }

    changeBabyData = (
        name: string,
        birthDay: Date,
        weight: number,
        height: number
    ) => {
        this.name = name;
        this.birthDay = birthDay;
        this.weight = weight;
        this.height = height;
        this.saveInLocalStorage();
    }

    static loadFromLocalStorage() {
        const babyDto = localStorage.getItem('babyDTO');
        if (babyDto) {
            const dataOnStorage = JSON.parse(babyDto);
            return new this(
                dataOnStorage.name,
                new Date(dataOnStorage.birthDay),
                dataOnStorage.weight,
                dataOnStorage.height,
                dataOnStorage.registers
            );
        }

        return new this('Benício', new Date(), 0, 0, []);
    }
}

export default BabyDto;
