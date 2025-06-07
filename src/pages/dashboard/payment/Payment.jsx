import React from 'react';

const Payment = () => {
    return (

        <div className='w-full h-screen flex flex-col items-center justify-center gap-4 space-y-10'>
            <h3 className='text-5xl font-bold'>Payment</h3>
            <div className='flex gap-4'>
                <input type="text" className='input w-96' placeholder='card number' />
                <input type="text" className='input w-96' />
            </div>
            <button className='btn btn-primary w-96 text-white'>Pay</button>
        </div>

    );
};

export default Payment;