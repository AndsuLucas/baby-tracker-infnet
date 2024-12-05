import React from "react";
import Box from "../components/Box";
import Form from "../components/Form";
import CustomAppBar from "../components/CustomAppBar";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { FormLabel } from "@mui/joy";
import CircularProgress from "@mui/material/CircularProgress";
import { useBabyContext } from "../data/BabyProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Eat: React.FC = () => {
    const { t } = useTranslation();
    const [foodType, setFoodType] = React.useState<string>("feedingBottle");
    const [breastSide, setBreastSide] = React.useState<string>("left");

    const babyContext = useBabyContext();
    const {
        babyDto,
        addRegister,
        getCurrentId,
        getRegisterById,
        updateRegister,
        removeRegisterById,
    } = babyContext;

    const navigate = useNavigate();
    const { registerId } = useParams();

    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        if (registerId) {
            const register = getRegisterById(parseInt(registerId)) as {
                [key: string]: any;
            };
            if (register) {
                setFoodType(register["food"]["type"]);
                if (register["food"]["side"]) {
                    setBreastSide(register["food"]["side"]);
                }
            }
        }
        setIsLoading(false);
    }, [registerId]);

    if (isLoading) {
        return (
            <Box boxProps={{ display: "flex" }}>
                <CircularProgress />
            </Box>
        );
    }

    const handleSubmit = (formData: { [key: string]: any }) => {
        const eatRegister = {
            id: registerId ? registerId : getCurrentId(),
            food: getFoodData(formData),
            type: "eat",
            obs: formData["obs"],
        };

        if (registerId) {
            updateRegister(eatRegister);
        } else {
            addRegister(eatRegister);
        }

        console.log(babyDto);
        navigate("/");
    };

    const getDefaultValueIfHave = (prop: string) => {
        if (!registerId) {
            return {};
        }

        const register = getRegisterById(parseInt(registerId)) as {
            [key: string]: any;
        };
        if (!register) {
            return {};
        }

        if (register[prop]) {
            return { defaultValue: register[prop] };
        }
        if (register["food"][prop]) {
            return { defaultValue: register["food"][prop].toString() };
        }
        return {};
    };

    const getFoodData = (eatData: { [key: string]: any }) => {
        if (foodType === "feedingBottle") {
            return {
                type: foodType,
                quantity: eatData["quantity"],
                date: eatData["date"],
            };
        }

        return {
            type: foodType,
            side: breastSide,
            startDate: eatData["startDate"],
            endDate: eatData["endDate"],
        };
    };

    const feedingBottleFields = [
        {
            label: t("quantity"),
            id: "quantity",
            props: {
                type: "number",
                required: true,
            },
            ...getDefaultValueIfHave("quantity"),
        },
        {
            label: t("dateTime"),
            id: "date",
            props: {
                type: "date",
                required: true,
            },
            ...getDefaultValueIfHave("date"),
        },
    ];

    const breastfeedingFields = [
        {
            label: t("startDateTime"),
            id: "startDate",
            props: {
                type: "date",
                required: true,
            },
            ...getDefaultValueIfHave("startDate"),
        },
        {
            label: t("endDateTime"),
            id: "endDate",
            props: {
                type: "date",
                required: true,
            },
            ...getDefaultValueIfHave("endDate"),
        },
    ];

    const fields = [
        {
            label: t("obs"),
            id: "obs",
            props: {
                type: "textarea",
                required: false,
            },
            ...getDefaultValueIfHave("obs"),
        },
    ];

    const getFields = () => {
        if (foodType === "feedingBottle") {
            return [...feedingBottleFields, ...fields];
        }
        return [...breastfeedingFields, ...fields];
    };

    const getDeleteActionIfneeds = () => {
        if (!registerId) {
            return null;
        }

        return () => {
            const response = window.confirm(t("deleteConfirm"));
            if (response) {
                removeRegisterById(parseInt(registerId));
                navigate("/");
            }
        };
    };

    const handleFoodTypeChange = (event: React.SyntheticEvent | null, newValue: string) => {
        setFoodType(newValue as string);
    };

    const handleBreastSideChange = (event: React.SyntheticEvent | null, newValue: string) => {
        setBreastSide(newValue as string);
    };

    return (
        <section>
            <CustomAppBar
                backPath="/"
                pageTitle={t("eatRegister")}
                deleteAction={getDeleteActionIfneeds()}
            />
            <Box boxProps={{ marginTop: "20px" }}>
                <FormLabel sx={{ display: "block", marginBottom: "5px" }}>
                    {t("foodType")}
                </FormLabel>
                <Select
                    value={foodType}
                    sx={{ marginBottom: "10px" }}
                    onChange={handleFoodTypeChange}
                    disabled={!!registerId}
                >
                    <Option value="feedingBottle">{t("feedingBottle")}</Option>
                    <Option value="breastFeeding">{t("breastFeeding")}</Option>
                </Select>
                {foodType === "breastFeeding" && (
                    <>
                        <FormLabel sx={{ display: "block", marginBottom: "5px" }}>
                            {t("breastSide")}
                        </FormLabel>
                        <Select
                            defaultValue={breastSide}
                            sx={{ marginBottom: "10px" }}
                            onChange={handleBreastSideChange}
                        >
                            <Option value="left">{t("left")}</Option>
                            <Option value="right">{t("right")}</Option>
                            <Option value="both">{t("both")}</Option>
                        </Select>
                    </>
                )}
                <hr />
                <Form onSubmit={(formData) => handleSubmit(formData)} fields={getFields()} />
            </Box>
        </section>
    );
};

export default Eat;
