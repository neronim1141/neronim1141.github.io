import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

export const Main = ({ children }: PropsWithChildren) => (
  <motion.div
    className="mt-2 sm:mt-8 lg:mt-12 flex flex-grow flex-col gap-8"
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 100, opacity: 0 }}
  >
    {children}
  </motion.div>
);
