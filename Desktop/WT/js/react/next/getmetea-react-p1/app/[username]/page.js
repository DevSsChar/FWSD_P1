// Username.js (Client Component)
import React from 'react';
import PaymentPage from '@/components/PaymentPage';
import { notFound } from "next/navigation"
import connectDB from '@/db/connectDb';
import User from '@/models/User';

const Username = async ({ params }) => {
    //if the username isnt present in the db show 404 error
    params = await params
    const checkUser = async () => {
        await connectDB()
        let u = await User.findOne({ username: params.username })
        if (!u) {
            return notFound()
        }
    }
    await checkUser()
    return (
        <>
            {/* Pass only the username to the PaymentPage component */}
            <PaymentPage username={params.username} />
        </>
    );
}

export default Username;


