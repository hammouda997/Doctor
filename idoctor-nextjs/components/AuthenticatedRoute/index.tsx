/* eslint-disable react/display-name */
/* eslint-disable react-hooks/rules-of-hooks */
import {useRouter} from "next/router";
import type {FunctionComponent} from "react";

import {useAppContext} from "@/components/AppContext";

const AuthenticatedRoute = (WrappedComponent: FunctionComponent<any>) => {
  return (props: any) => {
    const {isAuthenticated} = useAppContext();
    const Router = useRouter();
    if (typeof window !== "undefined") {
      if (!isAuthenticated) {
        Router.push("/signin", undefined, {shallow: true});
        return null;
      }

      return <WrappedComponent {...props} />;
    }
    // If we are on server, return null
    return null;
  };
};

export default AuthenticatedRoute;
