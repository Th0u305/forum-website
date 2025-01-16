import { Card, CardBody } from "@nextui-org/react";
import LeftSideBar from "./LeftSideBar";
import Middle from "./Middle";

const Home = () => {
  return (
    <section className=" lg:grid lg:grid-cols-8 lg:gap-8 mt-12 space-y-5 lg:space-y-0">
      <div className="lg:col-span-2 flex justify-center lg:block">
        <LeftSideBar></LeftSideBar>
      </div>
      <div className="lg:col-span-4">
        <Middle></Middle>
      </div>
      <div className="lg:col-span-2 hidden lg:block">
        <Card>
          <CardBody>
            <h1>
              Tired of scrolling through the same posts? When you create an
              account you’ll always come back to where you left off. With an
              account you can also be notified of new replies, save bookmarks,
              and use likes to thank others. We can all work together to make
              this community great. heart
            </h1>
          </CardBody>
        </Card>
      </div>
    </section>
  );
};

export default Home;
