'use client'

import { useRouter, useParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Container } from '@/components/container'
import { Card, CardContent } from '@/components/card'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { BookCheck, ArrowRight, ArrowLeft, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'

const examData: Record<string, { name: string; color: string; percentage: number; description: string; chapters: Record<string, string[]> }> = {
  'jee_mains': { 
    name: 'JEE Mains', 
    color: 'from-indigo-500 to-blue-600', 
    percentage: 87,
    description: 'Joint Entrance Examination Mains',
    chapters: {
      'Physics': ['Kinematics', 'Laws of Motion', 'Work Energy Power', 'Rotational Motion', 'Gravitation', 'Thermodynamics', 'Waves', 'Electrostatics', 'Current Electricity', 'Magnetism', 'Optics', 'Modern Physics'],
      'Chemistry': ['Atomic Structure', 'Chemical Bonding', 'States of Matter', 'Thermodynamics', 'Equilibrium', 'Redox Reactions', 'Organic Chemistry', 'Hydrocarbons', 'Environmental Chemistry'],
      'Mathematics': ['Sets Relations Functions', 'Trigonometry', 'Complex Numbers', 'Linear Inequalities', 'Permutations Combinations', 'Binomial Theorem', 'Sequences Series', 'Straight Lines', 'Conic Sections', 'Limits Derivatives', 'Integrals', 'Differential Equations']
    }
  },
  'jee_advanced': { 
    name: 'JEE Advanced', 
    color: 'from-blue-500 to-cyan-600', 
    percentage: 82,
    description: 'Joint Entrance Examination Advanced',
    chapters: {
      'Physics': ['Mechanics', 'Thermal Physics', 'Waves Optics', 'Electromagnetism', 'Modern Physics'],
      'Chemistry': ['Physical Chemistry', 'Inorganic Chemistry', 'Organic Chemistry'],
      'Mathematics': ['Algebra', 'Calculus', 'Coordinate Geometry', 'Vectors 3D Geometry']
    }
  },
  'neet': { 
    name: 'NEET', 
    color: 'from-emerald-500 to-teal-600', 
    percentage: 91,
    description: 'National Eligibility cum Entrance Test',
    chapters: {
      'Physics': ['Physical World', 'Units Measurements', 'Motion in Straight Line', 'Motion in Plane', 'Laws of Motion', 'Work Energy', 'System of Particles', 'Gravitation', 'Properties of Matter', 'Thermodynamics', 'Kinetic Theory', 'Oscillations', 'Waves', 'Electrostatics', 'Current Electricity', 'Magnetic Effects', 'Electromagnetic Induction', 'Optics', 'Dual Nature', 'Atoms', 'Nuclei'],
      'Chemistry': ['Some Basic Concepts', 'Structure of Atom', 'Classification of Elements', 'Chemical Bonding', 'States of Matter', 'Thermodynamics', 'Equilibrium', 'Redox Reactions', 'Hydrogen', 's-Block Elements', 'p-Block Elements', 'Organic Chemistry', 'Hydrocarbons', 'Environmental Chemistry', 'Solid State', 'Solutions', 'Electrochemistry', 'Chemical Kinetics', 'Surface Chemistry', 'General Principles', 'Hydrogen Compounds', 'p-Block Elements Group 15', 'p-Block Elements Group 16', 'p-Block Elements Group 17', 'p-Block Elements Group 18', 'd and f Block Elements', 'Coordination Compounds', 'Haloalkanes Haloarenes', 'Alcohols Phenols Ethers', 'Aldehydes Ketones Carboxylic Acids', 'Amines', 'Biomolecules'],
      'Biology': ['The Living World', 'Biological Classification', 'Plant Kingdom', 'Animal Kingdom', 'Morphology of Flowering Plants', 'Anatomy of Flowering Plants', 'Structural Organisation in Animals', 'Cell: The Unit of Life', 'Biomolecules', 'Cell Cycle and Cell Division', 'Transport in Plants', 'Mineral Nutrition', 'Photosynthesis', 'Respiration in Plants', 'Plant Growth and Development', 'Digestion and Absorption', 'Breathing and Exchange of Gases', 'Body Fluids and Circulation', 'Excretory Products', 'Locomotion and Movement', 'Neural Control and Coordination', 'Chemical Coordination', 'Reproduction in Organisms', 'Sexual Reproduction in Flowering Plants', 'Human Reproduction', 'Reproductive Health', 'Principles of Inheritance', 'Molecular Basis of Inheritance', 'Evolution', 'Human Health and Disease', 'Strategies for Enhancement', 'Microbes in Human Welfare', 'Principles and Processes', 'Biotechnology and its Applications', 'Organisms and Populations', 'Ecosystem', 'Biodiversity', 'Environmental Issues']
    }
  },
  'vit': { 
    name: 'VIT', 
    color: 'from-violet-500 to-purple-600', 
    percentage: 79,
    description: 'Vellore Institute of Technology',
    chapters: {
      'Physics': ['Mechanics', 'Properties of Matter', 'Thermodynamics', 'Optics', 'Electricity', 'Magnetism', 'Modern Physics'],
      'Chemistry': ['Basic Concepts', 'Atomic Structure', 'Chemical Bonding', 'States of Matter', 'Thermodynamics', 'Chemical Equilibrium', 'Electrochemistry', 'Organic Chemistry'],
      'Mathematics': ['Matrices', 'Determinants', 'Trigonometry', 'Complex Numbers', 'Analytical Geometry', 'Calculus', 'Differential Equations', 'Probability']
    }
  },
  'bitsat': { 
    name: 'BITSAT', 
    color: 'from-orange-500 to-amber-600', 
    percentage: 85,
    description: 'BITS Admission Test',
    chapters: {
      'Physics': ['Kinematics', 'Newton\'s Laws', 'Work Power Energy', 'Rotational Motion', 'Gravitation', 'Simple Harmonic Motion', 'Wave Motion', 'Heat Thermodynamics', 'Electrostatics', 'Current Electricity', 'Magnetic Effect', 'Electromagnetic Induction', 'Ray Optics', 'Wave Optics', 'Semiconductors'],
      'Chemistry': ['States of Matter', 'Atomic Structure', 'Chemical Bonding', 'Thermodynamics', 'Chemical Equilibrium', 'Electrochemistry', 'Chemical Kinetics', 'Surface Chemistry', 'Principles of Isolation', 'p-Block Elements', 'd and f Block', 'Coordination Compounds', 'Haloalkanes', 'Alcohols Phenols', 'Aldehydes Ketones', 'Amines', 'Biomolecules'],
      'Mathematics': ['Algebra', 'Trigonometry', 'Two Dimensional Geometry', 'Three Dimensional Geometry', 'Differential Calculus', 'Integral Calculus', 'Ordinary Differential Equations', 'Probability', 'Vectors', 'Linear Programming'],
      'English': ['Grammar', 'Vocabulary', 'Reading Comprehension', 'Composition'],
      'Logical Reasoning': ['Verbal Reasoning', 'Analogy', 'Classification', 'Series Completion', 'Logical Deduction']
    }
  },
  'manipal': { 
    name: 'Manipal', 
    color: 'from-pink-500 to-rose-600', 
    percentage: 77,
    description: 'Manipal Entrance Test',
    chapters: {
      'Physics': ['Units and Dimensions', 'Kinematics', 'Dynamics', 'Work Energy', 'Rotational Motion', 'Gravitation', 'Properties of Matter', 'Heat Thermodynamics', 'Sound', 'Light', 'Electricity', 'Magnetism', 'Modern Physics'],
      'Chemistry': ['Atomic Structure', 'Chemical Bonding', 'Periodic Properties', 'States of Matter', 'Chemical Thermodynamics', 'Chemical Equilibrium', 'Electrochemistry', 'Chemical Kinetics', 'Surface Chemistry', 'Basic Principles', 'Hydrogen', 's-Block Elements', 'p-Block Elements', 'Organic Chemistry', 'Hydrocarbons', 'Environmental Chemistry', 'Solid State', 'Solutions', 'Electrochemistry', 'Chemical Kinetics', 'General Principles', 'p-Block Elements', 'd and f Block', 'Coordination Compounds', 'Haloalkanes', 'Alcohols Phenols', 'Aldehydes Ketones', 'Amines', 'Biomolecules'],
      'Mathematics': ['Sets Relations Functions', 'Mathematical Induction', 'Complex Numbers', 'Linear Inequalities', 'Permutations Combinations', 'Binomial Theorem', 'Sequences Series', 'Matrices Determinants', 'Trigonometry', 'Two Dimensional Geometry', 'Conic Sections', 'Three Dimensional Geometry', 'Limits Continuity', 'Differentiation', 'Applications of Derivatives', 'Integrals', 'Applications of Integrals', 'Differential Equations', 'Probability']
    }
  },
}

const subjectIcons: Record<string, string> = {
  'Physics': '⚛️',
  'Chemistry': '🧪',
  'Mathematics': '📐',
  'Biology': '🧬',
  'English': '📝',
  'Logical Reasoning': '🧠',
}

export default function ExamPage() {
  const router = useRouter()
  const params = useParams()
  const examId = params.exam as string
  const exam = examData[examId]

  if (!exam) {
    return (
      <main className="min-h-screen bg-background">
        <Header showAuth={true} />
        <Container size="2xl" className="py-48">
          <Card className="p-12 text-center">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-4">Exam not found</h2>
              <Button onClick={() => router.push('/pyq')}>Back to Exams</Button>
            </CardContent>
          </Card>
        </Container>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">
      <Header showAuth={true} />

      <section className="pt-48 pb-24">
        <Container size="2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 space-y-6"
          >
            <Button
              variant="ghost"
              onClick={() => router.push('/pyq')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Exams
            </Button>
            <Badge variant="secondary" className="px-4 py-1.5 rounded-full text-xs font-semibold">
              <BookCheck className="w-3.5 h-3.5 mr-1.5" /> {exam.name}
            </Badge>
            <h1 className="text-5xl md:text-7xl font-display font-semibold tracking-tighter leading-tight">
              Choose Your{' '}
              <span className="text-primary">Subject</span>
            </h1>
            <p className="text-lg text-muted-foreground/70 max-w-2xl">
              Select a subject to browse chapter-wise previous year questions for {exam.name}.
            </p>
          </motion.div>

          {/* Subject Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(exam.chapters).map(([subject, chapters], index) => (
              <motion.div
                key={subject}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => router.push(`/pyq/${examId}/${subject.toLowerCase()}`)}
                className="cursor-pointer group"
              >
                <Card className="h-full rounded-3xl border border-border-subtle bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{subjectIcons[subject] || '📚'}</span>
                        <h3 className="text-2xl font-display font-semibold tracking-tight">{subject}</h3>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="w-4 h-4" />
                        <span>{chapters.length} chapters</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {chapters.slice(0, 3).map((chapter) => (
                          <Badge key={chapter} variant="outline" className="text-xs border-white/[0.08]">
                            {chapter}
                          </Badge>
                        ))}
                        {chapters.length > 3 && (
                          <Badge variant="outline" className="text-xs border-white/[0.08]">
                            +{chapters.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
