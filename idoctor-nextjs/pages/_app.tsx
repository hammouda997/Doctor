import "react-datepicker/dist/react-datepicker.css";
import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {Roboto_Flex} from "next/font/google";
import {ColorModeScript, ColorModeProvider} from "@chakra-ui/color-mode";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import {AppContext} from "@/components/AppContext";
import {api, resetAuthToken} from "api";
import {useState, useEffect} from "react";
import Loading from "@/components/Loading";

const roboto = Roboto_Flex({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
  display: "block",
  variable: "--font-roboto",
});

export default function App({Component, pageProps}: AppProps) {
  const [initiated, setInitiated] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const resetAuthTokenOnReload = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await api.get("/user/by-token", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const user = response.data;

          if (user.accessToken) {
            resetAuthToken(user.accessToken);
            setIsAuthenticated(true);
            setInitiated(true);
          }
        } catch (err) {
          console.log(err);
          resetAuthToken();
          setInitiated(true);
        }
      }
    };
    resetAuthTokenOnReload();
  }, []);

  return (
    <main className={`${roboto.variable} font-sans`}>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      <ColorModeProvider>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
        />
        <ColorModeScript
          initialColorMode="system"
          key="chakra-ui-no-flash"
          storageKey="chakra-ui-color-mode"
        />
        {initiated ? (
          <AppContext.Provider
            value={{
              isAuthenticated,
              setIsAuthenticated,
              setInitiated,
            }}
          >
            <Component {...pageProps} />
          </AppContext.Provider>
        ) : (
          <Loading />
        )}
      </ColorModeProvider>
    </main>
  );
}
