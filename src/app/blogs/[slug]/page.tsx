"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function FloatingDetailShape() {
  return (
    <mesh position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.2, 0]} />
      <meshStandardMaterial color="#43cea2" metalness={0.7} roughness={0.2} />
    </mesh>
  );
}

// Example blog data (replace with MongoDB fetch)
const blog = {
  title: "How to File Your ITR Easily",
  content: "<p>Filing your ITR online is simple! Just follow these steps...</p><iframe width='100%' height='315' src='https://www.youtube.com/embed/2Xc9gXyf2G4' title='YouTube video' frameborder='0' allowfullscreen></iframe>",
  date: "2025-07-01",
  tags: ["ITR", "Finance"],
  category: "ITR Filing",
  emoji: "📄",
  embeds: {
    instagram: "https://www.instagram.com/p/Cu1QwQwJ1/",
    linkedin: "https://www.linkedin.com/posts/akashconsulting/",
  },
  related: [
    { title: "PAN Card: Common Mistakes", slug: "pan-card-mistakes" },
    { title: "Business Start Guide", slug: "business-start-guide" },
  ],
};

export default function BlogDetail() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#43cea2] via-[#185a9d] to-[#ff6e7f] p-8 overflow-hidden">
      {/* 3D Animated Detail Shape */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[2, 2, 2]} intensity={1} />
          <FloatingDetailShape />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        </Canvas>
      </div>
      <main className="z-10 w-full max-w-3xl mx-auto">
        <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} className="glassmorphism p-8 rounded-2xl shadow-2xl backdrop-blur-lg mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-2 flex items-center justify-center gap-2">
            {blog.title} <span className="animate-bounce">{blog.emoji}</span>
          </h1>
          <div className="flex gap-2 justify-center mb-2">
            {blog.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 rounded-full bg-[#43cea2]/30 text-xs text-white">#{tag}</span>
            ))}
          </div>
          <div className="text-white/80 text-sm text-center mb-4">{blog.date} • {blog.category}</div>
          {/* Blog Content with embeds */}
          <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
          <div className="flex gap-4 justify-center mt-6">
            <a href={blog.embeds.instagram} target="_blank" rel="noopener" className="hover:scale-110 transition"><span className="text-3xl">📸</span></a>
            <a href={blog.embeds.linkedin} target="_blank" rel="noopener" className="hover:scale-110 transition"><span className="text-3xl">💼</span></a>
          </div>
        </motion.div>
        {/* Related Posts */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-8 text-center text-white/80">
          <h2 className="text-xl font-bold mb-2">Related Posts 🔗</h2>
          <div className="flex flex-col gap-2 items-center">
            {blog.related.map((rel) => (
              <a key={rel.slug} href={`/blogs/${rel.slug}`} className="underline text-white/90 hover:text-[#43cea2] transition text-lg">{rel.title}</a>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
