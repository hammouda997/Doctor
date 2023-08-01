import {useColorMode} from "@chakra-ui/color-mode";
import Head from "next/head";
import Logo from "@/components/Logo";
import Image from "@/components/Image";
import SignIn from "../templates/SignIn";
import {appConfig} from "@/constants/config";
const LoginPage = () => {
  return (
    <>
      <Head>
        <title>{appConfig.title}</title>
      </Head>
      <div className="relative overflow-hidden">
        <div className="relative z-3 flex flex-col max-w-[75rem] min-h-screen mx-auto px-7.5 py-12 xls:px-20 lg:px-8 md:px-6 md:py-8">
          <div className="flex flex-col grow max-w-[27.31rem] lg:max-w-[25rem]">
            <Logo className="w-[6.25rem]" />
            <div className="my-auto py-12">
              <SignIn />
            </div>
          </div>
        </div>
        <div className="absolute -z-1 inset-0 overflow-hidden pointer-events-none">
          <div className="absolute z-1 inset-0 bg-n-2 opacity-0 dark:opacity-80"></div>
          <div className="absolute top-[50%] left-[25vw] -translate-y-1/2 w-[85rem] xl:w-[60rem] lg:left-[50vw] md:-top-[25%] md:-left-[30%] md:translate-y-0 md:w-[30rem]">
            <Image
              className=""
              src="/images/bg.svg"
              width={1349}
              height={1216}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
