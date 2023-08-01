import {useState} from "react";
import Field from "@/components/Field";

import {useRouter} from "next/router";
import {signIn} from "@/services/auth";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  // const {setIsAuthenticated} = useAppContext();
  const handleLogin = async () => {
    setIsLoading(true);
    if (isLoading) return;
    const response = await signIn({email, password});
    if (response?.accessToken) {
      // setIsAuthenticated(true);
      return router.push("/", undefined, {shallow: true});
    }

    router.push("/", undefined, {shallow: true});
  };

  return (
    <>
      <div className="mb-1 text-h1">{"Login"}</div>
      <div className="mb-12 text-sm text-n-2 dark:text-white/50">
        Entrez vos identifiants pour vous connecter
      </div>
      <Field
        className="mb-4.5"
        label="Email"
        type="email"
        placeholder="Enterez votre email"
        icon="email"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        required
      />
      <Field
        className="mb-6.5"
        label="mot de passe"
        type="password"
        placeholder="Enterez votre mot de passe"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
        required
      />

      <button
        onClick={handleLogin}
        className="btn-purple btn-shadow w-full h-14"
      >
        {"S'identifier"}
      </button>
    </>
  );
};

export default SignIn;
