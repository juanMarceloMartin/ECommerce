import { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, FormHelperText, OutlinedInput } from '@material-ui/core';
import LuxonUtils from '@date-io/luxon';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { CHECKOUT_REDUCER_TIPES } from '../../reducers/checkout-reducer';
interface IProps {
    label: string
    required?: boolean
    stateKey: string
}

const FormInput: FC<IProps> = ({ label, required, stateKey }) => {
    const dispatch = useDispatch();
    const [dateValue, setDateValue] = useState(new Date())
    const [inputError, setInputError] = useState(false);
    const [valueIsEmpty, setValueIsEmpty] = useState(false);
    const inputValue = useSelector((state: any) => state.checkout[stateKey])
    const inputType = label === "Security Code" ? "password" : "text";

    const handleChange = (event: any) => {
        let action = Object.keys(CHECKOUT_REDUCER_TIPES).filter((type: string) => type.toLocaleLowerCase().includes(label.split(" ").join("").toLocaleLowerCase()))[0];

        if (label.toLocaleLowerCase().includes("card")) {
            if (label.toLocaleLowerCase().includes("number")) {
                action = CHECKOUT_REDUCER_TIPES.SET_CARD_NUMBER;
            }

            if (label.toLocaleLowerCase().includes("name")) {
                action = CHECKOUT_REDUCER_TIPES.SET_NAME_ON_CARD;
            }
        }

        if (label.toLocaleLowerCase().includes("security")) {
            action = CHECKOUT_REDUCER_TIPES.SET_SECURITY_CODE;
        }

        if (action) {
            dispatch({ type: action, payload: event.target.value })
        }
    };

    const handleDateChange = (event: any) => {
        const expirationDate = new Date(`${event.c.month}-${event.c.day}-${event.c.year}`);
        setDateValue(expirationDate)
    }

    const isNumeric = (phoneInput: any) => /^\d+$/.test(phoneInput);

    const setMaxExpirationDate = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getUTCFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDay();

        return new Date(`${currentMonth}-${currentDay}-${currentYear + 10}`);
    }

    const validateValue = () => {
        if (!required) {
            setValueIsEmpty(false);
        } else {
            if (!inputValue) {
                setValueIsEmpty(true);
                setInputError(false);
            }
        }

        if (inputValue) {
            setValueIsEmpty(false);
            let response = false;
            if (label === "Email") {
                if (!inputValue.includes("@") || !inputValue.includes(".com")) {
                    response = true;
                }
            }

            if (label === "Phone") {
                if (!isNumeric(inputValue)) {
                    response = true;
                }
            }

            if (label === "Card Number") {
                if (!isNumeric(inputValue) || inputValue.length !== 16) {
                    response = true;
                }
            }

            if (label === "Security Code") {
                if (!isNumeric(inputValue) || inputValue.length !== 3) {
                    response = true;
                }
            }

            setInputError(response);
        }
    }

    useEffect(() => {
        const item = localStorage.getItem(stateKey)
        if (!item?.length) {
            localStorage.setItem(stateKey, "")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {label === "Expiration Date" ?
                <MuiPickersUtilsProvider utils={LuxonUtils}>
                    <KeyboardDatePicker
                        style={{ width: "100%", paddingTop: "11px" }}
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        views={["year", "month"]}
                        label={label}
                        minDate={new Date()}
                        maxDate={setMaxExpirationDate()}
                        value={dateValue}
                        InputAdornmentProps={{ position: "start" }}
                        onChange={(e) => handleDateChange(e)}
                    />
                </MuiPickersUtilsProvider>
                :
                <FormControl style={{ width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="component-outlined">{label}</InputLabel>
                    <OutlinedInput type={inputType} value={inputValue} style={{ margin: "11px 5px" }} onBlur={() => validateValue()} error={inputError || valueIsEmpty} id={label} onChange={handleChange} label={label} />
                    {inputError &&
                        <FormHelperText error>{label} format is incorrect</FormHelperText>
                    }
                    {valueIsEmpty &&
                        <FormHelperText error>This field is required</FormHelperText>
                    }
                </FormControl>
            }
        </>
    )
}

export default FormInput;