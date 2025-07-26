"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import BlogAdminForm from './BlogAdminForm';
import ConsultationList from './ConsultationList';
import { AuthProvider, useAuth } from './AuthContext';
import LoginForm from './LoginForm';

function FloatingAdminShape() {
  return (
    <mesh position={[0, 0, 0]}>
      <octahedronGeometry args={[1.2, 0]} />
      <meshStandardMaterial color="#ffd200" metalness={0.7} roughness={0.2} />
    </mesh>
  );
}

function AdminContent() {
  const { isAuthenticated, logout } = useAuth();
  if (!isAuthenticated) return <LoginForm />;
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#ffd200] via-[#f7971e] to-[#43cea2] p-8 overflow-hidden">
      {/* 3D Animated Admin Shape */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[2, 2, 2]} intensity={1} />
          <FloatingAdminShape />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        </Canvas>
      </div>
      <main className="z-10 w-full max-w-4xl mx-auto">
        <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} className="glassmorphism p-8 rounded-2xl shadow-2xl backdrop-blur-lg mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#232526] text-center mb-4 flex items-center justify-center gap-2">
            Admin Dashboard <span className="animate-bounce">🛡️</span>
          </h1>
          <p className="text-[#232526]/80 text-center mb-6">Manage blogs, view consultations, and control your site with futuristic style! 🚀</p>
          {/* Login Form (for demo) */}
          <form className="flex flex-col gap-4 mb-8">
            <input type="text" placeholder="Admin Username" className="p-3 rounded-lg bg-white/20 text-[#232526] placeholder:text-[#232526]/60" required />
            <input type="password" placeholder="Password" className="p-3 rounded-lg bg-white/20 text-[#232526] placeholder:text-[#232526]/60" required />
            <motion.button whileHover={{ scale: 1.05 }} type="submit" className="mt-4 px-6 py-3 rounded-full bg-[#ffd200] text-[#232526] font-bold text-lg shadow-lg hover:bg-[#f7971e] hover:text-white transition-all duration-300 border-2 border-white/20">
              Login & Manage 🔐
            </motion.button>
          </form>
          {/* Dashboard Cards (demo) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div whileHover={{ scale: 1.04 }} className="rounded-2xl p-6 bg-white/20 shadow-lg flex flex-col items-center justify-center gap-2">
              <span className="text-3xl">📝</span>
              <span className="font-bold text-lg">Add/Edit Blogs</span>
              <span className="text-xs text-[#232526]/80">Create, update, or delete blog posts</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} className="rounded-2xl p-6 bg-white/20 shadow-lg flex flex-col items-center justify-center gap-2">
              <span className="text-3xl">💬</span>
              <span className="font-bold text-lg">Consultation Submissions</span>
              <span className="text-xs text-[#232526]/80">View and filter user requests</span>
            </motion.div>
          </div>
          <BlogAdminForm />
          <ConsultationList />
          <button onClick={logout} className="mt-4 px-4 py-2 rounded bg-[#ffd200] text-[#232526] font-bold text-sm shadow hover:bg-[#f7971e]">
            Logout
          </button>
        </motion.div>
      </main>
    </div>
  );
}

export default function Admin() {
  return (
    <AuthProvider>
      <AdminContent />
    </AuthProvider>
  );
}
