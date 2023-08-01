import type {NextPage} from "next";
import Users from "@/templates/Users";
import AuthenticatedRoute from "@/components/AuthenticatedRoute";

const UsersPage: NextPage = () => {
  return <Users />;
};

export default AuthenticatedRoute(UsersPage);
