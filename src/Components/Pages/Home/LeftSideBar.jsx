import { Accordion, AccordionItem } from "@heroui/react";
import useAxiosCategory from "../../Hooks/useAxiosCategory";
import { NavLink } from "react-router";
import useAxiosTags from "../../Hooks/useAxiosTags";
import { List, Tags } from "lucide-react";



export default function LeftSideBar() {
  const [category] = useAxiosCategory();
  const [tags] = useAxiosTags();

  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-medium",
    trigger:
      "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2",
  };

  return (
    <Accordion
    // defaultExpandedKeys={["1"]}
      className="p-2 flex flex-col gap-1 w-ful rounded-lg"
      itemClasses={itemClasses}
      showDivider={false}
      variant="shadow"
    >
      <AccordionItem
        key="1"
        aria-label="Categories"
        startContent={<List className="text-green-500"></List>}
        title="Categories"
      >
        <div className="space-y-3 mb-5 mt-5 w-[70%] mx-auto max-h-96 overflow-y-scroll">
          {category?.map((item) => (
            <NavLink className="flex" key={item?._id}>
              {item?.category}
            </NavLink>
          ))}
        </div>
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="Tags"
        startContent={<Tags className="text-blue-500"/>}
        title="Tags"
      >
        <div className="space-y-3 mb-5 mt-5 w-[70%] mx-auto max-h-96 overflow-y-scroll">
          {tags?.map((item) => (
            <NavLink className="flex" key={item?._id}>
              {item?.tags}
            </NavLink>
          ))}
        </div>
      </AccordionItem>
    </Accordion>
  );
}
