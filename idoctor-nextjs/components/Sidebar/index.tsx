import {useState} from "react";
import Logo from "@/components/Logo";
import Icon from "@/components/Icon";
import Menu from "./Menu";

type SidebarProps = {};

const Sidebar = ({}: SidebarProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div
      className={`fixed top-0 left-0 bottom-0 flex flex-col w-[13.75rem] pt-6 px-8 pb-4.5 bg-n-1 overflow-auto scroll-smooth xl:z-30 md:hidden ${
        visible ? "w-[13.75rem]" : "xl:w-20"
      }`}
    >
      <div className="flex justify-between items-center h-[1.625rem] mb-11">
        <Logo className={visible ? "flex" : "xl:hidden"} light />
        <button className="hidden xl:flex" onClick={() => setVisible(!visible)}>
          <Icon className="fill-white" name={visible ? "close" : "burger"} />
        </button>
      </div>
      <Menu visible={visible} />
    </div>
  );
};

export default Sidebar;
