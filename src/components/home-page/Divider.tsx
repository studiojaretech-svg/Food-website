import React from 'react';
import StarIcon from '@/assets/icons/star.svg';

interface Props {
    arc?: boolean;
    theme?: 'light' | 'dark'; // Add dynamic theme prop
}

const HomeDivider: React.FC<Props> = ({ arc, theme = 'light' }) => {
    const isDark = theme === 'dark';

    return (
        <div className={`relative flex flex-col items-center justify-center max-w-max mx-auto my-6 lg:my-20 ${isDark ? 'dark-divider' : 'light-divider'}`}>
            {/* Scoped CSS Injector to forcefully override hardcoded SVG path colors in the DOM */}
            <style dangerouslySetInnerHTML={{__html: `
                .dark-divider .star-icon-color path,
                .dark-divider .star-icon-color polygon,
                .dark-divider .star-icon-color circle,
                .dark-divider .star-icon-color rect {
                    fill: #FFB03A !important;
                    stroke: none !important;
                }
                .light-divider .star-icon-color path,
                .light-divider .star-icon-color polygon,
                .light-divider .star-icon-color circle,
                .light-divider .star-icon-color rect {
                    fill: #D9D9D9 !important;
                    stroke: none !important;
                }
            `}} />

            {/* Top vertical divider line segment */}
            <div className={`w-px h-[50px] lg:h-24 transition-colors duration-300 ${
                isDark ? 'bg-[#FFB03A]' : 'bg-[#D9D9D9]'
            }`} />
            
            {/* Central StarIcon with color-overriding class and ambient drop shadow */}
            <StarIcon className={`relative z-10 w-6 h-6 lg:w-8 lg:h-8 star-icon-color transition-all duration-300 ${
                isDark ? 'drop-shadow-[0_0_8px_rgba(255,176,58,0.7)]' : ''
            }`} />
            
            {/* Bottom vertical divider line segment */}
            <div className={`w-px h-[50px] lg:h-24 transition-colors duration-300 ${
                isDark ? 'bg-[#FFB03A]' : 'bg-[#D9D9D9]'
            }`} />
            
            {/* Original background arc geometry styled dynamically */}
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
                                stopOpacity={isDark ? "0.3" : "1"} 
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

