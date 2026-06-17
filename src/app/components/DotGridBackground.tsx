import { useEffect, useRef } from 'react';

interface Dot {
  x: number;
  y: number;
}

export function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseTargetRef = useRef({ x: -1000, y: -1000 });
  const mouseCurrentRef = useRef({ x: -1000, y: -1000 });
  const animationFrameRef = useRef<number | null>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    // Defer initialization to next frame to ensure canvas is in DOM
    const initializeCanvas = () => {
      // Explicitly set canvas dimensions
      const width = window.innerWidth || document.documentElement.clientWidth || 1920;
      const height = window.innerHeight || document.documentElement.clientHeight || 1080;

      canvas.width = width;
      canvas.height = height;

      // Verify canvas has valid dimensions before proceeding
      if (canvas.width === 0 || canvas.height === 0) {
        console.warn('Canvas dimensions are zero, using fallback');
        canvas.width = 1920;
        canvas.height = 1080;
      }

    const initDots = () => {
      const dots: Dot[] = [];
      const spacing = 60;
      const cols = Math.ceil(window.innerWidth / spacing) + 1;
      const rows = Math.ceil(window.innerHeight / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            x: i * spacing + (Math.random() - 0.5) * 15,
            y: j * spacing + (Math.random() - 0.5) * 15
          });
        }
      }

      dotsRef.current = dots;
    };

    const resizeCanvas = () => {
      if (!canvas) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Only reinitialize dots if canvas has valid dimensions
      if (canvas.width > 0 && canvas.height > 0) {
        initDots();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseTargetRef.current = { x: e.clientX, y: e.clientY };
    };

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const draw = () => {
      // Guard: Only proceed if canvas is valid and has dimensions
      if (!ctx || !canvas || canvas.width === 0 || canvas.height === 0) {
        animationFrameRef.current = requestAnimationFrame(draw);
        return;
      }

      const dots = dotsRef.current;
      if (dots.length === 0) {
        animationFrameRef.current = requestAnimationFrame(draw);
        return;
      }

      // Smooth lerp for spotlight position (0.1 for fluid gliding motion)
      const lerpFactor = 0.1;
      mouseCurrentRef.current.x = lerp(
        mouseCurrentRef.current.x,
        mouseTargetRef.current.x,
        lerpFactor
      );
      mouseCurrentRef.current.y = lerp(
        mouseCurrentRef.current.y,
        mouseTargetRef.current.y,
        lerpFactor
      );

      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      const mouse = mouseCurrentRef.current;
      const spotlightRadius = 150;
      const connectionRadius = 100;

      // Vivid tactical night vision green (#00FF41)
      const greenR = 0;
      const greenG = 255;
      const greenB = 65;

      // Draw directly to main canvas with spotlight mask
      ctx.save();

      // Create circular clipping path for spotlight
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, spotlightRadius, 0, Math.PI * 2);
      ctx.clip();

      // Draw connections first (behind dots) with glow
      ctx.strokeStyle = `rgb(${greenR}, ${greenG}, ${greenB})`;
      ctx.lineWidth = 1.2;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${greenR}, ${greenG}, ${greenB}, 0.8)`;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const distanceToMouse = Math.hypot(dot.x - mouse.x, dot.y - mouse.y);

        if (distanceToMouse < spotlightRadius) {
          for (let j = i + 1; j < dots.length; j++) {
            const otherDot = dots[j];
            const otherDistanceToMouse = Math.hypot(
              otherDot.x - mouse.x,
              otherDot.y - mouse.y
            );

            if (otherDistanceToMouse < spotlightRadius) {
              const distance = Math.hypot(dot.x - otherDot.x, dot.y - otherDot.y);

              if (distance < connectionRadius) {
                // Brighter lines with distance-based opacity
                const opacity = 0.6 * (1 - distance / connectionRadius);
                ctx.globalAlpha = opacity;
                ctx.beginPath();
                ctx.moveTo(dot.x, dot.y);
                ctx.lineTo(otherDot.x, otherDot.y);
                ctx.stroke();
              }
            }
          }
        }
      }

      // Draw dots with vivid glow
      ctx.globalAlpha = 1;
      ctx.fillStyle = `rgb(${greenR}, ${greenG}, ${greenB})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = `rgba(${greenR}, ${greenG}, ${greenB}, 1)`;

      for (const dot of dots) {
        const distanceToMouse = Math.hypot(dot.x - mouse.x, dot.y - mouse.y);

        if (distanceToMouse < spotlightRadius) {
          // Brighter dots closer to cursor center
          const centerProximity = 1 - (distanceToMouse / spotlightRadius);
          const dotSize = 2 + centerProximity * 1;

          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();

      // Apply gradient fade at edges for soft feather
      ctx.save();
      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        spotlightRadius * 0.6,
        mouse.x,
        mouse.y,
        spotlightRadius
      );
      gradient.addColorStop(0, 'rgba(10, 10, 10, 0)');
      gradient.addColorStop(1, 'rgba(10, 10, 10, 1)');

      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(draw);
    };

      // Initialize dots
      initDots();

      // Start animation loop after canvas is confirmed ready
      if (dotsRef.current.length > 0) {
        isInitializedRef.current = true;
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        animationFrameRef.current = requestAnimationFrame(draw);
      }
    };

    // Use requestAnimationFrame to defer initialization until next frame
    const rafId = requestAnimationFrame(() => {
      initializeCanvas();
    });

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);

      // Cancel animation frame to prevent memory leaks
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      isInitializedRef.current = false;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
