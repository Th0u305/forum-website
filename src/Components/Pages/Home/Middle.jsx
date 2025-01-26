import useAxiosCategory from "../../Hooks/useAxiosCategory";
import useAxiosTags from "../../Hooks/useAxiosTags";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { Card, Tab, Tabs } from "@heroui/react";
import { Outlet, useLocation } from "react-router";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Context/ContextProvider";

export default function Middle() {
  const [tags] = useAxiosTags();
  const [category] = useAxiosCategory();
  const { pathname } = useLocation();
  const axiosPublic = useAxiosPublic();
  const { setSearchData } = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);

  // const filterUser = users?.users?.find((item) => item?.email === user?.email);

  const options = tags.map((item) => ({
    value: item._id,
    label: item.tags,
  }));
  const options2 = category.map((item) => ({
    value: item._id,
    label: item.category,
  }));

  const options3 = [
    { value: "chocolate", label: "Popularity " },
    { value: "strawberry", label: "Disliked" },
  ];

  let tabs = [
    {
      id: "Latest",
      label: "Latest",
      href: "latest",
    },
    {
      id: "Top",
      label: "",
      href: "#",
    },
    {
      id: "Top1",
      label: "Top",
      href: "top",
    },
  ];



  // Handle selection change
  const handleChange = (option) => {
    setSelectedOption(option);
  };

  const handleChange2 = (option) => {
    setSelectedOption2(option);
  };

  const handleChange3 = (option) => {
    setSelectedOption3(option);

    axiosPublic
      .post(`/posts/popularity?filter=${option.label}`)
      .then((res) => {
        setSearchData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    axiosPublic
      .get(
        `/mergedAllData?filter=${
          selectedOption?.label || selectedOption2?.label
        }`
      )
      .then((res) => {
        setSearchData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedOption, selectedOption2]);

  return (
    <div className="space-y-5">
      <Card className="rounded-lg grid grid-cols-1 justify-items-center content-center gap-5 py-5 md:grid-cols-4 md:py-5 md:px-2 xl:py-11 lg:p-6 overflow-visible xl:justify-items-start">
        <div className="w-fit z-30 md:col-span-2 mx-auto">
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
                borderRadius: "0.5rem", // rounded-lg equivalent
                boxShadow: "none",
                transition: "all 0.3s ease", // Smooth transition for focus and hover
                width: "11.5rem",
                cursor: "pointer",
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
                borderRadius: "0.5rem", // rounded-lg equivalent for dropdown
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

        <div className="w-44 z-30 md:col-span-2 mx-auto">
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
                borderRadius: "0.5rem", // rounded-lg equivalent
                boxShadow: "none",
                transition: "all 0.3s ease", // Smooth transition for focus and hover
                width: "11.5rem",
                cursor: "pointer",
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
                borderRadius: "0.5rem", // rounded-lg equivalent for dropdown
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

        <div className="w-[11.5rem] xl:mt-0 border-2 mx-auto border-gray-400 rounded-lg md:col-span-2">
          <Tabs
            items={tabs}
            selectedKey={pathname}
            // onSelectionChange={setSelected}
            aria-label="Tabs variants"
            variant="underlined"
            className="w-full gap-5"
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

        <div className="md:col-span-2 z-20 mx-auto">
          <Select
            options={options3} // Pass custom options
            value={selectedOption3} // Bind selected value
            onChange={handleChange3} // Handle change
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "inherit",
                color: "inherit",
                border: "2px solid gray",
                borderRadius: "0.5rem", // rounded-lg equivalent
                boxShadow: "none",
                transition: "all 0.3s ease", // Smooth transition for focus and hover
                width: "11.5rem",
                cursor: "pointer",
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
                borderRadius: "0.5rem", // rounded-lg equivalent for dropdown
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
      </Card>

      {/* <Card>
        <CardBody>
          <CardBody className="flex flex-row gap-5">
            <Image
              alt="Card background"
              className="rounded-full w-12 h-12 object-cover"
              src={user?.photoURL}
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
