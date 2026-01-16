export function MintLogo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      <div className="relative h-11 w-11 flex-shrink-0" style={{ transform: 'translateZ(0)' }}>
        <svg viewBox="0 0 44 44" className="h-full w-full drop-shadow-md absolute inset-0 animate-float">
          {/* Gradient definition */}
          <defs>
            <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316">
                <animate
                  attributeName="stop-color"
                  values="#f97316;#fb923c;#f97316"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#ea580c">
                <animate
                  attributeName="stop-color"
                  values="#ea580c;#f97316;#ea580c"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
            <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c">
                <animate
                  attributeName="stop-color"
                  values="#fb923c;#f97316;#fb923c"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#f97316">
                <animate
                  attributeName="stop-color"
                  values="#f97316;#fb923c;#f97316"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
            {/* Gradiente rotativo para animação */}
            <linearGradient id="animatedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316">
                <animate
                  attributeName="stop-color"
                  values="#f97316;#fb923c;#f97316"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#ea580c">
                <animate
                  attributeName="stop-color"
                  values="#ea580c;#f97316;#ea580c"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
              <animateTransform
                attributeName="gradientTransform"
                type="rotate"
                values="0 22 22;360 22 22"
                dur="8s"
                repeatCount="indefinite"
              />
            </linearGradient>
          </defs>
          
          {/* Rounded square background com gradiente animado */}
          <rect
            x="2"
            y="2"
            width="40"
            height="40"
            rx="12"
            ry="12"
            fill="url(#animatedGradient)"
            className="transition-all duration-300 group-hover:brightness-110"
          />
          
          {/* Stylized mint leaf */}
          <path
            d="M22 10 C14 16, 13 28, 22 36 C31 28, 30 16, 22 10"
            fill="white"
            fillOpacity="0.95"
            className="transition-all duration-300 group-hover:fill-opacity-100"
          />
          
          {/* Leaf center vein com animação */}
          <path
            d="M22 14 L22 32"
            stroke="url(#leafGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            className="animate-vein-glow"
          />
          
          {/* Leaf side veins com animação escalonada */}
          <g className="animate-vein-glow" style={{ animationDelay: "0s" }}>
            <path
              d="M22 18 L17 21"
              stroke="url(#leafGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fillOpacity="0"
            />
          </g>
          <g className="animate-vein-glow" style={{ animationDelay: "0.5s" }}>
            <path
              d="M22 23 L16 27"
              stroke="url(#leafGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fillOpacity="0"
            />
          </g>
          <g className="animate-vein-glow" style={{ animationDelay: "0.25s" }}>
            <path
              d="M22 18 L27 21"
              stroke="url(#leafGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fillOpacity="0"
            />
          </g>
          <g className="animate-vein-glow" style={{ animationDelay: "0.75s" }}>
            <path
              d="M22 23 L28 27"
              stroke="url(#leafGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fillOpacity="0"
            />
          </g>
        </svg>
        
        {/* Brilho sutil ao redor */}
        <div className="absolute inset-0 rounded-xl bg-orange-500/20 blur-lg -z-10 animate-pulse-gentle opacity-0 group-hover:opacity-60 transition-opacity duration-300 scale-110" />
      </div>
      
      <div className="flex flex-col leading-none">
        <span className="text-xl font-bold tracking-tight transition-colors group-hover:text-orange-500 duration-300">
          Mint
        </span>
        <span className="text-[11px] font-semibold tracking-widest text-orange-500 uppercase transition-colors duration-300">
          Web Site
        </span>
      </div>
    </div>
  )
}
