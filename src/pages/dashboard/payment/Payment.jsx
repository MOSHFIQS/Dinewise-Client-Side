import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe(`pk_test_51RZQDLH5jCA2htFKSiutvVQh97UxtEU7rz2Cl2n2iUnEHA6AMvEZJDtOhcVg6WTyw3hDb8bXTPaKofQgtGPAxavL00OJsNyv6X`);
// const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);
// console.log(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);

const Payment = () => {
    return (

        <div >
            <div >
                <Elements stripe={stripePromise}>
                    <div className='flex items-center justify-center min-h-screen w-full'>
                        <CheckoutForm />
                    </div>
                </Elements>
            </div>
        </div>

    );
};

export default Payment;
