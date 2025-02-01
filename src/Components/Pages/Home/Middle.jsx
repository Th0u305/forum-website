import React, { useContext } from "react";
import "animate.css";
import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Image,
} from "@heroui/react";
import { Outlet } from "react-router";
import { AuthContext } from "../../Context/ContextProvider";
import FiltersCard from "./FiltersCard";
import FiltersCards2 from "./FiltersCards2";
import {
  FaEnvelopeOpen,
  FaFlag,
  FaImage,
  FaListUl,
  FaPaperPlane,
  FaPoll,
  FaQuestion,
  FaRegCalendarMinus,
  FaRegLifeRing,
  FaRegSave,
  FaSmileWink,
  FaVideo,
} from "react-icons/fa";
import { Ellipsis, HelpCircle } from "lucide-react";
import Swal from "sweetalert2";
import { FaDeleteLeft } from "react-icons/fa6";

export default function Middle() {
  const { user } = useContext(AuthContext);

  const showPopUp = () => {
    Swal.fire({
      title: "Upload your file",
      input: "textarea",
      inputPlaceholder: "Share your thoughts ...",

      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
      html: `
          <div>
            <div
              class="relative h-48 rounded-lg border-2 border-blue-500 bg-gray-50 flex justify-center items-center"
            >
              <div class="absolute flex flex-col items-center">
                <img
                  alt="File Icon"
                  class="mb-3"
                  src="https://img.icons8.com/dusk/64/000000/file.png"
                />
                <span class="block text-gray-500 font-semibold"
                  >Drag &amp; drop your files here</span
                >
                <span class="block text-gray-400 font-normal mt-1"
                  >or click to upload</span
                >
              </div>
          
              <input
                name=""
                class="h-full w-full opacity-0 cursor-pointer"
                type="file"
              />
            </div>
          </div>
        `,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Submit",
    });
  };
  return (
    <div className="space-y-5">
      <Card className="hidden sm:grid sm:grid-cols-2 rounded-lg justify-items-center content-center gap-5 md:grid-cols-4 overflow-visible p-4">
        <FiltersCard></FiltersCard>
      </Card>
      <div className="space-y-5 sm:hidden">
        <FiltersCards2 />
      </div>

      <Card>
        <form
          className="flex flex-row gap-2 px-5 mt-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <Image
            alt="Card background"
            className="rounded-full w-8 h-8 object-cover"
            src={
              user?.photoURL ||
              user?.image ||
              "https://res.cloudinary.com/dmegxaayi/image/upload/v1737414981/d1peu0xv4p0v43sfpfmt.png"
            }
          />
          <CardBody className="bg-[#262629] w-1 relative rounded-r-lg rounded-bl-lg">
            <textarea
              required
              name="comment"
              className="bg-inherit text-blue-300 placeholder:text-blue-300 resize-none w-[85%] border-none focus:border-none active:border-none outline-none"
              rows={1}
              placeholder="Share your thoughts . . . ."
            />
            <button type="submit">
              <FaPaperPlane className="absolute z-20 right-5 top-4 text-xl cursor-pointer active:scale-90 ease-in-out duration-200"></FaPaperPlane>
            </button>
          </CardBody>
        </form>
        <CardBody className="w-[78%] sm:w-[75%] md:w-[80%] xl:w-[85%] flex flex-row flex-wrap gap-2 mx-auto">
          <Button className="min-w-0 h-7 rounded-lg px-3" onPress={showPopUp}>
            <FaImage className="text-green-400 text-lg" />
            Photo
          </Button>
          <Button className="min-w-0 h-7 rounded-lg px-3" onPress={showPopUp}>
            <FaVideo className="text-blue-400 text-lg" />
            Video
          </Button>
          <Button className="min-w-0 h-7 rounded-lg px-3" onPress={showPopUp}>
            <FaRegCalendarMinus className="text-violet-400 text-lg" />
            Event
          </Button>
          <Button className="min-w-0 h-7 rounded-lg px-3" onPress={showPopUp}>
            <FaSmileWink className="text-lg text-yellow-400" />
            Feeling/Activity
          </Button>

          <Dropdown className="rounded-lg" backdrop="blur">
            <DropdownTrigger>
              <Button className="min-w-0 h-7 rounded-lg px-1">
                <Ellipsis />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" variant="faded">
              <DropdownItem textValue="ff" key="new">
                <FaPoll className="inline-flex mr-3 text-blue-400 text-lg" />{" "}
                Create a poll
              </DropdownItem>
              <DropdownItem textValue="ss" key="copy">
                <FaQuestion className="inline-flex mr-3 text-yellow-400 text-lg" />{" "}
                Ask a question
              </DropdownItem>
              <DropdownItem textValue="w" key="edit">
                <HelpCircle className="inline-flex mr-3 text-red-500 text-lg" />{" "}
                Help
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardBody>
      </Card>

      <div className="mx-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
