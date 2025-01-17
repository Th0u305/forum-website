import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Root from "./Components/Root/Root";
import Home from "./Components/Pages/Home/Home";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
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

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Root></Root>}>
              <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
              <Route path="/login" element={<Login></Login>}></Route>
              <Route element={<Home></Home>}>
                <Route index element={<Posts></Posts>}></Route>
                <Route path="post/:id" index element={<SinglePost></SinglePost>}></Route>
                <Route path="latest" index element={<LatestData></LatestData>}></Route>
                <Route path="top" index element={<TopPosts></TopPosts>}></Route>
              </Route>
              <Route path="/membership" index element={<Membership></Membership>} ></Route>
          
              <Route path="/dashboard" element={<PrivateRoute><DashboardRoot></DashboardRoot></PrivateRoute>}>
                <Route path="/dashboard" index element={<OverviewPage></OverviewPage>}></Route>
                <Route path='products' index element={<PrivateRoute><ProductsPage></ProductsPage></PrivateRoute>} ></Route>
                <Route path='users' index element={<UsersPage></UsersPage>}></Route>
				        <Route path='sales' index element={<SalesPage></SalesPage>}></Route>
				        <Route path='orders' index element={<OrdersPage></OrdersPage>}></Route>
				        <Route path='analytics' index  element={<AnalyticsPage></AnalyticsPage>} ></Route>
				        <Route path='settings' index element={<SettingsPage></SettingsPage>}></Route>
              </Route>
            </Route> 
          </Routes>
        </QueryClientProvider>
      </NextThemesProvider>
    </NextUIProvider>
  </BrowserRouter>
);
