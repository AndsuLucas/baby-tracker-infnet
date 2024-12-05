import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface BabyDto {
    name: string;
    birthDay: Date;
    weight: number;
    height: number;
}

const BabyTable: React.FC<{ baby: BabyDto }> = ({ baby }) => {
    const { t } = useTranslation();

    const calculateDaysOfLife = (birthDay: Date): number => {
        const birthDate = dayjs(birthDay);
        const today = dayjs();
        return today.diff(birthDate, "day");
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{t('babyName')}</TableCell>
                        <TableCell>{t('babyDays')}</TableCell>
                        <TableCell>{t('babyWeight')}</TableCell>
                        <TableCell>{t('babyHeight')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{baby.name}</TableCell>
                        <TableCell>{calculateDaysOfLife(baby.birthDay)}</TableCell>
                        <TableCell>{baby.weight}</TableCell>
                        <TableCell>{baby.height}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BabyTable;
