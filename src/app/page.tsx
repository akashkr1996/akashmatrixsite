
"use client";
import GalaxyBackground from './GalaxyBackground';
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import HomeSections from './home/HomeSections';

function FloatingSphere() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial color="#00eaff" metalness={0.8} roughness={0.15} />
    </mesh>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center font-[family-name:var(--font-inter)] bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#00eaff] overflow-hidden" style={{ WebkitFontSmoothing: 'antialiased', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Galaxy Animated Background */}
      <GalaxyBackground />
      {/* 3D Animated Sphere Background */}
      <div className="absolute inset-0 z-0 pointer-events-none w-full h-full flex items-center justify-center">
        <Canvas camera={{ position: [0, 0, 7] }} style={{ width: '100vw', height: '100vh', minHeight: '100vh' }}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[2, 2, 2]} intensity={1.2} />
          <FloatingSphere />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2.5} />
        </Canvas>
      </div>
      <main className="flex flex-col gap-8 items-center w-full z-10 px-2 sm:px-6 md:px-12">
       
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center justify-center gap-4 w-full min-h-[60vh] py-8 sm:py-16"
        >
          <span className="text-6xl sm:text-7xl md:text-8xl animate-bounce mb-2">🚀✨</span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white drop-shadow-2xl text-center w-full leading-tight tracking-tight animate-gradient-text">
            Welcome to <span className="bg-gradient-to-r from-[#ffd200] via-[#00eaff] to-[#ff6e7f] bg-clip-text text-transparent">AkashMatrix Site</span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white/80 mt-2 text-center w-full font-semibold">
            <span className="mr-2">👨‍💼</span> Futuristic Solutions for Modern India <span className="ml-2">🌌</span>
          </p>
          <div className="w-full flex justify-center">
            <iframe className="rounded-2xl shadow-2xl w-full max-w-[360px] sm:max-w-[480px] md:max-w-[560px] aspect-video border-4 border-[#ffd200]" src="https://www.youtube.com/embed/Mbm9JQ5vkSs?si=skNZuooaPDl1eF8Q" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        </motion.div>

        {/* Services Grid with Emojis & Illustrations */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 mt-6 w-full"
        >
          {[
            { name: "Career Guidance", emoji: "🪪", color: "bg-gradient-to-r from-[#00eaff] to-[#2c5364]" },
            { name: "Skill Upgrade", emoji: "📄", color: "bg-gradient-to-r from-[#ff6e7f] to-[#bfe9ff]" },
            { name: "Mock Interview", emoji: "🏢", color: "bg-gradient-to-r from-[#43cea2] to-[#185a9d]" },
            { name: "Resume Help", emoji: "📝", color: "bg-gradient-to-r from-[#ffaf7b] to-[#d76d77]" },
            { name: "Job Assistance", emoji: "🧪", color: "bg-gradient-to-r from-[#f7971e] to-[#ffd200]" },
          ].map((service, idx) => (
            <motion.div
              key={service.name}
              whileHover={{ scale: 1.08, boxShadow: "0 8px 32px #00eaff55" }}
              className={`rounded-2xl p-4 sm:p-6 text-white shadow-xl flex flex-col items-center justify-center ${service.color} glassmorphism w-full min-h-[120px] sm:min-h-[140px] md:min-h-[160px] transition-all duration-300 hover:scale-105`}
            >
              <span className="text-3xl sm:text-4xl md:text-5xl mb-2 animate-pulse">{service.emoji}✨</span>
              <span className="text-lg sm:text-xl md:text-2xl font-bold mb-1 tracking-wide">{service.name}</span>
              <span className="text-xs sm:text-sm text-white/80 flex items-center gap-1">Fast, friendly & expert help <span>🤖</span></span>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated CTA Buttons */}
        <motion.div className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="/consult"
            className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-[#ffd200] via-[#00eaff] to-[#ff6e7f] text-[#171717] font-bold text-base sm:text-lg shadow-lg hover:bg-[#2c5364] hover:text-white transition-all duration-300 border-2 border-white/20 w-full sm:w-auto text-center focus:outline-none focus:ring-2 focus:ring-[#00eaff] animate-gradient-btn"
          >
            Book Consult ✨
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="feedback"
            className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-[#00eaff] via-[#ffd200] to-[#ff6e7f] text-white font-bold text-base sm:text-lg shadow-lg hover:bg-[#ffd200] hover:text-[#171717] transition-all duration-300 border-2 border-white/20 w-full sm:w-auto text-center focus:outline-none focus:ring-2 focus:ring-white animate-gradient-btn"
          >
            Feedback 🚀
          </motion.a>
        </motion.div>

        {/* About Me Section */}
        <motion.div className="mt-12 p-4 sm:p-8 rounded-2xl glassmorphism bg-white/10 shadow-2xl max-w-xl w-full mx-auto text-center border-2 border-[#ffd200]" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">About Me <span className="text-xl sm:text-2xl">👨‍💻</span></h2>
          <b><p className="text-white/80 mb-4 text-sm sm:text-base">Hi, I'm Akash!</p></b>
          <div className="flex justify-center gap-2 sm:gap-4 mb-2">
            <a href="https://linkedin.com/in/akashkumarsharma03" target="_blank" rel="noopener" className="hover:scale-110 transition"><span className="text-l sm:text-l">💻 My LINKEDLIN</span></a>
            <a href="https://instagram.com/akashkumarsharma03" target="_blank" rel="noopener" className="hover:scale-110 transition"><span className="text-l sm:text-l">📸 MY INSTAGRAM</span></a>
          </div>
           <p > I help individuals and businesses with. Connect with me for futuristic, friendly consulting.</p><br/>
          <p> Follow us on Social media 📲</p><br/>
        <hr/><br/>
          <motion.div className="flex justify-center gap-2 sm:gap-4 mb-2 font-bold" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }}>
            <motion.a href="https://instagram.com/akashmatrix" target="_blank" rel="noopener" whileHover={{ scale: 1.2, rotate: 10 }} className="transition">
              <span className="text-xl sm:text-xl">📸 INSTAGRAM</span>
            </motion.a>
            <motion.a href="https://linkedin.com/in/akaashmatrix" target="_blank" rel="noopener" whileHover={{ scale: 1.2, rotate: -10 }} className="transition">
              <span className="text-xl sm:text-xl">💻 LINKEDLIN</span>
            </motion.a>
            <motion.a href="https://www.youtube.com/@akashmatrix" target="_blank" rel="noopener" whileHover={{ scale: 1.2, rotate: 8 }} className="transition">
              <span className="text-xl sm:text-xl">🎥 YOUTUBE</span>
            </motion.a>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2 }}>
          <HomeSections />
        </motion.div>
        {/* Contact Info Section */}
        <motion.div className="mt-8 p-4 sm:p-6 rounded-2xl glassmorphism bg-white/10 shadow-2xl max-w-xl w-full mx-auto text-center border-2 border-[#00eaff]" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4 }}>
          <h2 className="text-lg sm:text-xl font-bold text-white mb-2">Contact <span className="text-lg sm:text-2xl">📞</span></h2>
          <div className="flex flex-col gap-1 sm:gap-2 text-white/80 text-xs sm:text-sm">
            <span>Phone: <a href="tel:+919999999999" className="underline font-bold">+91 8789680417</a></span>
            <span>WhatsApp: <a href="https://chat.whatsapp.com/FCDmhERB8r62gGeS1IV5tK?mode=ac_t" className="underline font-bold">Chat Now</a></span>
            <span>Email: <a href="mailto:iamakash0326@gmail.com" className="underline font-bold">iamakash0326@gmail.com</a></span>
            <span>Location: <a href="https://maps.google.com/?q=yourlocation" className="underline font-bold">Delhi, India</a></span>
          </div>
        </motion.div>


      </main>
      <br/>
      <footer className="row-start-3 flex gap-2 sm:gap-6 flex-wrap items-center justify-center z-10 text-white/80 text-xs sm:text-base mt-8">
        <span>Made with ❤️ & Futuristic Tech By <b>AKASH KUMAR</b> 🚀✨</span>
        <span className="animate-spin inline-block">⭐</span>
      </footer>
    </div>
  );
}
