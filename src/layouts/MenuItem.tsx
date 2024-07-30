import { LucideProps } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { motion } from "framer-motion";
import { topColumnItemVariants } from "../utils/variants";
import { Typography } from "antd";

export interface TMenuItem {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
  children: React.ReactNode;
  href?: string;
  delay?: number;
  disabled?: boolean;
}

const MenuItem = ({
  children,
  icon,
  delay = 0.3,
  href = "#",
  disabled = false,
}: TMenuItem) => {
  const router = useRouter();

  const Icon = icon;

  return (
    <motion.div
      onClick={() => router.push(href)}
      transition={{ duration: 0.4, delay }}
      initial="initial"
      animate="animation"
      variants={topColumnItemVariants}
    >
      <span
        className={`text-center flex flex-col gap-5 text-base font-normal cursor-pointer hover:scale-105 transition-all duration-200 ${
          disabled && "opacity-25"
        }`}
      >
        <Icon className="mx-auto size-6" />
        <Typography className="text-center">{children}</Typography>
      </span>
    </motion.div>
  );
};

export { MenuItem };
