'use client';
import React, { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FlipCardProps {
  className?: string;
  frontContent: ReactNode;
  backContent: ReactNode;
  frontBackground?: string;
  backImage?: string;
}

export function FlipCard({ className, frontContent, backContent, frontBackground = 'bg-[#DFECF0]', backImage }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={cn('relative w-full h-[320px] cursor-pointer perspective-[1500px]', className)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-all duration-[1.4s] ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
        style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Front Face */}
        <div 
          className={cn('absolute inset-0 backface-hidden rounded-[30px] p-8 flex flex-col items-center justify-center text-center shadow-lg border border-black/5', frontBackground)}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {frontContent}
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 backface-hidden rounded-[30px] overflow-hidden rotate-y-180 p-8 flex flex-col items-center justify-center text-center border border-white/10"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {backImage && (
            <>
              <img 
                src={backImage} 
                alt="Card Background" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
            </>
          )}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
            {backContent}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
