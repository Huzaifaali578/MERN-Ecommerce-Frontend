import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
// import CompletePage from "./CompletePage";
// import "../";
import { useSelector } from "react-redux";
import { currentOrderSelector } from "../features/Orders/orderSlice";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51QVYRBKITOIJo3zq80GhjmRfz2EZssXDAcm6VmjwrdXlhmqV47ZuKCfRYVTtUGwQzQ6cocn7pf4GngTIX0DY7UvV00Ad5JAzf1");

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
    const [dpmCheckerLink, setDpmCheckerLink] = useState("");
  const currentOrder = useSelector(currentOrderSelector)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: currentOrder.totalAmount}),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        // [DEV] For demo purposes only
        setDpmCheckerLink(data.dpmCheckerLink);
      });
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';
  return (
      <div className="Stripe">
        {clientSecret && (
          <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
            <CheckoutForm dpmCheckerLink={dpmCheckerLink}/>
          </Elements>
        )}
      </div>
    
  );
}