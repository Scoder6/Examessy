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
import { FAQ } from '@/components/faq'
import { ArrowRight, ArrowUpRight, Trophy, Users, TrendingUp, Brain, Target, Check, Star, Shield, Calendar, Clock, Lock, CreditCard, GraduationCap, MapPin, Quote, Layers, BookCheck, Sparkles, Zap, Globe, Lightbulb, BarChart3, Medal } from 'lucide-react'
import { IITDelhiIcon } from '@/components/icons/iit-delhi-icon'
import { AIIMSIcon } from '@/components/icons/aiims-icon'
import { BITSIcon } from '@/components/icons/bits-icon'
import { NITIcon } from '@/components/icons/nit-icon'
import { VITVelloreIcon } from '@/components/icons/vit-vellore-icon'
import { IIITIcon } from '@/components/icons/iiit-icon'
import { DTUIcon } from '@/components/icons/dtu-icon'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

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
  { label: 'Students Enrolled', value: 50000, suffix: '+', icon: Users, color: 'text-blue-500' },
  { label: 'Tests Conducted', value: 1200000, suffix: '+', icon: BarChart3, color: 'text-emerald-500' },
  { label: '99.9%+ Percentilers', value: 2500, suffix: '+', icon: Trophy, color: 'text-amber-500' },
  { label: 'Years of Excellence', value: 8, suffix: '+', icon: Calendar, color: 'text-violet-500' },
]

const features = [
  { icon: Brain, title: 'Expert-Curated Content', desc: 'Every question designed by India\'s top educators with 15+ years of experience in exam preparation.' },
  { icon: Target, title: 'Real Exam Simulation', desc: 'Offline test environment that exactly replicates the actual exam pattern, timing, and pressure.' },
  { icon: Trophy, title: '99.9%+ Track Record', desc: 'Our students consistently rank among the top 0.1% across all major entrance examinations.' },
  { icon: Users, title: 'Small Batch Sizes', desc: 'Personalized attention with maximum 30 students per batch for optimal learning outcomes.' },
  { icon: BarChart3, title: 'Detailed Performance Analysis', desc: 'Comprehensive post-test analytics with question-wise breakdown and improvement roadmap.' },
  { icon: Clock, title: 'Flexible Scheduling', desc: 'Multiple test slots available across all centers. Choose what works best for your preparation.' },
]

const processSteps = [
  { step: '01', title: 'Register & Enroll', desc: 'Sign up for your target exam and select your preferred test center location.', icon: BookCheck },
  { step: '02', title: 'Take Offline Tests', desc: 'Visit your chosen center and appear for full-length simulated tests under exam conditions.', icon: Layers },
  { step: '03', title: 'Analyze & Improve', desc: 'Get detailed performance reports, track your progress, and rank among peers.', icon: TrendingUp },
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
  const [visibleToppers, setVisibleToppers] = useState(12)
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
    <main className="min-h-screen bg-background selection:bg-primary/30">

      <Header showAuth={true} />

      {/* ===== HERO SECTION ===== */}
      <section className="min-h-screen flex items-center pt-28 pb-16">

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
                    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-semibold tracking-tighter leading-tight"
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
                    className="text-lg md:text-xl text-muted-foreground/80 max-w-lg leading-relaxed"
                  >
                    India's most results-driven offline test series. Join 50,000+ students who transformed their preparation into top ranks.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-wrap items-center gap-5"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push('/auth/sign-up')}
                    className="px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base tracking-wide shadow-lg hover:shadow-xl transition-all"
                  >
                    Enroll Now <ArrowRight className="w-4 h-4 ml-2 inline" />
                  </motion.button>

                  <Link href="/#results">
                    <Button variant="ghost" size="lg" className="rounded-2xl font-bold text-base gap-2 h-14">
                      View Results <ArrowUpRight className="w-4 h-4" />
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
                      50,000+ Students
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
                  className="flex flex-wrap items-center gap-8 pt-4 border-t border-border-subtle"
                >
                  {[
                    { label: 'Test Centers', val: '50+' },
                    { label: 'Mock Tests', val: '100+' },
                    { label: 'Success Rate', val: '94%' },
                  ].map((s, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-2xl md:text-3xl font-semibold font-display tracking-tight">{s.val}</span>
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
                  {/* Main card */}
                  <div className="absolute inset-0 rounded-[48px] bg-gradient-to-br from-primary/[0.08] via-secondary/[0.05] to-accent/[0.08] backdrop-blur-3xl border border-border-subtle shadow-2xl overflow-hidden">

                    {/* Content inside */}
                    <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                      <div className="space-y-8">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="px-4 py-1.5 rounded-xl text-[10px] font-semibold tracking-wide">
                            <span className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
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
                              <p className="text-4xl font-semibold font-display tracking-tighter">
                                AIR #3
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-5 rounded-2xl bg-card-bg-subtle border border-border-subtle space-y-2">
                              <GraduationCap className="w-5 h-5 text-primary/60" />
                              <p className="text-xs text-muted-foreground/40">Exams Covered</p>
                              <p className="text-xl font-semibold font-display">8+</p>
                            </div>
                            <div className="p-5 rounded-2xl bg-card-bg-subtle border border-border-subtle space-y-2">
                              <MapPin className="w-5 h-5 text-secondary/60" />
                              <p className="text-xs text-muted-foreground/40">Centers</p>
                              <p className="text-xl font-semibold font-display">50+</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/[0.06] to-secondary/[0.06] border border-border-subtle">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold tracking-wider text-muted-foreground/60 uppercase">Enrolled Today</span>
                          <span className="text-xs text-primary font-mono font-bold">+{Math.floor(Math.random() * 20) + 5}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-card-bg-subtle overflow-hidden">
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
                            50,000 Capacity
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          </Container>
        </motion.div>
      </section>

      {/* ===== TRUST MARQUEE ===== */}
      <section className="py-10 border-y border-border-subtle overflow-hidden">
        <Container size="2xl">
          <div className="flex items-center gap-8 mb-5">
            <span className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground/30 uppercase whitespace-nowrap">Trusted by students from</span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/[0.05] to-transparent" />
          </div>
          <div className="relative overflow-hidden">
            <div className="flex gap-16 flex-wrap justify-center" style={{ width: 'max-content' }}>
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
                <div key={node.name} className="flex items-center gap-3 text-muted-foreground/20">
                  <node.Icon className="w-4 h-4" />
                  <span className="text-xs font-semibold tracking-wide uppercase whitespace-nowrap">{node.name}</span>
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
              <Badge variant="secondary" className="px-4 py-1.5 rounded-full text-xs font-semibold">
                99.9%+ Percentilers
              </Badge>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold tracking-tighter leading-tight">
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
              <Button variant="outline" size="lg" className="rounded-2xl border-border-subtle h-14 font-bold group">
                View All Results <ArrowRight className="w-4 h-4 ml-2" />
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
                  <div className={`relative p-4 rounded-2xl ${student.bgGradient} border border-border-subtle backdrop-blur-sm bg-background/60 overflow-hidden group transition-all duration-300 hover:border-primary/30 hover:shadow-lg`}>

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
                            <Medal className="w-2.5 h-2.5 text-white" />
                          </div>
                        </div>
                        <div className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/20 shadow-sm">
                          <span className="text-[9px] font-semibold text-amber-500 tracking-wide">{student.percentile}%</span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold font-display tracking-tight leading-tight">{student.name}</h3>
                        <p className="text-[10px] text-muted-foreground/50 font-medium mt-0.5 flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" /> {student.city}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="px-2.5 py-1 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 shadow-sm">
                          <span className="text-[9px] font-bold text-primary">{student.exam}</span>
                        </div>
                        <div className="px-2.5 py-1 rounded-full bg-card-bg-subtle border border-border-subtle shadow-sm">
                          <span className="text-[9px] font-bold text-muted-foreground">{student.rank}</span>
                        </div>
                      </div>

                      {/* Score bar */}
                       <div className="space-y-1.5">
                        <div className="flex justify-between text-[9px] text-muted-foreground/40">
                          <span>Score</span>
                          <span className="font-bold text-foreground">{student.score}/{student.total}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-card-bg-subtle overflow-hidden shadow-inner">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${student.gradient} shadow-lg`}
                            initial={{ width: '0%' }}
                            whileInView={{ width: `${(student.score / student.total) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
                          />
                        </div>
                      </div>

                    </div>
                  </div>
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
                className="rounded-2xl border-border-subtle h-14 font-bold group px-8"
              >
                Show More Students <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}
        </Container>
      </section>

      {/* ===== STATS COUNTER ===== */}
      <section id="stats" ref={statsRef} className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
        <Container size="2xl" className="mt-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {statsData.map((stat, i) => {
              const Icon = stat.icon
              return (
                <Card key={i} className="rounded-3xl bg-card-bg-subtle border border-border-subtle text-center space-y-4 transition-all duration-300 hover:bg-card-bg-hover hover:border-border-subtle">
                  <CardContent className="p-8">
                    <motion.div
                      className={`w-14 h-14 rounded-2xl bg-card-bg-subtle border border-border-subtle flex items-center justify-center mx-auto transition-all duration-300 ${stat.color}`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Icon className="w-7 h-7" />
                    </motion.div>
                    <div className="space-y-1">
                      <p className="text-4xl md:text-5xl font-semibold font-display tracking-tight">
                        {stat.value}{stat.suffix}
                      </p>
                      <p className="text-sm text-muted-foreground/50 font-medium tracking-wide">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ===== WHY CHOOSE US / FEATURES ===== */}
      <section className="py-28 md:py-36 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.01] to-transparent pointer-events-none" />
        <Container size="2xl">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="secondary" className="px-4 py-1.5 rounded-full text-xs font-semibold">
              Why Examessy
            </Badge>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold tracking-tighter leading-tight">
              Engineered for{' '}
              <span className="text-primary">Excellence</span>
            </h2>
            <p className="text-lg text-muted-foreground/60 max-w-xl mx-auto">
              Every aspect of our program is designed to maximize your potential. Here's what makes us different.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <Card key={i} className={`rounded-3xl h-full bg-card-bg-subtle border border-border-subtle backdrop-blur-sm hover:border-primary/[0.12] transition-all duration-300 ${i === 0 ? 'lg:col-span-2 lg:row-span-1' : ''}`}>
                  <CardContent className={`p-8 md:p-10 ${i === 0 ? 'lg:p-12' : ''}`}>
                    <div className={`flex ${i === 0 ? 'lg:flex-row' : 'flex-col'} gap-6 ${i === 0 ? 'lg:items-center' : ''}`}>
                      <motion.div
                        className={`${i === 0 ? 'lg:w-16 lg:h-16' : ''} w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/[0.08] to-secondary/[0.08] border border-border-subtle flex items-center justify-center text-primary flex-shrink-0`}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Icon className={`${i === 0 ? 'lg:w-8 lg:h-8' : ''} w-7 h-7`} />
                      </motion.div>
                      <div className="space-y-3">
                        <h3 className={`font-semibold font-display tracking-tight ${i === 0 ? 'lg:text-3xl' : 'text-2xl'}`}>
                          {feature.title}
                        </h3>
                        <p className={`text-muted-foreground/60 leading-relaxed ${i === 0 ? 'lg:text-lg' : 'text-sm'}`}>{feature.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-primary/[0.01] pointer-events-none" />
        <Container size="2xl">
          <div className="text-center mb-20 space-y-4">
            <Badge variant="secondary" className="px-4 py-1.5 rounded-full text-xs font-semibold">
              Simple Process
            </Badge>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold tracking-tighter leading-tight">
              Your Journey in{' '}
              <span className="text-secondary">3 Steps</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {processSteps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} className="relative flex flex-col items-center text-center group">
                  <div className="relative mb-8">
                    <motion.div
                      className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/[0.08] to-secondary/[0.08] border border-border-subtle flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Icon className="w-10 h-10 text-primary" />
                    </motion.div>
                    <div className="absolute -top-3 -right-3 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-semibold shadow-lg">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold font-display tracking-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground/60 leading-relaxed max-w-xs">{step.desc}</p>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center mt-16">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/auth/sign-up')}
              className="px-12 py-5 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg tracking-wide shadow-lg hover:shadow-xl transition-all"
            >
              Start Your Journey <ArrowRight className="w-5 h-5 ml-3 inline" />
            </motion.button>
          </div>
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
              <Badge variant="secondary" className="px-4 py-1.5 rounded-full text-xs font-semibold">
                Success Stories
              </Badge>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold tracking-tighter leading-tight">
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
                <Card className={`relative p-8 md:p-10 rounded-3xl border border-border-subtle bg-gradient-to-br from-card-bg-subtle to-transparent backdrop-blur-sm h-full group ${i === 0 ? 'md:p-12' : ''}`}>
                  <CardContent>
                    <Quote className={`text-primary/10 mb-4 ${i === 0 ? 'md:w-12 md:h-12' : 'w-8 h-8'}`} />

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
                        <p className="font-semibold font-display tracking-tight">{t.name}</p>
                        <p className="text-xs text-muted-foreground/50 font-medium">{t.exam}</p>
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== PREVIOUS YEAR QUESTIONS ===== */}
      <section id="pyq" className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
        <Container size="2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <Badge variant="secondary" className="px-4 py-1.5 rounded-full text-xs font-semibold">
              <BookCheck className="w-3.5 h-3.5 mr-1.5" /> Previous Year Questions
            </Badge>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold tracking-tighter leading-tight">
              Questions That{' '}
              <span className="text-primary">Matter</span>
            </h2>
            <p className="text-lg text-muted-foreground/70 max-w-2xl mx-auto">
              Our question bank includes actual previous year questions. See how many of our questions appear in real exams.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { exam: 'JEE Mains', slug: 'jee_mains', percentage: 87, color: 'from-indigo-500 to-blue-600' },
              { exam: 'JEE Advanced', slug: 'jee_advanced', percentage: 82, color: 'from-blue-500 to-cyan-600' },
              { exam: 'NEET', slug: 'neet', percentage: 91, color: 'from-emerald-500 to-teal-600' },
              { exam: 'VIT', slug: 'vit', percentage: 79, color: 'from-violet-500 to-purple-600' },
              { exam: 'BITSAT', slug: 'bitsat', percentage: 85, color: 'from-orange-500 to-amber-600' },
              { exam: 'Manipal', slug: 'manipal', percentage: 77, color: 'from-pink-500 to-rose-600' },
            ].map((item, i) => (
              <motion.div
                key={item.exam}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => router.push(`/pyq/${item.slug}`)}
                className="cursor-pointer group"
              >
                <Card className="h-full rounded-3xl border border-border-subtle bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-display font-semibold tracking-tight">{item.exam}</h3>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-end justify-between">
                        <span className="text-5xl font-display font-bold text-foreground">{item.percentage}%</span>
                        <span className="text-sm text-muted-foreground mb-2">match rate</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-card-bg-subtle overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground/50">
                        {item.percentage}% of our questions appeared in actual {item.exam} exams
                      </p>
                    </div>
                  </CardContent>
                </Card>
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
              <Badge variant="secondary" className="px-5 py-1.5 rounded-full text-primary font-semibold tracking-wide text-[10px] uppercase">
                <HelpCircle className="w-3.5 h-3.5 mr-1.5" /> FAQ
              </Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tighter leading-tight">
                Got{' '}
                <span className="text-primary">Questions?</span>
                <br />We&apos;ve Got Answers
              </h2>
              <p className="text-muted-foreground/60 leading-relaxed">
                Everything you need to know about our offline test series program. Can&apos;t find what you&apos;re looking for? Reach out to us directly.
              </p>
              <div className="p-6 rounded-2xl bg-card-bg-subtle border border-border-subtle space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="text-sm font-bold">Support available 24/7</span>
                </div>
                <p className="text-xs text-muted-foreground/50">Our team is always ready to help you</p>
                <Link href="/contact">
                  <Button variant="outline" size="sm" fullWidth className="rounded-xl border-border-subtle h-12 font-bold text-xs tracking-wide mt-2 group">
                    Contact Us <ArrowRight className="w-3.5 h-3.5 ml-2" />
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

        <Container size="lg">
          <div className="relative text-center">
            <div className="relative p-10 md:p-16 lg:p-24 rounded-[40px] border border-white/[0.04] bg-gradient-to-br from-primary/[0.04] via-secondary/[0.02] to-accent/[0.04] backdrop-blur-sm overflow-hidden">

              <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
                <Badge variant="secondary" className="px-6 py-2 rounded-full text-xs font-semibold mx-auto w-fit">
                  Limited Seats Available
                </Badge>

                <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold tracking-tighter leading-tight">
                  Ready to Join the
                  <span className="relative z-10 text-accent block mt-2">
                    Top 0.1%?
                  </span>
                </h2>

                <p className="text-lg md:text-xl text-muted-foreground/70 max-w-2xl mx-auto leading-relaxed">
                  Join 50,000+ students who trusted Examessy for their preparation. Your journey to a top rank starts with a single step.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push('/auth/sign-up')}
                    className="px-12 py-5 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg tracking-wide shadow-lg hover:shadow-xl transition-all"
                  >
                    Enroll for ₹99 <ArrowRight className="w-5 h-5 ml-3 inline" />
                  </motion.button>

                  <Link href="/exams">
                    <Button variant="outline" className="rounded-2xl border border-white/[0.08] h-14 px-10 font-bold text-base gap-2">
                      Explore Exams <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center justify-center gap-6 pt-4 text-xs text-muted-foreground/40">
                  <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> Secure Payment</span>
                  <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Instant Access</span>
                  <span className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5" /> One-Time Fee</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
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
