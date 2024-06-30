import {loadStripe} from "@stripe/stripe-js"


import React from 'react';
export async function checkout({lineItems}) {
    const secretkey = "pk_test_51OEOnmSEU8eRRckTr6Qjn3Q5wU6xU1AqV7vqwCiFRy98v1uyKxz6FWwMcWHMp1wDwKq42LULOxOXIcIIBzhIq06I00cHcZQxQr";
    let stripePromise =null
    const getstripe =()=>{
        if(!stripePromise){
            stripePromise =loadStripe(secretkey)
        }
        return stripePromise
    }
    const stripe =await getstripe()
    await stripe.redirectToCheckout({
        mode:"payment",
        lineItems,
        successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
		cancelUrl: window.location.origin
    })
}