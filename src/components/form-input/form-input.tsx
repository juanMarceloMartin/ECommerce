import { FC, useState } from 'react';
import { FormControl, InputLabel, FormHelperText, OutlinedInput } from '@material-ui/core';
import LuxonUtils from '@date-io/luxon';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
interface IProps {
    label: string
    required?: boolean
}

const FormInput: FC<IProps> = ({ label, required }) => {
    const [inputValue, setInputValue] = useState('');
    const [dateValue, setDateValue] = useState(new Date())
    const [inputError, setInputError] = useState(false);
    const [valueIsEmpty, setValueIsEmpty] = useState(false);

    const handleChange = (event: any) => {
        setInputValue(event.target.value);
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
                    <OutlinedInput style={{ margin: "11px 5px" }} onBlur={() => validateValue()} error={inputError || valueIsEmpty} id="component-outlined" value={inputValue} onChange={handleChange} label={label} />
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