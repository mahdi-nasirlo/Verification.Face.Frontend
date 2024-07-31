import { Col } from "antd";
import { motion } from "framer-motion";

const CardWrapper = ({
  children,
  slug,
  delay = 0.3,
}: {
  children: React.ReactNode;
  slug: number;
  delay?: number;
}) => (
  <Col xs={24} sm={12} md={8} xl={4} key={"folder_cart_" + slug}>
    <motion.div
      key={"motion_cart_" + slug}
      className="h-full"
      transition={{ duration: 0.3, delay: delay * slug }}
      initial={{
        opacity: 0,
        x: 20,
        y: -20,
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      exit={{
        opacity: 0,
        x: -20,
        y: 20,
      }}
    >
      {children}
    </motion.div>
  </Col>
);

export { CardWrapper };
