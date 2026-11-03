"use client"

import { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

export const revealChild = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
}

export function staggerParent(stagger = 0.08, delay = 0) {
  return {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }
}

export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  immediate = false,
}: {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
  immediate?: boolean
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      animate={immediate && !reduce ? "show" : undefined}
      whileInView={immediate || reduce ? undefined : "show"}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      variants={staggerParent(stagger, delay)}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={revealChild}>
      {children}
    </motion.div>
  )
}

export function RevealWords({
  text,
  className,
  mode = "view",
}: {
  text: string
  className?: string
  mode?: "view" | "mount" | "parent"
}) {
  const reduce = useReducedMotion()
  const words = text.split(" ")
  const controlled = mode === "parent"
  return (
    <motion.span
      className={className}
      variants={staggerParent(0.045)}
      {...(controlled
        ? {}
        : {
            initial: reduce ? false : ("hidden" as const),
            animate: !reduce && mode === "mount" ? ("show" as const) : undefined,
            whileInView: !reduce && mode === "view" ? ("show" as const) : undefined,
            viewport: { once: true, margin: "0px 0px -8% 0px" },
          })}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-bottom pb-[0.08em] mr-[0.22em] last:mr-0"
          variants={{ hidden: {}, show: {} }}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%", transition: { duration: 0.72, ease } },
            }}
          >
            {word}
          </motion.span>
        </motion.span>
      ))}
    </motion.span>
  )
}

// Variants for parent container animations
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
}

// Variants for child elements animations
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
}

// Variants for section titles
export const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
}

// Fade in animation component for sections
interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.7,
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Slide in animation component for sections
interface SlideInProps {
  children: ReactNode
  className?: string
  direction?: "left" | "right"
  delay?: number
}

export function SlideIn({ children, className, direction = "left", delay = 0 }: SlideInProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        x: direction === "left" ? -50 : 50 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0 
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.7,
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
