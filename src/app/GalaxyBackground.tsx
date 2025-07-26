"use client";
import React, { useRef, useEffect } from 'react';

// Simple animated galaxy background using canvas
const GalaxyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Star, planet, comet, water particle definitions
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.5,
    }));
    const planets = Array.from({ length: 4 }, (_, i) => ({
      x: width * (0.2 + 0.2 * i),
      y: height * (0.3 + 0.1 * i),
      r: 30 + Math.random() * 20,
      color: `hsl(${Math.random() * 360}, 60%, 50%)`,
    }));
    const comets = Array.from({ length: 3 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      dx: Math.random() * 2 + 1,
      dy: Math.random() * 1 - 0.5,
      len: Math.random() * 80 + 40,
    }));
    const waterParticles = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: height * 0.9 + Math.random() * 40,
      r: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.5,
    }));

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      // Draw stars
      stars.forEach(star => {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      });
      // Draw planets
      planets.forEach(planet => {
        if (!ctx) return;
        ctx.save();
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.r, 0, 2 * Math.PI);
        ctx.fillStyle = planet.color;
        ctx.shadowColor = planet.color;
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.restore();
      });
      // Draw comets
      comets.forEach(comet => {
        if (!ctx) return;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(comet.x, comet.y);
        ctx.lineTo(comet.x - comet.len, comet.y - comet.len * 0.2);
        ctx.strokeStyle = 'rgba(255,255,255,0.7)';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.restore();
        // Move comet
        comet.x += comet.dx;
        comet.y += comet.dy;
        if (comet.x > width + 100) {
          comet.x = -100;
          comet.y = Math.random() * height;
        }
      });
      // Draw water particles
      waterParticles.forEach(wp => {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = wp.alpha;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.r, 0, 2 * Math.PI);
        ctx.fillStyle = '#00eaff';
        ctx.shadowColor = '#00eaff';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      });
    }

    let animationId: number;
    function animate() {
      draw();
      animationId = requestAnimationFrame(animate);
    }
    animate();

    // Resize handler
    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    }
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default GalaxyBackground;
