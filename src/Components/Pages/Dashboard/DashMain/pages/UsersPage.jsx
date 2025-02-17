import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import UsersTable from "../components/users/UsersTable";
import UserGrowthChart from "../components/users/UserGrowthChart";
import UserActivityHeatmap from "../components/users/UserActivityHeatmap";
import UserDemographicsChart from "../components/users/UserDemographicsChart";
import useAxiosAdminData from "../../../../Hooks/useAxiosAdminData";
import { Helmet } from "react-helmet-async";

const UsersPage = () => {
  const [users, refetch] = useAxiosAdminData();
  refetch();

  return (
    <div className="flex-1 overflow-auto relative z-10 h-screen">
      <Header title="Users" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 mt-16">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Users"
            icon={UsersIcon}
            value={users?.users?.length}
            color="#6366F1"
          />
          <StatCard
            name="New Users Today"
            icon={UserPlus}
            value={users?.users?.length - 15}
            color="#10B981"
          />
          <StatCard
            name="Active Users"
            icon={UserCheck}
            value={users?.users?.length - 10}
            color="#F59E0B"
          />
          <StatCard
            name="Churn Rate"
            icon={UserX}
            value="2.4%"
            color="#EF4444"
          />
        </motion.div>

        <UsersTable />

        {/* USER CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <UserGrowthChart />
          <UserActivityHeatmap />
          <UserDemographicsChart />
        </div>
      </main>
    </div>
  );
};
export default UsersPage;
