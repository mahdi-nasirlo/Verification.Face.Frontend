import { Variant, Variants } from "framer-motion";

const changeTabVariant: Variants = {
  animation: {
    x: 0,
    opacity: 1,
  },
  initial: {
    x: 60,
    opacity: 0,
  },
  exit: {
    x: -60,
    opacity: 0,
  },
};

export { changeTabVariant };
