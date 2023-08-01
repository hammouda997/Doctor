import Link from "next/link";
import {useRouter} from "next/router";
import Icon from "@/components/Icon";

import {navigation} from "@/constants/navigation";
import {twMerge} from "tailwind-merge";

type MenuProps = {
  visible?: boolean;
};

const Menu = ({visible}: MenuProps) => {
  const router = useRouter();

  return (
    <>
      <div className="-mx-4 mb-10">
        {navigation.map((link: any, index: number) => (
          <Link
            className={twMerge(
              `flex items-center h-9.5 mb-2 px-4 text-sm text-white fill-white font-bold last:mb-0 transition-colors hover:bg-n-2 ${
                router.pathname === link.url &&
                "bg-n-2 text-purple-1 fill-purple-1"
              } ${visible ? "text-sm" : "xl:text-0"}`
            )}
            href={link.url}
            key={index}
          >
            <Icon
              className={`mr-3 fill-inherit ${visible ? "mr-3" : "xl:mr-0"}`}
              name={link.icon}
            />
            {link.title}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Menu;
