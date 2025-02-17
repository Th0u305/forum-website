import Header from "../components/common/Header";
import ConnectedAccounts from "../components/Profile/ConnectedAccounts";
import DangerZone from "../components/Profile/DangerZone";
import Notifications from "../components/Profile/Notifications";
import Profile from "../components/Profile/Profile";
import RecentPosts from "../components/Profile/RecentPosts";
import Security from "../components/Profile/Security";
import { Helmet } from "react-helmet-async";

const SettingsPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900 h-screen">
      <Header title="Profile" />
      <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8 mt-16">
        <Profile />
        <RecentPosts/>
        <Notifications />
        <Security />
        <ConnectedAccounts />
        <DangerZone />
      </main>
    </div>
  );
};
export default SettingsPage;
