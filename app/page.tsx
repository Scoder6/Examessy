'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Container } from '@/components/container'
import { Button } from '@/components/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/card'
import { Badge } from '@/components/badge'
import { Footer } from '@/components/footer'
import { ScrollProgress } from '@/components/scroll-progress'
import { MouseSpotlight } from '@/components/mouse-spotlight'
import { FAQ } from '@/components/faq'
import { ParticleNetwork } from '@/components/animations/particle-network'
import { FloatingCTA } from '@/components/animations/floating-cta'
import { Typewriter } from '@/components/animations/typewriter'
import { TextScramble } from '@/components/animations/text-scramble'
import { ParallaxCard } from '@/components/animations/parallax-card'
import { AnimatedCounter } from '@/components/animations/animated-counter'
import { MorphingBlob } from '@/components/animations/morphing-blob'
import { StepConnector } from '@/components/animations/step-connector'
import { HomeBackground } from '@/components/3d/page-scenes'
import { DramaticReveal, MagneticButton, SparkButton, GlitchText, ScrollingText, WordReveal, HoverSpotlight, DramaticCard, StaggerGrid, LiquidButton, ExplosiveCounter, PulseBorder } from '@/components/dramatic/dramatic-effects'
import {
  DramaticArrowRight, DramaticBookOpen, DramaticZap, DramaticTrendingUp, DramaticUsers, DramaticStar, DramaticCheck, DramaticLightbulb,
  DramaticRocket, DramaticChart, DramaticSparkles, DramaticCreditCard, DramaticShield, DramaticGlobe, DramaticArrowUpRight, DramaticLock,
  DramaticClock, DramaticTarget, DramaticTrophy, DramaticBrain, DramaticChevronRight, DramaticQuote, DramaticGraduationCap, DramaticMedal, DramaticMapPin,
  DramaticPhone, DramaticCalendar, DramaticBookCheck, DramaticLayers, DramaticNetwork, DramaticGem,
} from '@/components/icons/dramatic-icons'
import { IITDelhiIcon } from '@/components/icons/iit-delhi-icon'
import { AIIMSIcon } from '@/components/icons/aiims-icon'
import { BITSIcon } from '@/components/icons/bits-icon'
import { NITIcon } from '@/components/icons/nit-icon'
import { VITVelloreIcon } from '@/components/icons/vit-vellore-icon'
import { IIITIcon } from '@/components/icons/iiit-icon'
import { DTUIcon } from '@/components/icons/dtu-icon'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, Quote, Sparkles } from 'lucide-react'

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
  )
}

const toppers = [
  { name: 'Aarav Sharma', exam: 'JEE Advanced', percentile: '99.997', rank: 'AIR 3', city: 'Delhi', gradient: 'from-amber-500 to-orange-600', bgGradient: 'from-amber-500/20 to-orange-600/5', score: 345, total: 360, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { name: 'Priya Verma', exam: 'NEET', percentile: '99.999', rank: 'AIR 7', city: 'Mumbai', gradient: 'from-emerald-500 to-teal-600', bgGradient: 'from-emerald-500/20 to-teal-600/5', score: 710, total: 720, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face' },
  { name: 'Rahul Gupta', exam: 'JEE Mains', percentile: '99.99', rank: 'AIR 42', city: 'Jaipur', gradient: 'from-blue-500 to-indigo-600', bgGradient: 'from-blue-500/20 to-indigo-600/5', score: 298, total: 300, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
  { name: 'Ananya Singh', exam: 'NEET', percentile: '99.98', rank: 'AIR 28', city: 'Lucknow', gradient: 'from-pink-500 to-rose-600', bgGradient: 'from-pink-500/20 to-rose-600/5', score: 695, total: 720, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
  { name: 'Vikram Patel', exam: 'VITEEE', percentile: '99.95', rank: 'AIR 12', city: 'Chennai', gradient: 'from-purple-500 to-violet-600', bgGradient: 'from-purple-500/20 to-violet-600/5', score: 98, total: 100, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
  { name: 'Sneha Reddy', exam: 'JEE Advanced', percentile: '99.99', rank: 'AIR 19', city: 'Hyderabad', gradient: 'from-cyan-500 to-blue-600', bgGradient: 'from-cyan-500/20 to-blue-600/5', score: 338, total: 360, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face' },
  { name: 'Kavya Joshi', exam: 'NEET', percentile: '99.99', rank: 'AIR 11', city: 'Pune', gradient: 'from-teal-500 to-green-600', bgGradient: 'from-teal-500/20 to-green-600/5', score: 705, total: 720, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
  { name: 'Aditya Kumar', exam: 'JEE Advanced', percentile: '99.98', rank: 'AIR 45', city: 'Patna', gradient: 'from-amber-500 to-orange-600', bgGradient: 'from-amber-500/20 to-orange-600/5', score: 335, total: 360, image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face' },
  { name: 'Meera Iyer', exam: 'NEET', percentile: '99.97', rank: 'AIR 35', city: 'Bangalore', gradient: 'from-emerald-500 to-teal-600', bgGradient: 'from-emerald-500/20 to-teal-600/5', score: 702, total: 720, image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face' },
  { name: 'Karan Singh', exam: 'JEE Mains', percentile: '99.98', rank: 'AIR 56', city: 'Chandigarh', gradient: 'from-blue-500 to-indigo-600', bgGradient: 'from-blue-500/20 to-indigo-600/5', score: 295, total: 300, image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face' },
  { name: 'Divya Nair', exam: 'NEET', percentile: '99.96', rank: 'AIR 52', city: 'Kerala', gradient: 'from-pink-500 to-rose-600', bgGradient: 'from-pink-500/20 to-rose-600/5', score: 688, total: 720, image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face' },
  { name: 'Rohit Sharma', exam: 'VITEEE', percentile: '99.94', rank: 'AIR 25', city: 'Ahmedabad', gradient: 'from-purple-500 to-violet-600', bgGradient: 'from-purple-500/20 to-violet-600/5', score: 95, total: 100, image: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=150&h=150&fit=crop&crop=face' },
  { name: 'Pooja Verma', exam: 'JEE Advanced', percentile: '99.97', rank: 'AIR 38', city: 'Delhi', gradient: 'from-cyan-500 to-blue-600', bgGradient: 'from-cyan-500/20 to-blue-600/5', score: 340, total: 360, image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face' },
  { name: 'Neha Kapoor', exam: 'NEET', percentile: '99.98', rank: 'AIR 22', city: 'Mumbai', gradient: 'from-teal-500 to-green-600', bgGradient: 'from-teal-500/20 to-green-600/5', score: 698, total: 720, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face' },
  { name: 'Amit Bansal', exam: 'JEE Advanced', percentile: '99.96', rank: 'AIR 52', city: 'Lucknow', gradient: 'from-amber-500 to-orange-600', bgGradient: 'from-amber-500/20 to-orange-600/5', score: 332, total: 360, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face' },
  { name: 'Riya Das', exam: 'NEET', percentile: '99.95', rank: 'AIR 48', city: 'Kolkata', gradient: 'from-emerald-500 to-teal-600', bgGradient: 'from-emerald-500/20 to-teal-600/5', score: 685, total: 720, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face' },
  { name: 'Vishal Mehta', exam: 'JEE Mains', percentile: '99.97', rank: 'AIR 68', city: 'Surat', gradient: 'from-blue-500 to-indigo-600', bgGradient: 'from-blue-500/20 to-indigo-600/5', score: 296, total: 300, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
  { name: 'Sakshi Gupta', exam: 'NEET', percentile: '99.94', rank: 'AIR 65', city: 'Jaipur', gradient: 'from-pink-500 to-rose-600', bgGradient: 'from-pink-500/20 to-rose-600/5', score: 680, total: 720, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
  { name: 'Deepak Yadav', exam: 'VITEEE', percentile: '99.93', rank: 'AIR 32', city: 'Bhopal', gradient: 'from-purple-500 to-violet-600', bgGradient: 'from-purple-500/20 to-violet-600/5', score: 93, total: 100, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { name: 'Anjali Rao', exam: 'JEE Advanced', percentile: '99.95', rank: 'AIR 48', city: 'Hyderabad', gradient: 'from-cyan-500 to-blue-600', bgGradient: 'from-cyan-500/20 to-blue-600/5', score: 336, total: 360, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face' },
  { name: 'Swati Patil', exam: 'NEET', percentile: '99.97', rank: 'AIR 30', city: 'Pune', gradient: 'from-teal-500 to-green-600', bgGradient: 'from-teal-500/20 to-green-600/5', score: 700, total: 720, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
  { name: 'Nitin Agarwal', exam: 'JEE Advanced', percentile: '99.94', rank: 'AIR 65', city: 'Kanpur', gradient: 'from-amber-500 to-orange-600', bgGradient: 'from-amber-500/20 to-orange-600/5', score: 328, total: 360, image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face' },
  { name: 'Tanvi Sharma', exam: 'NEET', percentile: '99.96', rank: 'AIR 40', city: 'Delhi', gradient: 'from-emerald-500 to-teal-600', bgGradient: 'from-emerald-500/20 to-teal-600/5', score: 692, total: 720, image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face' },
  { name: 'Gaurav Singh', exam: 'JEE Mains', percentile: '99.95', rank: 'AIR 78', city: 'Varanasi', gradient: 'from-blue-500 to-indigo-600', bgGradient: 'from-blue-500/20 to-indigo-600/5', score: 294, total: 300, image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face' },
  { name: 'Megha Joshi', exam: 'NEET', percentile: '99.93', rank: 'AIR 72', city: 'Ahmedabad', gradient: 'from-pink-500 to-rose-600', bgGradient: 'from-pink-500/20 to-rose-600/5', score: 675, total: 720, image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face' },
  { name: 'Abhishek Das', exam: 'VITEEE', percentile: '99.92', rank: 'AIR 45', city: 'Kolkata', gradient: 'from-purple-500 to-violet-600', bgGradient: 'from-purple-500/20 to-violet-600/5', score: 91, total: 100, image: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=150&h=150&fit=crop&crop=face' },
  { name: 'Kriti Nair', exam: 'JEE Advanced', percentile: '99.93', rank: 'AIR 58', city: 'Chennai', gradient: 'from-cyan-500 to-blue-600', bgGradient: 'from-cyan-500/20 to-blue-600/5', score: 330, total: 360, image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face' },
  { name: 'Preeti Singh', exam: 'NEET', percentile: '99.95', rank: 'AIR 38', city: 'Chandigarh', gradient: 'from-teal-500 to-green-600', bgGradient: 'from-teal-500/20 to-green-600/5', score: 690, total: 720, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face' },
  { name: 'Siddharth Roy', exam: 'JEE Advanced', percentile: '99.91', rank: 'AIR 78', city: 'Guwahati', gradient: 'from-amber-500 to-orange-600', bgGradient: 'from-amber-500/20 to-orange-600/5', score: 325, total: 360, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face' },
  { name: 'Rashmi Menon', exam: 'NEET', percentile: '99.94', rank: 'AIR 55', city: 'Kochi', gradient: 'from-emerald-500 to-teal-600', bgGradient: 'from-emerald-500/20 to-teal-600/5', score: 687, total: 720, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face' },
  { name: 'Vikas Choudhary', exam: 'JEE Mains', percentile: '99.93', rank: 'AIR 92', city: 'Jaipur', gradient: 'from-blue-500 to-indigo-600', bgGradient: 'from-blue-500/20 to-indigo-600/5', score: 293, total: 300, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
  { name: 'Shreya Ghosh', exam: 'NEET', percentile: '99.92', rank: 'AIR 68', city: 'Kolkata', gradient: 'from-pink-500 to-rose-600', bgGradient: 'from-pink-500/20 to-rose-600/5', score: 678, total: 720, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
  { name: 'Mohit Sharma', exam: 'VITEEE', percentile: '99.91', rank: 'AIR 58', city: 'Delhi', gradient: 'from-purple-500 to-violet-600', bgGradient: 'from-purple-500/20 to-violet-600/5', score: 90, total: 100, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { name: 'Anita Desai', exam: 'JEE Advanced', percentile: '99.92', rank: 'AIR 72', city: 'Mumbai', gradient: 'from-cyan-500 to-blue-600', bgGradient: 'from-cyan-500/20 to-blue-600/5', score: 327, total: 360, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face' },
  { name: 'Lakshmi Iyer', exam: 'NEET', percentile: '99.93', rank: 'AIR 45', city: 'Chennai', gradient: 'from-teal-500 to-green-600', bgGradient: 'from-teal-500/20 to-green-600/5', score: 688, total: 720, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
  { name: 'Rahul Malhotra', exam: 'JEE Advanced', percentile: '99.89', rank: 'AIR 95', city: 'Bangalore', gradient: 'from-amber-500 to-orange-600', bgGradient: 'from-amber-500/20 to-orange-600/5', score: 322, total: 360, image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face' },
  { name: 'Suman Devi', exam: 'NEET', percentile: '99.91', rank: 'AIR 62', city: 'Bhubaneswar', gradient: 'from-emerald-500 to-teal-600', bgGradient: 'from-emerald-500/20 to-teal-600/5', score: 682, total: 720, image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face' },
  { name: 'Amitabh Singh', exam: 'JEE Mains', percentile: '99.90', rank: 'AIR 105', city: 'Lucknow', gradient: 'from-blue-500 to-indigo-600', bgGradient: 'from-blue-500/20 to-indigo-600/5', score: 291, total: 300, image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face' },
  { name: 'Kavita Rao', exam: 'NEET', percentile: '99.89', rank: 'AIR 78', city: 'Hyderabad', gradient: 'from-pink-500 to-rose-600', bgGradient: 'from-pink-500/20 to-rose-600/5', score: 672, total: 720, image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face' },
  { name: 'Sanjay Kumar', exam: 'VITEEE', percentile: '99.88', rank: 'AIR 72', city: 'Coimbatore', gradient: 'from-purple-500 to-violet-600', bgGradient: 'from-purple-500/20 to-violet-600/5', score: 88, total: 100, image: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=150&h=150&fit=crop&crop=face' },
  { name: 'Geeta Sharma', exam: 'JEE Advanced', percentile: '99.90', rank: 'AIR 85', city: 'Delhi', gradient: 'from-cyan-500 to-blue-600', bgGradient: 'from-cyan-500/20 to-blue-600/5', score: 324, total: 360, image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face' },
  { name: 'Usha Patel', exam: 'NEET', percentile: '99.92', rank: 'AIR 48', city: 'Ahmedabad', gradient: 'from-teal-500 to-green-600', bgGradient: 'from-teal-500/20 to-green-600/5', score: 685, total: 720, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face' },
  { name: 'Vijay Kumar', exam: 'JEE Advanced', percentile: '99.86', rank: 'AIR 112', city: 'Patna', gradient: 'from-amber-500 to-orange-600', bgGradient: 'from-amber-500/20 to-orange-600/5', score: 318, total: 360, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face' },
  { name: 'Rekha Nair', exam: 'NEET', percentile: '99.88', rank: 'AIR 72', city: 'Kerala', gradient: 'from-emerald-500 to-teal-600', bgGradient: 'from-emerald-500/20 to-teal-600/5', score: 680, total: 720, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face' },
  { name: 'Sunil Verma', exam: 'JEE Mains', percentile: '99.87', rank: 'AIR 128', city: 'Indore', gradient: 'from-blue-500 to-indigo-600', bgGradient: 'from-blue-500/20 to-indigo-600/5', score: 289, total: 300, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
  { name: 'Meena Kumari', exam: 'NEET', percentile: '99.85', rank: 'AIR 88', city: 'Ranchi', gradient: 'from-pink-500 to-rose-600', bgGradient: 'from-pink-500/20 to-rose-600/5', score: 665, total: 720, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
  { name: 'Ajay Prasad', exam: 'VITEEE', percentile: '99.84', rank: 'AIR 85', city: 'Bhopal', gradient: 'from-purple-500 to-violet-600', bgGradient: 'from-purple-500/20 to-violet-600/5', score: 86, total: 100, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { name: 'Savita Joshi', exam: 'JEE Advanced', percentile: '99.87', rank: 'AIR 98', city: 'Pune', gradient: 'from-cyan-500 to-blue-600', bgGradient: 'from-cyan-500/20 to-blue-600/5', score: 320, total: 360, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face' },
  { name: 'Bhavna Singh', exam: 'NEET', percentile: '99.86', rank: 'AIR 58', city: 'Chandigarh', gradient: 'from-teal-500 to-green-600', bgGradient: 'from-teal-500/20 to-green-600/5', score: 675, total: 720, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
  { name: 'Krishna Murthy', exam: 'JEE Advanced', percentile: '99.82', rank: 'AIR 135', city: 'Bangalore', gradient: 'from-amber-500 to-orange-600', bgGradient: 'from-amber-500/20 to-orange-600/5', score: 315, total: 360, image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face' },
  { name: 'Lalita Devi', exam: 'NEET', percentile: '99.84', rank: 'AIR 65', city: 'Guwahati', gradient: 'from-emerald-500 to-teal-600', bgGradient: 'from-emerald-500/20 to-teal-600/5', score: 678, total: 720, image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face' },
  { name: 'Harish Sharma', exam: 'JEE Mains', percentile: '99.83', rank: 'AIR 145', city: 'Surat', gradient: 'from-blue-500 to-indigo-600', bgGradient: 'from-blue-500/20 to-indigo-600/5', score: 287, total: 300, image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face' },
  { name: 'Kamala Iyer', exam: 'NEET', percentile: '99.81', rank: 'AIR 95', city: 'Chennai', gradient: 'from-pink-500 to-rose-600', bgGradient: 'from-pink-500/20 to-rose-600/5', score: 660, total: 720, image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face' },
  { name: 'Praveen Kumar', exam: 'VITEEE', percentile: '99.80', rank: 'AIR 98', city: 'Kochi', gradient: 'from-purple-500 to-violet-600', bgGradient: 'from-purple-500/20 to-violet-600/5', score: 84, total: 100, image: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=150&h=150&fit=crop&crop=face' },
  { name: 'Radha Verma', exam: 'JEE Advanced', percentile: '99.84', rank: 'AIR 108', city: 'Delhi', gradient: 'from-cyan-500 to-blue-600', bgGradient: 'from-cyan-500/20 to-blue-600/5', score: 318, total: 360, image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face' },
]

const statsData = [
  { label: 'Students Enrolled', value: 50000, suffix: '+', icon: DramaticUsers, color: 'text-blue-500' },
  { label: 'Tests Conducted', value: 1200000, suffix: '+', icon: DramaticChart, color: 'text-emerald-500' },
  { label: '99.9%+ Percentilers', value: 2500, suffix: '+', icon: DramaticTrophy, color: 'text-amber-500' },
  { label: 'Years of Excellence', value: 8, suffix: '+', icon: DramaticCalendar, color: 'text-violet-500' },
]

const features = [
  { icon: DramaticBrain, title: 'Expert-Curated Content', desc: 'Every question designed by India\'s top educators with 15+ years of experience in exam preparation.' },
  { icon: DramaticTarget, title: 'Real Exam Simulation', desc: 'Offline test environment that exactly replicates the actual exam pattern, timing, and pressure.' },
  { icon: DramaticTrophy, title: '99.9%+ Track Record', desc: 'Our students consistently rank among the top 0.1% across all major entrance examinations.' },
  { icon: DramaticUsers, title: 'Small Batch Sizes', desc: 'Personalized attention with maximum 30 students per batch for optimal learning outcomes.' },
  { icon: DramaticChart, title: 'Detailed Performance Analysis', desc: 'Comprehensive post-test analytics with question-wise breakdown and improvement roadmap.' },
  { icon: DramaticClock, title: 'Flexible Scheduling', desc: 'Multiple test slots available across all centers. Choose what works best for your preparation.' },
]

const processSteps = [
  { step: '01', title: 'Register & Enroll', desc: 'Sign up for your target exam and select your preferred test center location.', icon: DramaticBookCheck },
  { step: '02', title: 'Take Offline Tests', desc: 'Visit your chosen center and appear for full-length simulated tests under exam conditions.', icon: DramaticLayers },
  { step: '03', title: 'Analyze & Improve', desc: 'Get detailed performance reports, track your progress, and rank among peers.', icon: DramaticTrendingUp },
]

const testimonials = [
  { name: 'Aarav Sharma', exam: 'JEE Advanced AIR 3', quote: 'The offline test series was a game-changer for me. The exam environment felt exactly like the real thing. By the time I sat for JEE Advanced, I had already practiced under those conditions 50+ times.', gradient: 'from-amber-500 to-orange-600', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { name: 'Priya Verma', exam: 'NEET AIR 7', quote: 'What sets Examessy apart is the quality of questions and the detailed analysis. Every test pushed me to think harder. The mentors personally reviewed my weak areas and helped me improve consistently.', gradient: 'from-emerald-500 to-teal-600', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face' },
  { name: 'Rahul Gupta', exam: 'JEE Mains 99.99%ile', quote: 'I joined Examessy in my drop year. The structured approach, regular mock tests, and peer competition kept me motivated throughout. Best decision I made for my preparation.', gradient: 'from-blue-500 to-indigo-600', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
  { name: 'Sneha Reddy', exam: 'JEE Advanced AIR 19', quote: 'The small batch sizes meant I got individual attention. My doubts were cleared immediately, and the test analysis helped me identify exactly where I was losing marks.', gradient: 'from-cyan-500 to-blue-600', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face' },
]

export default function Home() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [enrolledCount, setEnrolledCount] = useState(48237)
  const [visibleToppers, setVisibleToppers] = useState(50)
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef as any, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.3], ['0%', '20%'])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.97])

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setEnrolledCount((prev) => prev + Math.floor(Math.random() * 3) + 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handlePayment = (exam: string) => {
    sessionStorage.setItem('selectedExam', exam)
    router.push('/payment')
  }

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30 relative overflow-x-hidden">
      <MouseSpotlight />
      <ScrollProgress />

      {/* 3D Background */}
      <HomeBackground />

      <Header showAuth={true} />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
        <MorphingBlob color="primary" size="500px" className="-top-40 -left-40 opacity-15" />
        <MorphingBlob color="secondary" size="400px" className="-bottom-40 -right-40 opacity-10" style={{ animationDelay: '-10s' } as React.CSSProperties} />

        <motion.div style={{ opacity: heroOpacity, y: heroY, scale: heroScale }} className="w-full">
          <Container size="2xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Hero Left */}
              <div className="space-y-10 relative z-10">
                <div className="space-y-5">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/[0.06] border border-primary/[0.12] shadow-lg shadow-primary/[0.04]"
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                    </span>
                    <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-primary uppercase font-mono">
                      Offline Test Series · {new Date().getFullYear()}
                    </span>
                  </motion.div>

                   <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter leading-[0.85]"
                  >
                    <span className="block">From</span>
                    <span className="block text-gradient">
                      Classroom
                    </span>
                    <span className="block">To Topper</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg md:text-xl text-muted-foreground/80 max-w-lg leading-relaxed font-clean min-h-[3.5rem]"
                  >
                    <Typewriter 
                      text="India's most results-driven offline test series. Join 50,000+ students who transformed their preparation into top ranks."
                      speed={25}
                      delay={800}
                      cursor={true}
                      cursorChar="_"
                    />
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-wrap items-center gap-5"
                >
                  <MagneticButton>
                    <motion.button
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push('/auth/sign-up')}
                      className="group relative px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base tracking-wide shadow-[0_4px_20px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_8px_32px_rgba(var(--primary-rgb),0.4)] transition-all overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2.5">
                        Enroll Now <DramaticArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" style={{ background: 'linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.1) 50%,transparent 60%)' }} />
                    </motion.button>
                  </MagneticButton>

                  <Link href="/#results">
                    <Button variant="ghost" size="lg" className="rounded-2xl font-bold text-base gap-2 h-18">
                      View Results <DramaticArrowUpRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </motion.div>

                {/* Live counter widget */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-wrap items-center gap-6 pt-2"
                >
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 rounded-full border-2 border-background bg-gradient-to-br ${
                          ['from-amber-500 to-orange-600', 'from-emerald-500 to-teal-600', 'from-blue-500 to-indigo-600', 'from-pink-500 to-rose-600'][i - 1]
                        } flex items-center justify-center text-[10px] text-white font-bold`}
                      >
                        {['AS', 'PV', 'RG', 'AN'][i - 1]}
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-background bg-primary/10 flex items-center justify-center">
                      <span className="text-[8px] font-bold text-primary">+</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-foreground">
                      <AnimatedCounter from={48200} to={50000} duration={4} suffix="+" /> Students
                    </span>
                    <span className="text-[10px] text-muted-foreground/50 font-medium tracking-wide">
                      Currently enrolled across India
                    </span>
                  </div>
                </motion.div>

                {/* Trust Bar */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex flex-wrap items-center gap-8 pt-4 border-t border-white/[0.04]"
                >
                  {[
                    { label: 'Test Centers', val: '50+' },
                    { label: 'Mock Tests', val: '100+' },
                    { label: 'Success Rate', val: '94%' },
                  ].map((s, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-2xl md:text-3xl font-black font-display tracking-tight">{s.val}</span>
                      <span className="text-[9px] font-bold tracking-wider text-muted-foreground/40 uppercase">{s.label}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Hero Right - Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative hidden lg:block"
              >
                <div className="relative aspect-square max-w-[550px] ml-auto">
                  {/* Main glass card */}
                  <div className="absolute inset-0 rounded-[48px] bg-gradient-to-br from-primary/[0.08] via-secondary/[0.05] to-accent/[0.08] backdrop-blur-3xl border border-white/[0.06] shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white opacity-[0.03]" />
                    <div className="absolute inset-0 noise-bg" />

                    {/* Content inside */}
                    <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                      <div className="space-y-8">
                        <div className="flex items-center justify-between">
                          <Badge variant="glass" className="px-4 py-1.5 rounded-xl text-[10px] font-bold tracking-wider">
                            <span className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                              LIVE
                            </span>
                          </Badge>
                          <span className="text-[10px] font-mono text-muted-foreground/40">SESSION {new Date().getFullYear()}</span>
                        </div>

                        <div className="space-y-6">
                          <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                              <TrophyIcon className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs font-bold tracking-wider text-muted-foreground/60 uppercase">Top Rank</p>
                              <p className="text-4xl font-black font-display tracking-tighter">
                                <TextScramble as="span" speed={30} tick={3}>AIR #3</TextScramble>
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.04] space-y-2">
                              <DramaticGraduationCap className="w-5 h-5 text-primary/60" />
                              <p className="text-xs text-muted-foreground/40">Exams Covered</p>
                              <p className="text-xl font-black font-display">8+</p>
                            </div>
                            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.04] space-y-2">
                              <DramaticMapPin className="w-5 h-5 text-secondary/60" />
                              <p className="text-xs text-muted-foreground/40">Centers</p>
                              <p className="text-xl font-black font-display">50+</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/[0.06] to-secondary/[0.06] border border-white/[0.04]">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold tracking-wider text-muted-foreground/60 uppercase">Enrolled Today</span>
                          <span className="text-xs text-primary font-mono font-bold">+{Math.floor(Math.random() * 20) + 5}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/[0.04] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-primary"
                            initial={{ width: '0%' }}
                            animate={{ width: '78%' }}
                            transition={{ duration: 2, ease: 'easeOut' }}
                          />
                        </div>
                        <div className="flex justify-between mt-1.5">
                          <span className="text-[10px] text-muted-foreground/30">0</span>
                          <span className="text-[10px] text-muted-foreground/30">
                            <AnimatedCounter from={0} to={50000} duration={5} suffix=" Capacity" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <motion.div
                    className="absolute -top-8 -right-8 p-6 rounded-2xl bg-background/90 backdrop-blur-xl border border-white/[0.06] shadow-2xl"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                        <DramaticStar className="w-6 h-6 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold tracking-wider text-muted-foreground/60 uppercase">Avg. Score</p>
                        <p className="text-2xl font-black font-display">96.4%</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-6 -left-10 p-6 rounded-2xl bg-background/90 backdrop-blur-xl border border-white/[0.06] shadow-2xl"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <DramaticUsers className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold tracking-wider text-muted-foreground/60 uppercase">Batch Size</p>
                        <p className="text-2xl font-black font-display">30:1</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Decorative ring */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] pointer-events-none opacity-[0.04]">
                    <div
                      className="w-full h-full border border-dashed border-white/40 rounded-full"
                      style={{ animation: 'spin 40s linear infinite' }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </Container>
        </motion.div>
      </section>

      {/* ===== TRUST MARQUEE ===== */}
      <section className="py-10 border-y border-white/[0.03] overflow-hidden">
        <Container size="2xl">
          <div className="flex items-center gap-8 mb-5">
            <span className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground/30 uppercase whitespace-nowrap">Trusted by students from</span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/[0.05] to-transparent" />
          </div>
          <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <div className="flex gap-16 animate-scroll" style={{ width: 'max-content', ['--animation-duration' as string]: '30s' } as React.CSSProperties}>
              {[...Array(2)].map((_, setIdx) => (
                <div key={setIdx} className="flex gap-16 items-center">
                  {[
                    { name: 'IIT Delhi Zone', Icon: IITDelhiIcon },
                    { name: 'AIIMS Delhi', Icon: AIIMSIcon },
                    { name: 'BITS Pilani', Icon: BITSIcon },
                    { name: 'NIT Trichy', Icon: NITIcon },
                    { name: 'VIT Vellore', Icon: VITVelloreIcon },
                    { name: 'IIT Bombay Zone', Icon: IITDelhiIcon },
                    { name: 'AIIMS Nagpur', Icon: AIIMSIcon },
                    { name: 'NIT Surathkal', Icon: NITIcon },
                    { name: 'IIIT Hyderabad', Icon: IIITIcon },
                    { name: 'DTU Delhi', Icon: DTUIcon },
                  ].map((node) => (
                    <div key={node.name} className="flex items-center gap-3 text-muted-foreground/20 hover:text-muted-foreground/40 transition-colors duration-500">
                      <node.Icon className="w-4 h-4" />
                      <span className="text-xs font-bold tracking-widest uppercase whitespace-nowrap">{node.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ===== STUDENT RESULTS / TOPPERS ===== */}
      <section id="results" className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent pointer-events-none" />
        <Container size="2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div className="space-y-4 max-w-2xl">
              <Badge variant="glass" className="px-5 py-1.5 rounded-full border-amber-500/20 text-amber-500 font-bold tracking-wider text-[10px] uppercase">
                <DramaticTrophy className="w-3.5 h-3.5 mr-1.5" /> 99.9%+ Percentilers
              </Badge>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-[0.88]">
                Our{' '}
                <span className="text-amber-600 dark:text-amber-400">
                  Toppers
                </span>
                <br />
                Speak Volumes
              </h2>
              <p className="text-lg text-muted-foreground/70 max-w-lg">
                Every name here started exactly where you are. Consistent practice with our offline test series made the difference.
              </p>
            </div>
            <Link href="/testimonials">
              <Button variant="outline" size="lg" className="rounded-2xl border-white/[0.08] h-14 font-bold group">
                View All Results <DramaticArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {toppers.slice(0, visibleToppers).map((student, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.5, ease: 'easeOut' }}
              >
                <ParallaxCard tiltDegree={4} scale={1.02}>
                  <div className={`relative p-4 rounded-2xl ${student.bgGradient} border border-white/[0.05] backdrop-blur-sm bg-background/60 overflow-hidden group transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10`}>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/[0.03] to-transparent rounded-bl-full" />

                    {/* Animated gradient border on hover */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      <div className="absolute inset-0 rounded-2xl animate-border-pulse" />
                    </div>

                    <div className="flex flex-col gap-3 relative z-10">
                      <div className="flex items-start justify-between">
                        <div className="relative">
                          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/10 flex-shrink-0 ring-2 ring-white/5 shadow-lg">
                            <Image
                              src={student.image}
                              alt={student.name}
                              fill
                              className="object-cover"
                              sizes="56px"
                            />
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br ${student.gradient} flex items-center justify-center border-2 border-background shadow-md`}>
                            <DramaticMedal className="w-2.5 h-2.5 text-white" />
                          </div>
                        </div>
                        <div className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/20 shadow-sm">
                          <span className="text-[9px] font-black text-amber-500 tracking-wider">{student.percentile}%</span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-black font-display tracking-tight leading-tight">{student.name}</h3>
                        <p className="text-[10px] text-muted-foreground/50 font-medium mt-0.5 flex items-center gap-1">
                          <DramaticMapPin className="w-2.5 h-2.5" /> {student.city}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="px-2.5 py-1 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 shadow-sm">
                          <span className="text-[9px] font-bold text-primary">{student.exam}</span>
                        </div>
                        <div className="px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] shadow-sm">
                          <span className="text-[9px] font-bold text-muted-foreground">{student.rank}</span>
                        </div>
                      </div>

                      {/* Score bar */}
                       <div className="space-y-1.5">
                        <div className="flex justify-between text-[9px] text-muted-foreground/40">
                          <span>Score</span>
                          <span className="font-bold text-foreground">{student.score}/{student.total}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/[0.04] overflow-hidden shadow-inner">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${student.gradient} shadow-lg`}
                            initial={{ width: '0%' }}
                            whileInView={{ width: `${(student.score / student.total) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
                          />
                        </div>
                      </div>

                      {/* Holographic shimmer overlay */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 rounded-[inherit] overflow-hidden"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
                          style={{ backgroundSize: '200% 100%' }}
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        />
                        <motion.div
                          className="absolute inset-0 animate-holographic rounded-[inherit]"
                          style={{
                            background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.03) 40%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 60%, transparent 70%)',
                            backgroundSize: '300% 300%',
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </ParallaxCard>
              </motion.div>
            ))}
          </div>

          {visibleToppers < toppers.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center mt-12"
            >
              <Button
                onClick={() => setVisibleToppers(prev => Math.min(prev + 20, toppers.length))}
                variant="outline"
                size="lg"
                className="rounded-2xl border-white/[0.08] h-14 font-bold group px-8"
              >
                Show More Students <DramaticArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          )}
        </Container>
      </section>

      {/* ===== STATS COUNTER ===== */}
      <section id="stats" ref={statsRef} className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
        {/* scrolling ticker above stats */}
        <ScrollingText
          texts={['50,000+ Students','1.2M+ Tests','AIR #3 JEE','AIR #7 NEET','99.9% Percentile','8+ Years','50+ Centers','94% Success Rate']}
          speed={35}
          className="text-foreground/20"
        />
        <Container size="2xl" className="mt-10">
          <StaggerGrid className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {statsData.map((stat, i) => {
              const Icon = stat.icon
              return (
                <DramaticCard key={i} className="rounded-3xl" glowColor={['#818cf8','#34d399','#fbbf24','#a78bfa'][i]}>
                  <HoverSpotlight>
                    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.04] text-center space-y-4 transition-all duration-500 hover:bg-white/[0.04] hover:border-white/[0.08]">
                      <motion.div
                        className={`w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center mx-auto transition-all duration-500 ${stat.color}`}
                        whileHover={{ scale: 1.15, rotate: -5 }}
                      >
                        <Icon className="w-7 h-7" />
                      </motion.div>
                      <div className="space-y-1">
                        <p className="text-4xl md:text-5xl font-black font-display tracking-tight">
                          {statsInView ? (
                            <ExplosiveCounter from={0} to={stat.value} duration={2.5} suffix={stat.suffix} />
                          ) : (
                            <span>0{stat.suffix}</span>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground/50 font-medium tracking-wide">{stat.label}</p>
                      </div>
                    </div>
                  </HoverSpotlight>
                </DramaticCard>
              )
            })}
          </StaggerGrid>
        </Container>
        <ScrollingText
          texts={['JEE Mains','NEET','VITEEE','BITSSAT','COMEDK','JEE Advanced','AIIMS','MHT-CET']}
          speed={45}
          reverse
          className="text-foreground/15 mt-10"
        />
      </section>

      {/* ===== WHY CHOOSE US / FEATURES ===== */}
      <section className="py-28 md:py-36 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.01] to-transparent pointer-events-none" />
        <Container size="2xl">
          <DramaticReveal direction="up" className="text-center mb-16 space-y-4">
            <Badge variant="glass" className="px-5 py-1.5 rounded-full border-primary/20 text-primary font-bold tracking-wider text-[10px] uppercase">
              <DramaticSparkles className="w-3.5 h-3.5 mr-1.5" /> Why Examessy
            </Badge>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-[0.88]">
              Engineered for{' '}
              <span className="text-primary">Excellence</span>
            </h2>
            <WordReveal
              text="Every aspect of our program is designed to maximize your potential. Here's what makes us different."
              className="text-lg text-muted-foreground/60 max-w-xl mx-auto"
            />
          </DramaticReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <DramaticReveal key={i} direction={['left','up','right','left','up','right'][i] as any} delay={i * 0.1} className={i === 0 ? 'lg:col-span-2 lg:row-span-1' : ''}>
                  <DramaticCard className="rounded-3xl h-full" glowColor="rgba(var(--primary-rgb),0.4)">
                    <HoverSpotlight>
                      <ParallaxCard tiltDegree={4} glare={false} scale={1.01}>
                        <div className={`relative p-8 md:p-10 rounded-3xl border border-white/[0.04] bg-white/[0.01] backdrop-blur-sm h-full group hover:border-primary/[0.12] transition-all duration-500 ${i === 0 ? 'lg:p-12' : ''}`}>
                          <div className={`flex ${i === 0 ? 'lg:flex-row' : 'flex-col'} gap-6 ${i === 0 ? 'lg:items-center' : ''}`}>
                            <motion.div
                              className={`${i === 0 ? 'lg:w-16 lg:h-16' : ''} w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/[0.08] to-secondary/[0.08] border border-white/[0.05] flex items-center justify-center text-primary flex-shrink-0`}
                              whileHover={{ scale: 1.2, rotate: -8 }}
                              transition={{ type: 'spring', stiffness: 300 }}
                            >
                              <Icon className={`${i === 0 ? 'lg:w-8 lg:h-8' : ''} w-7 h-7`} />
                            </motion.div>
                            <div className="space-y-3">
                              <h3 className={`font-black font-display tracking-tight ${i === 0 ? 'lg:text-3xl' : 'text-2xl'}`}>
                                <GlitchText text={feature.title} />
                              </h3>
                              <p className={`text-muted-foreground/60 leading-relaxed ${i === 0 ? 'lg:text-lg' : 'text-sm'}`}>{feature.desc}</p>
                            </div>
                          </div>
                          <motion.div
                            className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/[0.03] to-transparent rounded-bl-full pointer-events-none"
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                          />
                        </div>
                      </ParallaxCard>
                    </HoverSpotlight>
                  </DramaticCard>
                </DramaticReveal>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-primary/[0.01] pointer-events-none" />
        <Container size="2xl">
          <DramaticReveal direction="scale" className="text-center mb-20 space-y-4">
            <Badge variant="glass" className="px-5 py-1.5 rounded-full border-secondary/20 text-secondary font-bold tracking-wider text-[10px] uppercase">
              <DramaticLayers className="w-3.5 h-3.5 mr-1.5" /> Simple Process
            </Badge>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-[0.88]">
              Your Journey in{' '}
              <span className="text-secondary">3 Steps</span>
            </h2>
          </DramaticReveal>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
            <StepConnector />
            {processSteps.map((step, i) => {
              const Icon = step.icon
              return (
                <DramaticReveal key={i} direction="flip" delay={i * 0.2} className="relative flex flex-col items-center text-center group">
                  <PulseBorder className="mb-8 rounded-3xl" color="rgba(var(--primary-rgb),0.4)">
                    <div className="relative">
                      <motion.div
                        className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/[0.08] to-secondary/[0.08] border border-white/[0.06] flex items-center justify-center"
                        whileHover={{ scale: 1.15, rotate: -8 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Icon className="w-10 h-10 text-primary" />
                      </motion.div>
                      <motion.div
                        className="absolute -top-3 -right-3 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-black shadow-lg"
                        animate={{ boxShadow: ['0 0 0 0 rgba(var(--primary-rgb),0.4)', '0 0 0 12px rgba(var(--primary-rgb),0)', '0 0 0 0 rgba(var(--primary-rgb),0)'] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                      >
                        {step.step}
                      </motion.div>
                    </div>
                  </PulseBorder>
                  <h3 className="text-2xl md:text-3xl font-black font-display tracking-tight mb-3">
                    <GlitchText text={step.title} />
                  </h3>
                  <p className="text-muted-foreground/60 leading-relaxed max-w-xs">{step.desc}</p>
                </DramaticReveal>
              )
            })}
          </div>

          <DramaticReveal direction="up" delay={0.3} className="flex justify-center mt-16">
            <MagneticButton>
              <SparkButton onClick={() => router.push('/auth/sign-up')}>
                <LiquidButton
                  onClick={() => router.push('/auth/sign-up')}
                  className="group relative px-12 py-5 rounded-2xl bg-primary text-primary-foreground font-black text-lg tracking-wide shadow-[0_4px_14px_rgba(var(--primary-rgb),0.35)] hover:bg-primary/90 transition-colors overflow-hidden gradient-border"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Start Your Journey <DramaticArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </LiquidButton>
              </SparkButton>
            </MagneticButton>
          </DramaticReveal>
        </Container>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <Container size="2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div className="space-y-4 max-w-2xl">
              <Badge variant="glass" className="px-5 py-1.5 rounded-full border-emerald-500/20 text-emerald-500 font-bold tracking-wider text-[10px] uppercase">
                <DramaticQuote className="w-3.5 h-3.5 mr-1.5" /> Success Stories
              </Badge>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-[0.88]">
                What Our{' '}
                <span className="text-emerald-600 dark:text-emerald-400">
                  Toppers
                </span>{' '}
                Say
              </h2>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={i === 0 ? 'md:col-span-2' : ''}
              >
                <ParallaxCard tiltDegree={3} glare={false} scale={1.005}>
                  <div className={`relative p-8 md:p-10 rounded-3xl border border-white/[0.04] bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm h-full group ${i === 0 ? 'md:p-12' : ''}`}>
                    <DramaticQuote className={`text-primary/10 mb-4 ${i === 0 ? 'md:w-12 md:h-12' : 'w-8 h-8'}`} />

                    <p className={`text-muted-foreground/70 leading-relaxed mb-8 ${i === 0 ? 'md:text-xl md:leading-relaxed' : 'text-sm'}`}>
                      &ldquo;{t.quote}&rdquo;
                    </p>

                    <div className="flex items-center gap-4">
                      <div className={`relative rounded-full overflow-hidden border-2 border-white/10 flex-shrink-0 ring-2 ring-white/5 shadow-lg ${i === 0 ? 'w-16 h-16' : 'w-12 h-12'}`}>
                        <Image
                          src={t.image}
                          alt={t.name}
                          fill
                          className="object-cover"
                          sizes={i === 0 ? "64px" : "48px"}
                        />
                      </div>
                      <div>
                        <p className="font-black font-display tracking-tight">{t.name}</p>
                        <p className="text-xs text-muted-foreground/50 font-medium">{t.exam}</p>
                      </div>
                    </div>

                    <motion.div
                      className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/[0.02] to-transparent rounded-bl-full pointer-events-none"
                      animate={{ opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 5, repeat: Infinity, delay: i * 0.5 }}
                    />
                  </div>
                </ParallaxCard>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-28 md:py-36 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.01] to-transparent pointer-events-none" />
        <Container size="2xl">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1 space-y-6 lg:sticky lg:top-28 h-fit"
            >
              <Badge variant="glass" className="px-5 py-1.5 rounded-full border-primary/20 text-primary font-bold tracking-wider text-[10px] uppercase">
                <HelpCircle className="w-3.5 h-3.5 mr-1.5" /> FAQ
              </Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter leading-[0.9]">
                Got{' '}
                <span className="text-primary">Questions?</span>
                <br />We&apos;ve Got Answers
              </h2>
              <p className="text-muted-foreground/60 leading-relaxed">
                Everything you need to know about our offline test series program. Can&apos;t find what you&apos;re looking for? Reach out to us directly.
              </p>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-bold">Support available 24/7</span>
                </div>
                <p className="text-xs text-muted-foreground/50">Our team is always ready to help you</p>
                <Link href="/contact">
                  <Button variant="outline" size="sm" fullWidth className="rounded-xl border-white/[0.06] h-12 font-bold text-xs tracking-wide mt-2 group">
                    Contact Us <DramaticArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <div className="lg:col-span-2">
              <FAQ />
            </div>
          </div>
        </Container>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent pointer-events-none" />
        <MorphingBlob color="primary" size="700px" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04]" speed={25} />

        <Container size="lg">
          <DramaticReveal direction="scale">
            <div className="relative text-center">
              <div className="relative p-10 md:p-16 lg:p-24 rounded-[40px] border border-white/[0.04] bg-gradient-to-br from-primary/[0.04] via-secondary/[0.02] to-accent/[0.04] backdrop-blur-sm overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />

                <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
                  <Badge variant="glass" className="px-6 py-2 rounded-full border-primary/20 text-primary font-bold tracking-wider text-xs uppercase mx-auto w-fit">
                    <DramaticSparkles className="w-4 h-4 mr-2" /> Limited Seats Available
                  </Badge>

                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter leading-[0.9]">
                    <WordReveal text="Ready to Join the" className="block" />
                    <span className="relative z-10 text-accent block mt-2">
                      Top 0.1%?
                    </span>
                  </h2>

                  <p className="text-lg md:text-xl text-muted-foreground/70 max-w-2xl mx-auto leading-relaxed">
                    Join 50,000+ students who trusted Examessy for their preparation. Your journey to a top rank starts with a single step.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <MagneticButton>
                      <SparkButton onClick={() => router.push('/auth/sign-up')}>
                        <LiquidButton
                          onClick={() => router.push('/auth/sign-up')}
                          className="group relative px-12 py-5 rounded-2xl bg-primary text-primary-foreground font-black text-lg tracking-wide shadow-[0_4px_14px_rgba(var(--primary-rgb),0.35)] hover:bg-primary/90 transition-colors overflow-hidden gradient-border"
                        >
                          <span className="relative z-10 flex items-center gap-3">
                            Enroll for ₹99 <DramaticArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                          </span>
                        </LiquidButton>
                      </SparkButton>
                    </MagneticButton>

                    <Link href="/exams">
                      <LiquidButton className="group rounded-2xl border border-white/[0.08] h-[66px] px-10 font-bold text-base gap-2 flex items-center bg-transparent text-foreground hover:bg-white/5 transition-colors">
                        Explore Exams <DramaticArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </LiquidButton>
                    </Link>
                  </div>

                  <div className="flex items-center justify-center gap-6 pt-4 text-xs text-muted-foreground/40">
                    <span className="flex items-center gap-1.5"><DramaticLock className="w-3.5 h-3.5" /> Secure Payment</span>
                    <span className="flex items-center gap-1.5"><DramaticShield className="w-3.5 h-3.5" /> Instant Access</span>
                    <span className="flex items-center gap-1.5"><DramaticCreditCard className="w-3.5 h-3.5" /> One-Time Fee</span>
                  </div>
                </div>
              </div>
            </div>
          </DramaticReveal>
        </Container>
      </section>

      <FloatingCTA />
      <Footer />
    </main>
  )
}

function HelpCircle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>
    </svg>
  )
}
