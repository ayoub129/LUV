import React from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PayPalButton = ({ onSuccess, onError }) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "65.00", 
          },
        },
      ],
    });
  };

  const onApprove = ( actions) => {
    return actions.order.capture().then((details) => {
      onSuccess(details);
    });
  };

  const onErrorHandler = (err) => {
    onError(err);
  };

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      onError={onErrorHandler}
      forceReRender={[isPending]}
    />
  );
};

export default PayPalButton;
