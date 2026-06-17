import { Outlet } from "react-router";
import { DotGridBackground } from "./DotGridBackground";
import { NoiseOverlay } from "./NoiseOverlay";

export function Root() {
  return (
    <div className="bg-[#0a0a0a] text-[#f0f0f0] antialiased min-h-screen relative">
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        body {
          background: #0a0a0a;
        }
      `}</style>
      <DotGridBackground />
      <NoiseOverlay />
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
}
