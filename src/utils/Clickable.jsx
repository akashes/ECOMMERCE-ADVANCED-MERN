import { motion } from "framer-motion";

export const Clickable = ({ children, className }) => (
  <motion.div
    className={className}
    whileTap={{ scale: 0.97 }} 
    whileHover={{ scale: 1.02 }} 
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    {children}
  </motion.div>
);