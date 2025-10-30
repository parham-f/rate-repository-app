import { useEffect } from "react";
import { BackHandler, Platform } from "react-native";
import { useNavigate, useLocation } from "react-router-native";

export default function AndroidHardwareBack() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (Platform.OS !== "android") return;

    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (location.pathname === "/") return false;

      navigate(-1);
      return true;
    });

    return () => sub.remove();
  }, [navigate, location.pathname]);

  return null;
}
