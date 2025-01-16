import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Root from "./Components/Root/Root";
import Home from "./Components/Parts/Home/Home";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Membership from "./Components/Pages/Membership/Membership";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Posts from "./Components/Parts/PostData/Posts";
import SinglePost from "./Components/Parts/SinglePost/SinglePost";
import LatestData from "./Components/Parts/LatestPost/LatestData";
import TopPosts from "./Components/Parts/TopPosts/TopPosts";
import DashboardRoot from "./Components/Parts/Dashboard/DashRoot/DashboardRoot";
import OverviewPage from "./Components/Parts/Dashboard/pages/OverviewPage";
import ProductsPage from "./Components/Parts/Dashboard/pages/ProductsPage";
import UsersPage from "./Components/Parts/Dashboard/pages/UsersPage";
import SalesPage from "./Components/Parts/Dashboard/pages/SalesPage";
import OrdersPage from "./Components/Parts/Dashboard/pages/OrdersPage";
import AnalyticsPage from "./Components/Parts/Dashboard/pages/AnalyticsPage";
import SettingsPage from "./Components/Parts/Dashboard/pages/SettingsPage";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Root></Root>}>
              <Route element={<Home></Home>}>
                <Route index element={<Posts></Posts>}></Route>
                <Route path="post/:id" index element={<SinglePost></SinglePost>}></Route>
                <Route path="latest" index element={<LatestData></LatestData>}></Route>
                <Route path="top" index element={<TopPosts></TopPosts>}></Route>
              </Route>
              <Route
                path="membership"
                index
                element={<Membership></Membership>}
              ></Route>
            </Route>
          </Routes>

          <Routes>
            <Route element={<DashboardRoot></DashboardRoot>}>
                <Route path="/dashboard" index element={<OverviewPage></OverviewPage>}></Route>
                <Route path='/dashboard/products' index element={<ProductsPage></ProductsPage>} ></Route>
                <Route path='/dashboard/users' index element={<UsersPage></UsersPage>}></Route>
				        <Route path='/dashboard/sales' index element={<SalesPage></SalesPage>}></Route>
				        <Route path='/dashboard/orders' index element={<OrdersPage></OrdersPage>}></Route>
				        <Route path='/dashboard/analytics' index  element={<AnalyticsPage></AnalyticsPage>} ></Route>
				        <Route path='/dashboard/settings' index element={<SettingsPage></SettingsPage>}></Route>
            </Route>
          </Routes>

        </QueryClientProvider>
      </NextThemesProvider>
    </NextUIProvider>
  </BrowserRouter>
);
