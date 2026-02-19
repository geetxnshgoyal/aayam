'use client';

import { useState, useEffect, useCallback } from 'react';

interface TextEncryptProps {
    text: string;
    className?: string;
    delay?: number;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';

export default function TextEncrypt({ text, className, delay = 0 }: TextEncryptProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);

    const scramble = useCallback(() => {
        if (isScrambling) return;
        setIsScrambling(true);

        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split('')
                    .map((char, index) => {
                        if (index < iteration || char === ' ') {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
            );

            if (iteration >= text.length) {
                clearInterval(interval);
                setIsScrambling(false);
            }

            iteration += 1 / 3;
        }, 30);
    }, [text, isScrambling]);

    useEffect(() => {
        const timer = setTimeout(() => {
            scramble();
        }, delay);
        return () => clearTimeout(timer);
    }, [delay, scramble]);

    return (
        <span
            className={className}
            onMouseEnter={scramble}
        >
            {displayText}
        </span>
    );
}
