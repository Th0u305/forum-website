import { motion } from "framer-motion";
import Header from "../components/common/Header";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Card, CardHeader, CardBody, Image, Button } from "@heroui/react";
import ReportStatus from "../components/report/ReportStatus";
import useAxiosMergeReport from "../../../../Hooks/useAxiosMergedReport";
import { Helmet } from "react-helmet-async";

const Reported = () => {
  const [reportData, refetch] = useAxiosMergeReport();

  refetch();

  return (
    <div className="flex-1 relative z-10 bg-gray-900">
      <Helmet>
        <title>Dashboard | Reports</title>
      </Helmet>
      <Header title={"Reported Comments and Posts"} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 h-screen space-y-10">
        <ReportStatus reportData={reportData} refetch={refetch}></ReportStatus>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {reportData.map((item, index) => (
            <motion.div
              className=""
              key={index}
              whileHover={{
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full ">
                <CardBody className="overflow-visible ">
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-3">
                    <h4 className="font-bold text-medium">
                      Report Category: {item?.reportOption}
                    </h4>
                    <div>
                      <p className="text-sm">
                        Reported user:{" "}
                        {item?.author?.username || item?.author?.name}
                      </p>
                      <p className="text-sm">
                        Reported Email: {item?.author?.email}
                      </p>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p className="max-w-md">
                      Report description: {item?.reportDetails}
                    </p>
                  </CardBody>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};
export default Reported;
