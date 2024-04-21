import { useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useCreateMyUser } from "@/api/MyUserApi";

const AuthCallbackPage = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const { createUser } = useCreateMyUser();

  const hasCreatedUser = useRef<boolean>(false);

  useEffect(() => {
    if (user?.sub && user.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }

    navigate("/");
  }, [user, createUser, navigate]);

  return <>Loading...</>;
};

export default AuthCallbackPage;
