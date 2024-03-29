import React, { Suspense } from "react";
import About from "../components/About";
import Footer from "../components/Footer";
import Jumbotron from "../components/Jumbotron";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const Hoodie = React.lazy(() => import("../components/Hoodie"));


const PAYPAL_CLIENT_ID = import.meta.env.VITE_REACT_APP_PAYPAL_CLIENT_ID;

const Home = () => {
  return (
    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
        <div className="App">
            <Jumbotron />
            <About  />
            <strong className="history">This represents the person who has been through a lot, had their soul/heart hurt, and still stands strong.</strong>
            <Suspense fallback={<div className="text-center mt-2">Loading...</div>}>
              <Hoodie />
            </Suspense>
            <Footer />
        </div>
     </PayPalScriptProvider>
  )
}

export default Home
