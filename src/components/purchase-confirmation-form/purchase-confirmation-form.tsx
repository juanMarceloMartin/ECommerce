import { FC } from 'react';
import { useSelector } from 'react-redux';
import IStore from '../../commons/interfaces/IStore';

const PurchaseConfirmationForm: FC = () => {
    const checkout = useSelector((state: IStore) => state.checkout);

    function setCreditCardFormat() {
        const lastFourNumbers = checkout.cardNumber.substr(checkout.cardNumber.length - 4);
        return `XXXX XXXX XXXX ${lastFourNumbers}`;
    }

    return (
        <div>
            <h3>Recipient</h3>
            <div>{checkout.firstName} {checkout.lastName}</div>
            <h3>Contacto Information</h3>
            <div>Email: {checkout.email}</div>
            <div>Phone: {checkout.phone}</div>
            <h3>Ship to:</h3>
            <div>{checkout.address} {checkout.apt && `Apt: ${checkout.apt}`}</div>
            <div>{checkout.city}, {checkout.zipcode}</div>
            <div>{checkout.state}, {checkout.country}</div>
            <h3>Payment Method:</h3>
            {checkout.cashPayment &&
                <div>Cash</div>
            }
            {checkout.cardPayment &&
                <div>Card: {setCreditCardFormat()}</div>
            }
        </div>
    )
}

export default PurchaseConfirmationForm;