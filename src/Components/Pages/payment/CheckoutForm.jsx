import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Context/ContextProvider";
import { Button } from "@heroui/react";
import useAxiosSecureData from "../../Hooks/useAxiosSecureData";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [errorMSG, setErrorMSG] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { money, user, membershipName } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users] = useAxiosSecureData();
  const { pathname } = useLocation();
  const filtered = users?.users?.find((item) => item?.email === user?.email);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const result = pathname.split("/")[2];

    axiosSecure.post(`/${import.meta.env.VITE_URL__32}/${result}`).then((res) => {
      if (!res.data) {
        toast.error("Operation Not Allowed");
        navigate("/");
      }
      if (!money && !membershipName) {
        toast.error("Operation Not Allowed");
        navigate("/");
      }
    });
  }, [pathname]);

  // detect back button
  window.addEventListener(
    "popstate",
    function (event) {
      // The popstate event is fired each time when the current history entry changes.
      var r = true;

      if (r == true) {
        history.back();
        location.reload();
      } else {
        // Stay on the current page.
        history.pushState(null, null, window.location.pathname);
      }
      history.pushState(null, null, window.location.pathname);
    },
    false
  );

  // let totalPrice = 0

  useEffect(() => {
    if (money > 0) {
      axiosSecure
        .post(`/${import.meta.env.VITE_URL__27}`, { price: money })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, money]);

  const onSubmit = async (e) => {
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErrorMSG("Please fill up the card info");
      return setError(error.message);
    } else {
      setError("");
      setErrorMSG("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name:
              user?.displayName || user?.username || user?.name || "anonymous",
          },
        },
      });

    if (confirmError) {
      return toast.error(confirmError);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const payment = {
          transactionsId: paymentIntent.id,
          purchaseUserId: filtered.id,
          purchaseDate: Date(),
          purchaseAmount: money,
          purchasedMembership: membershipName,
          purchasedUserEmail: user.email,
          userAddress: e.address,
        };

        axiosSecure.post(`/paymentsData/${filtered._id}`, payment).then((res) => {
          console.log(res.data.result.insertedId);
          
          if (res.data.result.insertedId.length > 0) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Thank you for your purchase",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
            reset()
          }
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 rounded-lg flex flex-col md:flex-row justify-center items-center">
      {/* Checkout Form */}
      <div className="bg-white shadow-lg w-[90%] md:w-1/2 p-6 md:p-12 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Payment Details
        </h2>
        <p className="mb-4 text-black font-semibold">
          Do not reload or navigate away during payment.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              value={filtered?.name || filtered?.username}
              type="text"
              id="username"
              placeholder="Enter your username"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              value={filtered?.email}
              readOnly
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              {...register("address")}
              required
              id="address"
              placeholder="Enter your address"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="card-element"
              className="block text-sm font-medium text-gray-700"
            >
              Card Details
            </label>
            <div className="mt-1 border border-gray-300 rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500">
              <CardElement
                id="card-element"
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
            </div>
          </div>
          <p className="text-red-600">{errorMSG}</p>
          <Button
            disabled={!stripe || !clientSecret}
            type="submit"
            // disabled={!stripe || !clientSecret}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Checkout
          </Button>
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] md:w-1/3 lg:w-1/4 mt-6 md:mt-0 md:ml-6 text-black">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Order Summary
        </h2>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Membership Plan ({membershipName})</span>
            <span>${money}</span>
          </div>
          <div className="border-t border-gray-300 mt-2 pt-2 flex justify-between font-medium">
            <span>Total</span>
            <span>${money}.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
