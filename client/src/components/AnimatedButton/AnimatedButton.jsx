import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
const AnimatedButton = ({ 
  prmpt, handleSubmit
}) => {
  return (
    <AnimatePresence>
      {prmpt && (
        <motion.button
          className="frm-btn"
          initial={{ opacity: 0, y: 50, scale: 0.8 }} // شروع از پایین و کوچک
          animate={{ opacity: 1, y: 0, scale: 1 }} // انیمیشن به حالت نرمال
          exit={{ opacity: 0, y: 50, scale: 0.8 }} // هنگام خروج
          transition={{
            duration: 0.5, // مدت زمان انیمیشن
            ease: [0.42, 0, 0.58, 1], // شتاب‌بندی زیبا
          }}
          style={{
            background: "#3a3f3e",
            border: "none",
            borderRadius: "10px",
            color: "#fff",
            padding: "10px 20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src="/up-right-arrow.png" alt="Arrow" style={{ marginRight: "10px" }} />
          Send Message
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default AnimatedButton