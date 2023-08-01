import {useState} from "react";
import {useScrollPosition} from "@n8tb1t/use-scroll-position";
import {useRouter} from "next/router";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import Create from "./Create";
import Apps from "./Apps";
import ToggleTheme from "../Footer/ToggleTheme";

type HeaderProps = {
  back?: boolean;
  title?: string;
};

const Header = ({back, title}: HeaderProps) => {
  const [headerStyle, setHeaderStyle] = useState<boolean>(false);
  const router = useRouter();

  useScrollPosition(({currPos}) => {
    setHeaderStyle(currPos.y <= -1);
  });

  return (
    <header
      className={`fixed top-0 right-0 left-[18.75rem] z-20 border-b border-n-1 xl:left-20 md:left-0 md:relative dark:border-white ${
        headerStyle ? "bg-background dark:bg-n-2 md:!bg-transparent" : ""
      }`}
    >
      <div className="flex items-center max-w-[90rem] m-auto w-full h-18 px-16 2xl:px-8 lg:px-6 md:px-5">
        {back && (
          <button
            className="btn-stroke btn-square btn-medium shrink-0 mr-6 2xl:mr-4 md:!w-6 md:h-6 md:mr-3"
            onClick={() => router.back()}
          >
            <Icon name="arrow-prev" />
          </button>
        )}
        {title && (
          <div className="mr-4 text-h3 truncate md:mr-2 md:text-h4">
            {title}
          </div>
        )}
        <div className="flex items-center shrink-0 ml-auto">
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
};

export default Header;
