"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ConsultForm from "./ConsultForm";

function FloatingUPI() {
  return (
    <mesh position={[0, 0, 0]}>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <meshStandardMaterial color="#00eaff" metalness={0.7} roughness={0.2} />
    </mesh>
  );
}

export default function Consult() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#232526] via-[#414345] to-[#00eaff] p-8 overflow-hidden">
      {/* 3D Animated UPI Ring */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[2, 2, 2]} intensity={1} />
          <FloatingUPI />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        </Canvas>
      </div>
      <main className="z-10 w-full max-w-md sm:max-w-lg mx-auto">
        <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} className="glassmorphism p-4 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-lg w-full">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white text-center mb-4 flex items-center justify-center gap-2">
            Book Your Consultation <span className="animate-bounce">💸</span>
          </h1>
          <p className="text-white/80 text-center mb-4 sm:mb-6 text-sm sm:text-base">Fill out the form below and upload your UPI payment screenshot to get started! 🚀</p>
          <ConsultForm />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-6 sm:mt-8 text-center text-white/80 text-xs sm:text-base">
          <span className="text-xl sm:text-2xl">📞</span> Need help? <a href="https://wa.me/919999999999" className="underline">WhatsApp Akash</a>
        </motion.div>
      </main>
    </div>
  );
}
