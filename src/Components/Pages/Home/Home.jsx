import LeftSideBar from "./LeftSideBar";
import Middle from "./Middle";
import CardText from "./CardText";
import AnnText from "./AnnText";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <section className="sm:grid sm:grid-cols-3 lg:grid lg:grid-cols-8 lg:gap-8 mt-5 space-y-5 sm:space-y-0 gap-5">
      <Helmet>
        <title>TopicTree | Home</title>
      </Helmet>
      <div className="lg:col-span-2 space-y-5 h-fit">
        <div className="grid grid-cols-1 gap-5">
          <LeftSideBar></LeftSideBar>
          <AnnText></AnnText>
        </div>
        <div className="hidden sm:block lg:hidden">
          <CardText></CardText>
        </div>
      </div>
      <div className="lg:col-span-4 sm:col-span-2">
        <Middle></Middle>
      </div>
      <div className="lg:col-span-2 hidden lg:block">
        <CardText></CardText>
      </div>
    </section>
  );
};

export default Home;
