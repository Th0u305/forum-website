import { ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import ActiveUsers from "../components/overview/ActiveUsers";
import DailyActivities from "../components/overview/DailyActivities";
import DevicesOverview from "../components/overview/DevicesOverview";
import { FaComment } from "react-icons/fa";
import useAxiosAdminData from "../../../../Hooks/useAxiosAdminData";
import { Helmet } from "react-helmet-async";

const OverviewPage = () => {
  const [users] = useAxiosAdminData();

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Helmet>
        <title>Dashboard | Overview</title>
      </Helmet>
      <Header title="Overview" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Users"
            icon={Zap}
            value={users?.usersTotal + 50}
            color="#6366F1"
          />
          <StatCard
            name="New Users"
            icon={Users}
            value={users?.usersTotal - 20}
            color="#8B5CF6"
          />
          <StatCard
            name="Total Posts"
            icon={ShoppingBag}
            value={users?.postTotal}
            color="#EC4899"
          />
          <StatCard
            name="Total Comments"
            icon={FaComment}
            value={users?.commentTotal}
            color="#10B981"
          />
        </motion.div>

        {/* CHARTS */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ActiveUsers></ActiveUsers>
          <DailyActivities></DailyActivities>
          <DevicesOverview></DevicesOverview>
        </div>
      </main>
    </div>
  );
};
export default OverviewPage;
