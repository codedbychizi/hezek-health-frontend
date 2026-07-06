import { motion } from 'framer-motion';

/**
 * Standardizes the "fade up as it scrolls into view" animation so every
 * section across the site moves the same way. `once: true` means it plays
 * the first time only. `amount: 0.2` means it fires as soon as 20% of the
 * element is visible — simpler and more reliable across screen sizes than
 * a fixed pixel margin, which could leave some sections stuck invisible if
 * they never crossed that exact offset.
 */
export default function FadeIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}