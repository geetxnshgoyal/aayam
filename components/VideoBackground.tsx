'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function VideoBackground() {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const [currentVideo, setCurrentVideo] = useState<'intro' | 'megacity'>(isHome ? 'intro' : 'megacity');
    const introVideoRef = useRef<HTMLVideoElement>(null);
    const megacityVideoRef = useRef<HTMLVideoElement>(null);

    // Reset video state when route changes
    useEffect(() => {
        setCurrentVideo(isHome ? 'intro' : 'megacity');
    }, [isHome]);

    useEffect(() => {
        // When intro finishes, switch to megacity
        const handleIntroEnd = () => {
            setCurrentVideo('megacity');
        };

        const intro = introVideoRef.current;
        if (intro) {
            intro.addEventListener('ended', handleIntroEnd);
        }

        return () => {
            if (intro) {
                intro.removeEventListener('ended', handleIntroEnd);
            }
        };
    }, [currentVideo]);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-black">
            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[2px]" />

            {/* Intro Video */}
            <AnimatePresence mode="wait">
                {currentVideo === 'intro' && (
                    <motion.video
                        key="intro"
                        ref={introVideoRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        autoPlay
                        muted
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover"
                    >
                        <source src="/videos/intro.mp4" type="video/mp4" />
                    </motion.video>
                )}

                {/* Megacity Loop Video */}
                {currentVideo === 'megacity' && (
                    <motion.video
                        key="megacity"
                        ref={megacityVideoRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover"
                    >
                        <source src="/videos/megacity.mp4" type="video/mp4" />
                    </motion.video>
                )}
            </AnimatePresence>

            {/* Cinematic Vignette */}
            <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        </div>
    );
}
