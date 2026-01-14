'use client';
import { useEffect, useRef } from "react";

export default function GlowingOrbs() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animationId: number;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const orbs = Array.from({ length: 90 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1.5, // Minimum radius is 20
      dx: (Math.random() - 0.5) * 0.6,
      dy: (Math.random() - 0.5) * 0.6,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbs.forEach((orb) => {
        orb.x += orb.dx;
        orb.y += orb.dy;

        // bounce
        if (orb.x < 0 || orb.x > canvas.width) orb.dx *= -1;
        if (orb.y < 0 || orb.y > canvas.height) orb.dy *= -1;

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "white";
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute w-full inset-0 bg-ripple pointer-events-none opacity-15"
    />
  );
}
