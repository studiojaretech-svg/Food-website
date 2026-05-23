import React from 'react';
import StarIcon from '@/assets/icons/star.svg';

interface Props {
    arc?: boolean;
    theme?: 'light' | 'dark'; // Add dynamic theme prop
}

const HomeDivider: React.FC<Props> = ({ arc, theme = 'light' }) => {
    const isDark = theme === 'dark';

    // Dynamic color tokens mapping
    const lineBg = isDark ? 'bg-white/20' : 'bg-[#D9D9D9]';
    const starStyle = isDark ? { color: '#FFB03A' } : undefined;
    const starClass = isDark 
        ? 'relative z-10 w-6 h-6 lg:w-8 lg:h-8 text-[#FFB03A] drop-shadow-[0_0_8px_rgba(255,176,58,0.45)]' 
        : 'relative z-10 w-6 h-6 lg:w-8 lg:h-8';

    return (
        <div className="relative flex flex-col items-center justify-center max-w-max mx-auto my-6 lg:my-20">
            {/* Top vertical divider line segment */}
            <div className={`w-px h-[50px] ${lineBg} lg:h-24 transition-colors duration-300`} />
            
            {/* Central StarIcon with dynamic saffron gold state */}
            <StarIcon 
                className={`${starClass} transition-all duration-300`} 
                style={starStyle}
            />
            
            {/* Bottom vertical divider line segment */}
            <div className={`w-px h-[50px] ${lineBg} lg:h-24 transition-colors duration-300`} />
            
            {/* Original beautiful background arc modified dynamically for dark sections */}
            {arc && (
                <svg
                    viewBox="0 0 1299 1222"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-[52px] left-1/2 -translate-x-1/2 w-[328px] h-[328px] pointer-events-none lg:w-[1299px] lg:h-[1299px] lg:top-[73px]"
                >
                    <circle
                        cx="649.5"
                        cy="649.5"
                        r="649"
                        stroke="url(#paint0_linear_582_977)"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear_582_977"
                            x1="649.5"
                            y1="0"
                            x2="649.5"
                            y2="1299"
                            gradientUnits="userSpaceOnUse"
                        >
                            {/* Linear gradients update dynamically to match the section theme */}
                            <stop 
                                stopColor={isDark ? "#FFB03A" : "#C2C0B8"} 
                                stopOpacity={isDark ? "0.25" : "1"} 
                            />
                            <stop
                                offset="0.273792"
                                stopColor={isDark ? "#FFB03A" : "#C2C0B8"}
                                stopOpacity="0"
                            />
                        </linearGradient>
                    </defs>
                </svg>
            )}
        </div>
    );
};

export default HomeDivider;

