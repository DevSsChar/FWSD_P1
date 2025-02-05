"use client"
import React from 'react'
import Script from 'next/script'
import { initiate } from '@/actions/useractions'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments } from '@/actions/useractions'
import { useEffect } from 'react'
import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Bounce } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { notFound } from "next/navigation"

const PaymentPage = ({ username }) => {
    const [paymentform, setpaymentform] = useState({})
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setpayments] = useState([])
    const searchParams=useSearchParams()
    const router=useRouter()
    const { data: session, status } = useSession();

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast('🦄 Payment had been made!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            //to show the toast
        }
    }, [payments])


    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async (params) => {
        console.log(username)
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setpayments(dbpayments)
    }

    const pay = async (amount) => {
        //get the order id
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            key: currentUser.razorpayid, // Replace with your Razorpay key_id
            amount: amount, // Amount is in sen. Default currency is MYR. Hence, 50000 refers to 50000 sen.
            currency: 'MYR',
            name: 'Buy Me A Tea',
            description: 'Test Transaction',
            order_id: orderId, // This is the order_id created in the backend
            callback_url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/razorpay`, // Your success URL
            prefill: {
                name: 'Siti Aisyah',
                email: 'siti.aisyah@example.com',
                contact: '+601113455567'
            },
            theme: {
                color: '#F37254'
            },
            method: 'upi',
        }

        var rzp1 = new Razorpay(options)
        rzp1.open()
    }
  
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* use toast container from react toast */}
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='cover w-full relative flex justify-center items-center' >
                <img src={currentUser.coverpic} className='cover w-full h-auto' alt="" />
                <div className='absolute -bottom-20 border-black border-2 roundex-lg rounded-full size-32 object-cover overflow-hidden'>
                    <img className='rounded-full object-cover size-32' width={128} height={128} src={currentUser.profilepic} alt="" />
                </div>
            </div>
            <div className="info flex justify-center items-center my-24 flex-col gap-2">
                <div className='font-bold text-lg'>
                    @{username}
                </div>
                <div className='text-slate-400'>
                    Lets help {username} to get a tea
                </div>
                <div className='text-slate-400'>
                    {payments.length} Payments . {currentUser.name} has raised ₹{payments.reduce((a,b)=>a+b.amount,0)}
                </div>

                <div className="payment flex gap-3 w-[80%] mt-11">
                    <div className="supporters w-1/2 bg-slate-900 rounded-lg text-white p-10">
                        {/* show list of all supporters as a leaderboard */}
                        <h2 className='text-2xl font-bold '>Supporters</h2>
                        <ul className='mx-5 text-lg'>
                            {payments.length == 0 && <li>No Payments Yet</li>}
                            {payments.map((p, i) => {
                                return <li key={i} className='my-4 flex gap-2  items-center'>
                                    <img width={33} src="teagif.gif" alt="user avatar"
                                        className='rounded-full' />
                                    <span>
                                        {p.name} donated
                                        <span className='font-bold'> ₹{p.amount}</span> with a message "{p.message}"
                                    </span>
                                </li>
                            })}
                        </ul>
                    </div>

                    <div className="makepayment w-1/2 bg-slate-900 rounded-lg p-10">
                        <h2 className='text-2xl font-bold my-5'>Support {username}</h2>
                        <div className="flex gap-2 flex-col">
                            {/* input for name and message and amount */}
                            <input
                                onChange={handleChange} value={paymentform.name}
                                type="text"
                                className="w-full p-3 rounded-lg bg-slate-800 text-white" placeholder='enter name'
                                name="name" id="" />
                            <input onChange={handleChange} type="text"
                                value={paymentform.message}
                                className="w-full p-3 rounded-lg bg-slate-800 text-white" placeholder='enter message'
                                name="message" id="" />
                            <input onChange={handleChange} type="text"
                                value={paymentform.amount}
                                className="w-full p-3 rounded-lg bg-slate-800 text-white" placeholder='enter amount'
                                name="amount" id="" />

                            <button onClick={() => pay(paymentform.amount * 100)} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:from-purple-600" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4}>Pay</button>
                        </div>
                        {/* or chhose from this amount
                       */}
                        <div className="flex gap-2 mt-5">
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(1000)}>Pay ₹10</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(2000)}>Pay ₹20</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(3000)}>Pay ₹30</button></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
