import { useTheme } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastProvider = () => {
  const { theme = "dark" } = useTheme();
  return (
    <ToastContainer
      autoClose={500}
      position="bottom-left"
      theme={theme === "dark" ? "dark" : "light"}
    />
  );
};
