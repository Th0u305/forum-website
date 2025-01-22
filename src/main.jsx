import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Root from "./Components/Root/Root";
import Home from "./Components/Pages/Home/Home";
import "./index.css";
import Membership from "./Components/Pages/Membership/Membership";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Posts from "./Components/Pages/PostData/Posts";
import SinglePost from "./Components/Pages/SinglePost/SinglePost";
import LatestData from "./Components/Pages/LatestPost/LatestData";
import TopPosts from "./Components/Pages/TopPosts/TopPosts";
import ErrorPage from "./Components/Pages/ErrorPage/ErrorPage";
import Login from "./Components/Pages/Login/Login";
import PrivateRoute from "./Components/Pages/Private/Routes/PrivateRoute";
import Register from "./Components/Pages/Register/Register";
import { HeroUIProvider } from "@heroui/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import AdminRoutes from "./Components/Pages/Private/Routes/AdminRoutes";
import DashboardRoot from "./Components/Pages/Dashboard/DashRoot/DashboardRoot";
import OverviewPage from "./Components/Pages/Dashboard/DashMain/pages/OverviewPage";
import UsersPage from "./Components/Pages/Dashboard/DashMain/pages/UsersPage";
import AddPost from "./Components/Pages/Dashboard/DashMain/pages/AddPost";
import Reported from "./Components/Pages/Dashboard/DashMain/pages/Reported";
import MyPost from "./Components/Pages/Dashboard/DashMain/pages/MyPostPage";
import Announcement from "./Components/Pages/Dashboard/DashMain/pages/AnnouncementPage";
import SettingsPage from "./Components/Pages/Dashboard/DashMain/pages/ProfilePage";
import DashboardMain from "./Components/Pages/Dashboard/DashboardMain";
import MakePayment from "./Components/Pages/payment/MakePayment";
import PaymentHistory from "./Components/Pages/Dashboard/DashMain/pages/PaymentHistory";


// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <QueryClientProvider client={queryClient}>

          <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<Root />}>
              <Route element={<Home />}>
                <Route index element={<Posts />} />
                <Route path="post/:id" element={<SinglePost />} />
                <Route path="latest" element={<LatestData />} />
                <Route path="top" element={<TopPosts />} />
              </Route>
              <Route path="/membership" element={<Membership />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/payments/:id" element={<PrivateRoute><MakePayment/></PrivateRoute>}/>
            </Route>

            <Route path="/dashboard" element={<DashboardMain></DashboardMain>}>
              <Route element={<PrivateRoute><DashboardRoot /></PrivateRoute>}>
                  <Route path="overview" element={<AdminRoutes><OverviewPage /></AdminRoutes>}/>
                  <Route path="users" element={<AdminRoutes><UsersPage /></AdminRoutes>} />
                  <Route path="addPost" element={<PrivateRoute><AddPost /></PrivateRoute>} />
                  <Route path="myPost" element={<PrivateRoute><MyPost/></PrivateRoute>} />
                  <Route path="reports" element={<AdminRoutes><Reported /></AdminRoutes>} />
                  <Route path="announcement" element={<AdminRoutes><Announcement /></AdminRoutes>} />
                  <Route path="profile" element={<PrivateRoute><SettingsPage/></PrivateRoute>} />
                  <Route path="paymentHistory" element={<PrivateRoute><PaymentHistory/></PrivateRoute>}></Route>
              </Route>
            </Route>
          </Routes>

        </QueryClientProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  </BrowserRouter>
);
