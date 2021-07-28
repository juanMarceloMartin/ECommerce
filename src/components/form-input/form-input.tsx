import { FC, useState } from 'react';
import { FormControl, InputLabel, FormHelperText, OutlinedInput } from '@material-ui/core';

interface IProps {
    label: string
    required?: boolean
}

const FormInput: FC<IProps> = ({ label, required }) => {
    const [inputValue, setInputValue] = useState('');
    const [inputError, setInputError] = useState(false);
    const [valueIsEmpty, setValueIsEmpty] = useState(false);

    const handleChange = (event: any) => {
        setInputValue(event.target.value);
    };

    const isNumeric = (phoneInput: any) => /^\d+$/.test(phoneInput);

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
        <FormControl style={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="component-outlined">{label}</InputLabel>
            <OutlinedInput style={{ margin: "5px" }} onBlur={() => validateValue()} error={inputError || valueIsEmpty} id="component-outlined" value={inputValue} onChange={handleChange} label={label} />
            {inputError &&
                <FormHelperText error>{label} format is incorrect</FormHelperText>
            }
            {valueIsEmpty &&
                <FormHelperText error>This field is required</FormHelperText>
            }
        </FormControl>

    )
}

export default FormInput;