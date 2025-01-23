import { Card, CardBody } from "@heroui/react";
import LeftSideBar from "./LeftSideBar";
import Middle from "./Middle";
import CardText from "./CardText";
import AnnText from "./AnnText";
import { Helmet } from 'react-helmet-async';


const Home = () => {  
  return (
    <section className="md:grid md:grid-cols-3 lg:grid lg:grid-cols-8 lg:gap-8 mt-12 space-y-5 md:space-y-0 gap-5">
      <Helmet>
        <title>TopicTree | Home</title>
      </Helmet>
      <div className="lg:col-span-2 space-y-5">
        <div className="space-y-5">
          <LeftSideBar></LeftSideBar>
          <AnnText></AnnText>
        </div>
        <div className="hidden md:block lg:hidden">
          <CardText></CardText>
        </div>
      </div>
      <div className="lg:col-span-4 md:col-span-2">
        <Middle></Middle>
      </div>
      <div className="lg:col-span-2 hidden lg:block">
        <CardText></CardText>
      </div>
    </section>
  );
};

export default Home;
