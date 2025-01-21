import useAxiosCategory from "../../Hooks/useAxiosCategory";
import useAxiosTags from "../../Hooks/useAxiosTags";
import React, { useContext, useState } from "react";
import Select from "react-select";
import { Card, CardBody, Image, Tab, Tabs, Textarea } from "@heroui/react";
import { Outlet, useLocation } from "react-router";
import { DataContextProvider } from "../../Context/DataContext";
import CardText from "./CardText";

export default function Middle() {
  const [tags] = useAxiosTags();
  const [category] = useAxiosCategory();
  // const { selected, setSelected } = useContext(DataContextProvider);
  // const [selected, setSelected] = React.useState();
  const { pathname } = useLocation();

  const options = tags.map((item) => ({
    value: item._id,
    label: item.tags,
  }));
  const options2 = category.map((item) => ({
    value: item._id,
    label: item.category,
  }));

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);

  // Handle selection change
  const handleChange = (option) => {
    setSelectedOption(option);
  };
  const handleChange2 = (option) => {
    setSelectedOption2(option);
  };

  let tabs = [
    {
      id: "Latest",
      label: "Latest",
      href: "latest",
    },
    {
      id: "Top",
      label: "Top",
      href: "top",
    },
  ];

  return (
    <div className="space-y-5 ">
      <Card className="grid grid-cols-2 w-full justify-items-center md:grid-cols-4 xl:grid-cols-3 p-3 gap-3 md:py-5 md:px-2 xl:py-11 lg:p-6 overflow-visible xl:justify-items-start">
        <div className="w-fit z-30 md:col-span-2 xl:col-span-1">
          <Select
            options={options2} // Pass custom options
            value={selectedOption2} // Bind selected value
            onChange={handleChange2} // Handle change
            placeholder="Search Category"
            isSearchable // Enable search functionality
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "inherit",
                color: "inherit",
                border: "2px solid gray",
                borderRadius: "0.5rem", // rounded-2xl equivalent
                boxShadow: "none",
                transition: "all 0.3s ease", // Smooth transition for focus and hover
                width: "11.5rem",
              }),
              option: (base, { isFocused, isSelected }) => ({
                ...base,
                backgroundColor: isFocused ? "inherit" : "white",
                color: isFocused ? "#007bff" : "black",
                textAlign: "left",
                transition: "all 0.3s ease", // Smooth hover effect
                cursor: "pointer",
              }),
              menu: (base) => ({
                ...base,
                borderRadius: "0.5rem", // rounded-2xl equivalent for dropdown
                border: "1px solid gray",
                overflow: "hidden", // Prevents border-radius from being overridden
                transition: "opacity 0.3s ease, transform 0.3s ease", // Smooth open/close effect
                opacity: 1,
                transform: "scaleY(1)",
              }),
              menuList: (base) => ({
                ...base,
                padding: 0, // Optional: clean padding inside menu
              }),
              singleValue: (base) => ({
                ...base,
                color: "inherit",
              }),
              input: (base) => ({
                ...base,
                color: "revert", // Set search input text color to white
              }),
            }}
          />
        </div>

        <div className="w-44 z-30 md:col-span-2 xl:col-span-1">
          <Select
            options={options} // Pass custom options
            value={selectedOption} // Bind selected value
            onChange={handleChange} // Handle change
            placeholder="Search Tags"
            isSearchable // Enable search functionality
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "inherit",
                color: "inherit",
                border: "2px solid gray",
                borderRadius: "0.5rem", // rounded-2xl equivalent
                boxShadow: "none",
                transition: "all 0.3s ease", // Smooth transition for focus and hover
                width: "11.5rem",
              }),
              option: (base, { isFocused, isSelected }) => ({
                ...base,
                backgroundColor: isFocused ? "inherit" : "white",
                color: isFocused ? "#007bff" : "black",
                textAlign: "left",
                transition: "all 0.3s ease", // Smooth hover effect
                cursor: "pointer",
              }),
              menu: (base) => ({
                ...base,
                borderRadius: "0.5rem", // rounded-2xl equivalent for dropdown
                border: "1px solid gray",
                overflow: "hidden", // Prevents border-radius from being overridden
                transition: "opacity 0.3s ease, transform 0.3s ease", // Smooth open/close effect
                opacity: 1,
                transform: "scaleY(1)",
              }),
              menuList: (base) => ({
                ...base,
                padding: 0, // Optional: clean padding inside menu
              }),
              singleValue: (base) => ({
                ...base,
                color: "inherit",
              }),
              input: (base) => ({
                ...base,
                color: "revert", // Set search input text color to white
              }),
            }}
          />
        </div>

        <div className="col-span-full md:col-span-4 xl:col-span-1 md:mt-3 xl:mt-0 border-2 border-gray-400 rounded-lg">
          <Tabs
            items={tabs}
            selectedKey={pathname}
            // onSelectionChange={setSelected}
            aria-label="Tabs variants"
            variant="underlined"
          >
            {(item) => (
              <Tab
                key={item.id}
                title={item.label}
                href={`/${item.href}`}
              ></Tab>
            )}
          </Tabs>
        </div>
      </Card>
      {/* 
      <Card>
        <CardBody>
          <CardBody className="flex flex-row gap-5">
            <Image
              alt="Card background"
              className="rounded-full w-12 h-12 object-cover"
              src="https://res.cloudinary.com/dmegxaayi/image/upload/v1736827009/pexels-olly-3785079_irm1bg.jpg"
            />
            <Textarea
              isClearable
              className="max-w-xs border-none"
              placeholder="Share your thoughts..."
            />
          </CardBody>
          <CardBody>
            
          </CardBody>
        </CardBody>
      </Card> */}
      <div className="mx-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
