import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import {
  currentOrderSelector,
} from "../features/Orders/orderSlice";

export default function CheckoutForm({ dpmCheckerLink }) {
  const stripe = useStripe();
  const elements = useElements();
  const currentOrder = useSelector(currentOrderSelector);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    // Dispatch the action to create an order
    console.log("currentOrder", currentOrder)
    
    if (currentOrder) {
      // Handle Stripe payment confirmation
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `https://mern-ecommerce-s9s0.onrender.com/order-succes/${currentOrder.id}`,
        },
      });

      // Handle payment errors
      if (error?.type === "card_error" || error?.type === "validation_error") {
        setMessage(error.message);
      } else if (error) {
        setMessage("An unexpected error occurred.");
      }
    } else {
      setMessage("Failed to create order.");
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion",
  };

  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
      {/* [DEV]: Display dynamic payment methods annotation and integration checker */}
      <div id="dpm-annotation">
        <p>
          Payment methods are dynamically displayed based on customer location,
          order amount, and currency.&nbsp;
          <a
            href={dpmCheckerLink}
            target="_blank"
            rel="noopener noreferrer"
            id="dpm-integration-checker"
          >
            Preview payment methods by transaction
          </a>
        </p>
      </div>
    </>
  );
}
