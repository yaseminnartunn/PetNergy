import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const emojis = ['🎉', '⭐', '💖', '✨', '🌟', '🎊', '💫', '🔥'];

export default function ConfettiEffect({ show }) {
  if (!show) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 pointer-events-none z-50">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -20,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              y: window.innerHeight + 20,
              rotate: Math.random() * 720 - 360,
              opacity: 0,
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 0.5,
              ease: 'easeIn',
            }}
          >
            {emojis[Math.floor(Math.random() * emojis.length)]}
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}