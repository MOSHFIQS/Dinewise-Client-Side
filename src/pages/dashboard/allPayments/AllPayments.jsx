import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SectionTitle from '../../../components/sectionTitle/SectionTitle';

const AllPayments = () => {
    const axiosSecure = useAxiosSecure();
    const [payments, setAllPayments] = useState([]);

    useEffect(() => {
        axiosSecure.get('/allPayments')
            .then(res => setAllPayments(res.data));
    }, []);

    return (
        <div className="max-w-[90vw] lg:max-w-[75vw] mx-auto px-2 md:px-4">
            <SectionTitle Heading="ALL PAYMENTS" subHeading="" />
            <div className="bg-gray-100 p-4 rounded shadow">
                <div className="font-extrabold uppercase mb-4">
                    <h4>Total Orders: {payments.length}</h4>
                </div>

                {/* Card View (mobile) */}
                <div className="flex flex-col gap-4 md:hidden">
                    {payments.map((payment, idx) => (
                        <div key={idx} className="bg-white p-4 rounded shadow text-sm">
                            <div className="font-bold mb-2">#{idx + 1}</div>
                            <div><span className="font-semibold">Amount:</span> ${payment.amount}</div>
                            <div><span className="font-semibold">Date:</span> {payment.date?.slice(0, 10)}</div>
                            <div className="break-all"><span className="font-semibold">Email:</span> {payment.email}</div>
                            <div className="break-all"><span className="font-semibold">Transaction ID:</span> {payment.transactionId}</div>
                        </div>
                    ))}
                </div>

                {/* Table View (desktop) */}
                <div className="hidden md:block overflow-x-auto mt-4">
                    <table className="table table-zebra w-full text-sm">
                        <thead className="bg-gray-300 text-left">
                            <tr>
                                <th>#</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Email</th>
                                <th>Transaction ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>${payment.amount}</td>
                                    <td>{payment.date?.slice(0, 10)}</td>
                                    <td className="break-all">{payment.email}</td>
                                    <td className="break-all">{payment.transactionId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllPayments;
