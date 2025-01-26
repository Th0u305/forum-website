import { Card, CardBody, Button } from "@heroui/react";
import React from "react";

const CardText = () => {
  return (
    <Card className="rounded-lg">
      <CardBody className="space-y-5">
        <h1>
          Tired of scrolling through the same posts? When you create an account
          you’ll always come back to where you left off. With an account you can
          also be notified of new replies, save bookmarks, and use likes to
          thank others. We can all work together to make this community great.
          heart
        </h1>
        <Button color="primary" size="lg" className="rounded-lg" href="/login" variant="flat">
          Login
        </Button>
      </CardBody>
    </Card>
  );
};

export default CardText;
