import React from "react";

const GlassStyles = () => (
  <style>{`
    .glass { backdrop-filter: blur(10px); background: rgba(255,255,255,0.1); }
    .audio-wave {
      display: inline-block;
      animation: audioWave 2s ease-in-out infinite alternate;
    }
    @keyframes audioWave {
      0% { transform: scaleY(0.5); }
      100% { transform: scaleY(1.2); }
    }
    .floating {
      animation: floating 3s ease-in-out infinite;
    }
    @keyframes floating {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
  `}</style>
);

export default GlassStyles;
