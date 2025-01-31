import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Header from "../components/common/Header";
import useAxiosPaymentHist from "../../../../Hooks/useAxiosPaymentHist";
import { AuthContext } from "../../../../Context/ContextProvider";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState();
  const [history, refetch] = useAxiosPaymentHist();
  const { user } = useContext(AuthContext);

  const handleSearch = (e) => {
    refetch();
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = history?.filter((item) =>
      item?.purchasedMembership?.toLowerCase()?.includes(term)
    );
    setFilteredUsers(filtered);
    refetch();
  };

  return (
    <div className="relative z-10 bg-gray-900 h-screen overflow-auto">
      <Header title={"Payment History"} />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 mt-16">
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-lg p-6 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="">
            <h2 className="text-xl font-semibold text-gray-100">
              Payments History
            </h2>
            <div className="relative mb-6 mt-6">
              <input
                type="text"
                placeholder="Search Category..."
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
          </div>

          <div className="overflow-x-auto h-[35rem]">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Purchase
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    transactionsId
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {(filteredUsers || history)?.map((item) => (
                  <motion.tr
                    key={item?._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                            {user?.displayName?.charAt(0) ||
                              user?.username?.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-100">
                            {user?.displayName || user?.username}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">
                        {item?.purchasedMembership}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-800 text-green-100"`}
                      >
                        {item?.transactionsId}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-800 text-green-100"`}
                      >
                        {item?.purchaseAmount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-green-100"`}
                      >
                        {item?.purchaseDate}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
export default PaymentHistory;
