import { Card, CardBody, CardHeader } from "@heroui/react";
import React from "react";
import useAxiosAnn from "../../Hooks/useAxiosAnn";
import { useEffect, useState } from "react";

const AnnText = () => {
  const [ann, refetch] = useAxiosAnn();
  const [announcement, setAnnouncement] = useState([]);

  useEffect(() => {
    setAnnouncement(ann?.pop());
  }, [ann])
  
  return (
    <Card className="rounded-lg">
      <CardHeader className="flex flex-col gap-8">
        <h4 className="font-bold text-yellow-600 text-large mx-auto">Latest Announcements</h4>
        <p className="max-w-md break-words break-all">{announcement?.announcements}</p>
        <img className="w-24 h-24 object-cover" src={announcement?.image} alt="" />
      </CardHeader>
      <CardBody></CardBody>
    </Card>
  );
};

export default AnnText;
