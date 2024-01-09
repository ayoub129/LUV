import About from "../components/About";
import Footer from "../components/Footer";
import Jumbotron from "../components/Jumbotron";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import {useState} from "react";

const PAYPAL_CLIENT_ID = import.meta.env.VITE_REACT_APP_PAYPAL_CLIENT_ID;

const Home = () => {
  const [loading , setLoading] = useState(false)
  return (
  <>
    {loading ? 
      <div className="load">Loading Your Hoodie...</div>
      :   
    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
        <div className="App">
            <Jumbotron />
            <About setLoading={setLoading} />
            <Footer />
        </div>
     </PayPalScriptProvider>
    }
  </>
  )
}

export default Home
