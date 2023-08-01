import AuthenticatedRoute from "@/components/AuthenticatedRoute";
import HomePage from "@/templates/Dashboard";
import type {NextPage} from "next";

const Home: NextPage = () => {
  return <HomePage />;
};

export default AuthenticatedRoute(Home);
