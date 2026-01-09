import { motion } from "framer-motion";

export const ClickableCard = ({ children, className }) => (
  <motion.div
    className={className}
    whileTap={{ scale: 0.99 }} 
    whileHover={{ scale: 1.01 }} 
    transition={{ type: "spring", stiffness: 100, damping: 3 }}
  >
    {children}
  </motion.div>
);