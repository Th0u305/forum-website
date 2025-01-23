import { motion } from "framer-motion";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const MakePayment = () => {
  return (
    <div className="flex-1 relative z-10 overflow-auto">
      <Helmet>
        <title>TopicTree | Payment</title>
      </Helmet>
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className=""
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Elements stripe={stripePromise}>
            <CheckoutForm></CheckoutForm>
          </Elements>
        </motion.div>
      </main>
    </div>
  );
};
export default MakePayment;
