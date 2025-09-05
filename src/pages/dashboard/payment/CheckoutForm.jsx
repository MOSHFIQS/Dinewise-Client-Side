import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useCart from '../../../hooks/useCart';
import useAuth from '../../../hooks/useAuth';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [cart] = useCart();

    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const price = cart.reduce((total, item) => total + item.price, 0);

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(err => {
                    console.error('Failed to create payment intent:', err);
                });
        }
    }, [axiosSecure, price]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrorMessage('');
        setSuccessMessage('');

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (card == null) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setErrorMessage(error.message);
            setProcessing(false);
            return;
        }
        else {
            // console.log(paymentMethod);
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            },
        });

        if (confirmError) {
            setErrorMessage(confirmError.message);
        } else if (paymentIntent.status === 'succeeded') {
            setSuccessMessage('🎉 Payment successful!');

            const payment = {
                email: user.email,
                amount: price,
                date: new Date(),
                cartIds: cart.map(item => item._id),
                menuIds:cart.map(item => item.menuId),
                status:'pending',
                transactionId:paymentIntent.id
            }
            // console.log(payment);

            await axiosSecure.post('/payment',payment)
        }

        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="w-[500px] space-y-4 border p-4 rounded">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button
                type="submit"
                className="btn btn-primary btn-sm w-full"
                disabled={!stripe || !clientSecret || processing}
            >
                {processing ? 'Processing...' : 'Pay'}
            </button>

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-600">{successMessage}</p>}
        </form>
    );
};

export default CheckoutForm;
