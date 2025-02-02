import { CheckIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";
import { AuthContext } from "../../Context/ContextProvider";
import { Button } from "@heroui/react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import useAxiosSecureData from "../../Hooks/useAxiosSecureData";
import Swal from "sweetalert2";

const tiers = [
  {
    name: "Bronze",
    id: "sdfqw34984yua0sdj9834ytr4",
    href: "/",
    priceMonthly: "Free",
    description:
      "The perfect plan if you're just getting started with our product.",
    features: [
      "Limited posts (max 5 posts per month).",
      "Limited access to advanced features",
      "Bronze badge on the profile.",
      "24-hour support response time",
    ],
    featured: false,
  },
  {
    name: "Silver",
    id: "7878yuiHSdfu76t47sd244",
    href: "/dashboard/payment",
    priceMonthly: "39",
    description: "Dedicated support and infrastructure for your company.",
    features: [
      "Silver badge on the profile",
      "Unlimited posts",
      "Unlimited subscribers",
      "Dedicated support representative",
      "Priority support",
      "Marketing automations",
    ],
    featured: true,
  },

  {
    name: "Platinum",
    id: "87q98uwilefjsjkhfskjf33ds",
    href: "/dashboard/payment",
    priceMonthly: "99",
    description: "Dedicated support and infrastructure for your company.",
    features: [
      "Platinum badge on the profile.",
      "Unlimited posts",
      "Unlimited subscribers",
      "Advanced analytics",
      "Dedicated support representative",
      "Marketing automations",
      "Custom integrations",
      "Access to exclusive features, such as advanced analytics or private groups",
    ],
    featured: true,
  },
  {
    name: "Gold",
    id: "85jajkhfkjdhzkjurtyasersd3",
    href: "/dashboard/payment",
    priceMonthly: "29",
    description:
      "The perfect plan if you're just getting started with our product.",
    features: [
      "Gold badge on the profile",
      "Up to 100,000 subscribers",
      "Advanced analytics",
      "24-hour support response time",
    ],
    featured: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Membership() {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [users] = useAxiosSecureData();
  const { setMoney, setMembershipName, user } = useContext(AuthContext);
  const filtered = users?.users?.find((item) => item?.email === user?.email);

  const handlePayment = async (id, name) => {
    
    if (filtered?.membershipStatus !== "Free" || filtered?.badge[0] !== "Bronze") {
      return  Swal.fire({
        icon: "error",
        title: "You're already a member",
      });
    }

    if (name === "Bronze") {
      return navigate("#");
    }

    const result = await axiosSecure.get(`/${import.meta.env.VITE_URL__25}`);

    axiosSecure.post(`/${import.meta.env.VITE_URL__32}/${result.data}`).then((res) => {
      if (res.data) {
        setMoney(parseInt(id));
        setMembershipName(name);
        navigate(`/payments/${result.data}`);
      }
    });
  };

  return (
    <div className="relative isolate bg-[#dadada] px-6 py-24 sm:py-32 lg:px-8 rounded-lg mt-5">
      <Helmet>
        <title>TopicTree | Membership</title>
      </Helmet>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base/7 font-semibold text-indigo-600">Pricing</h2>
        <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
          Choose the right plan for you
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8">
        Choose an affordable plan that’s packed with the best features for
        engaging your audience, creating customer loyalty, and driving sales.
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6  lg:max-w-4xl lg:grid-cols-2 ">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tierIdx}
            className={classNames(
              tier.featured
                ? "relative bg-gray-900 shadow-2xl"
                : "bg-white/60  lg:mx-0",
              tier.featured
                ? ""
                : tierIdx === 0
                ? "rounded-t-3xl lg:rounded-bl-3xl lg:rounded-tr-none"
                : "lg:rounded-bl-none lg:rounded-tr-3xl",
              "rounded-3xl p-8 ring-1 ring-gray-900/10"
            )}
          >
            <h3
              id={tier.id}
              className={classNames(
                tier.featured ? "text-indigo-400" : "text-indigo-600",
                "text-base/7 font-semibold"
              )}
            >
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  tier.featured ? "text-white" : "text-gray-900",
                  "text-5xl font-semibold tracking-tight"
                )}
              >
                ${tier.priceMonthly}
              </span>
              <span
                className={classNames(
                  tier.featured ? "text-gray-400" : "text-gray-500",
                  "text-base"
                )}
              >
                /month
              </span>
            </p>
            <p
              className={classNames(
                tier.featured ? "text-gray-300" : "text-gray-600",
                "mt-6 text-base/7"
              )}
            >
              {tier.description}
            </p>
            <ul
              role="list"
              className={classNames(
                tier.featured ? "text-gray-300" : "text-gray-600",
                "mt-8 space-y-3 text-sm/6 sm:mt-10"
              )}
            >
              {tier.features.map((index) => (
                <li key={index} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className={classNames(
                      tier.featured ? "text-indigo-400" : "text-indigo-600",
                      "h-6 w-5 flex-none"
                    )}
                  />
                  {index}
                </li>
              ))}
            </ul>
            <Button
              size="lg"
              onPress={() => handlePayment(tier.priceMonthly, tier.name)}
              className="bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500 mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10"
            >
              Get started today
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
