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
import DashboardRoot from "./Components/Pages/Dashboard/DashRoot/DashboardRoot";
import OverviewPage from "./Components/Pages/Dashboard/pages/OverviewPage";
import ProductsPage from "./Components/Pages/Dashboard/pages/ProductsPage";
import UsersPage from "./Components/Pages/Dashboard/pages/UsersPage";
import SalesPage from "./Components/Pages/Dashboard/pages/SalesPage";
import OrdersPage from "./Components/Pages/Dashboard/pages/OrdersPage";
import AnalyticsPage from "./Components/Pages/Dashboard/pages/AnalyticsPage";
import SettingsPage from "./Components/Pages/Dashboard/pages/SettingsPage";
import ErrorPage from "./Components/Pages/ErrorPage/ErrorPage";
import Login from "./Components/Pages/Login/Login";
import PrivateRoute from "./Components/Pages/Private/Routes/PrivateRoute";
import Register from "./Components/Pages/Register/Register";
import { HeroUIProvider } from "@heroui/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import AdminRoutes from "./Components/Pages/Private/Routes/AdminRoutes";


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
            </Route>

            <Route path="/dashboard" element={<DashboardRoot />}>
                <Route path="/dashboard" element={<PrivateRoute><OverviewPage /></PrivateRoute>}/>
                <Route path="products" element={<PrivateRoute><ProductsPage /></PrivateRoute>} />
                <Route path="users" element={<PrivateRoute><AdminRoutes><UsersPage /></AdminRoutes></PrivateRoute>} />
                <Route path="sales" element={<PrivateRoute><SalesPage /></PrivateRoute>} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="settings" element={<SettingsPage />} />
            </Route>
            
          </Routes>

        </QueryClientProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  </BrowserRouter>
);
