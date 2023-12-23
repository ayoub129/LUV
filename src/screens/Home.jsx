import About from "../components/About";
import Footer from "../components/Footer";
import Jumbotron from "../components/Jumbotron";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const PAYPAL_CLIENT_ID = import.meta.env.VITE_REACT_APP_PAYPAL_CLIENT_ID;

const Home = () => {
  return (
    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
        <div className="App">
            <Jumbotron />
            <About />
            <Footer />
        </div>
     </PayPalScriptProvider>
  )
}

export default Home