"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function FloatingBlogCube() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial color="#ff6e7f" metalness={0.7} roughness={0.2} />
    </mesh>
  );
}

const blogs = [
  {
    title: "How to File Your ITR Easily",
    summary: "Step-by-step guide to filing your Income Tax Return online.",
    category: "ITR Filing",
    emoji: "📄",
    thumbnail: "https://source.unsplash.com/400x200/?tax,finance",
    date: "2025-07-01",
    tags: ["ITR", "Finance"],
    slug: "file-itr-easily"
  },
  {
    title: "PAN Card: Common Mistakes",
    summary: "Avoid these mistakes when applying for your PAN card.",
    category: "PAN Help",
    emoji: "🪪",
    thumbnail: "https://source.unsplash.com/400x200/?pan,card",
    date: "2025-06-20",
    tags: ["PAN", "Tips"],
    slug: "pan-card-mistakes"
  },
  // Add more blog objects here
];

export default function Blogs() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#ff6e7f] via-[#bfe9ff] to-[#43cea2] p-2 sm:p-6 md:p-10 overflow-hidden">
      {/* 3D Animated Blog Cube */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[2, 2, 2]} intensity={1} />
          <FloatingBlogCube />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        </Canvas>
      </div>
      <main className="z-10 w-full max-w-4xl mx-auto">
        <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} className="glassmorphism p-4 sm:p-8 rounded-2xl shadow-2xl mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-4 flex items-center justify-center gap-2">
            Explore Our Blogs <span className="animate-bounce">📝</span>
          </h1>
          <p className="text-white/80 text-center mb-6">Tips, guides, and insights for your financial and business journey! 🌟</p>
          {/* Search/Filter UI */}
          <input type="text" placeholder="Search blogs by category..." className="w-full p-3 rounded-lg bg-white/20 text-white placeholder:text-white/60 mb-4" />
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {blogs.map((blog) => (
            <motion.a
              key={blog.slug}
              href={`/blogs/${blog.slug}`}
              whileHover={{ scale: 1.04, boxShadow: "0 8px 32px #ff6e7f55" }}
              className="rounded-2xl overflow-hidden shadow-xl bg-white/20 glassmorphism flex flex-col transition-all duration-300 hover:scale-105"
            >
              <img src={blog.thumbnail} alt={blog.title} className="w-full h-32 sm:h-40 object-cover" />
              <div className="p-4 sm:p-6 flex flex-col gap-2">
                <span className="text-2xl">{blog.emoji}</span>
                <span className="text-lg sm:text-xl font-bold text-white">{blog.title}</span>
                <span className="text-white/80 text-sm sm:text-base">{blog.summary}</span>
                <span className="text-xs text-white/60">{blog.date} • {blog.category}</span>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 rounded-full bg-[#ff6e7f]/30 text-xs text-white">#{tag}</span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </main>
    </div>
  );
}
