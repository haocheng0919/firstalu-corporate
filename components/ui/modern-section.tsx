'use client';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { cn } from '@/lib/utils';

interface ModernSectionProps {
  children: ReactNode;
  className?: string;
  backgroundImage?: string;
  overlay?: boolean;
  id?: string;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const
    }
  }
};

export function ModernSection({ 
  children, 
  className, 
  backgroundImage, 
  overlay = true,
  id 
}: ModernSectionProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
      className={cn("relative overflow-hidden", className)}
    >
      {/* Background Effects */}
      <div
        aria-hidden
        className="z-[1] absolute inset-0 pointer-events-none isolate opacity-30">
        <div className="w-[25rem] h-[60rem] -translate-y-[200px] absolute right-0 top-0 rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(210,100%,90%,.08)_0,hsla(210,100%,80%,.02)_50%,hsla(210,100%,70%,0)_80%)]" />
        <div className="h-[60rem] absolute right-0 top-0 w-40 rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(210,100%,85%,.06)_0,hsla(210,100%,75%,.02)_80%,transparent_100%)] [translate:-5%_-30%]" />
      </div>

      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 -z-10">
          <img
            src={backgroundImage}
            alt="background"
            className="absolute inset-0 w-full h-full object-cover opacity-5"
          />
        </div>
      )}

      {/* Gradient Overlay */}
      {overlay && (
        <></>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.section>
  );
}