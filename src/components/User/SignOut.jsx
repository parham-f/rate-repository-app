import useSignOut from "../../hooks/useSignOut";
import { useNavigate } from "react-router-native";
import { useEffect } from "react";

const SignOut = () => {
  const navigate = useNavigate();
  useSignOut();

  useEffect(() => {
    navigate("/");
  }, [navigate]);
};

export default SignOut;
