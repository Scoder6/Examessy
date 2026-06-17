'use client'

import { useRouter, useParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Container } from '@/components/container'
import { Card, CardContent } from '@/components/card'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { BookCheck, ArrowLeft, ArrowRight, BookOpen, FileText } from 'lucide-react'
import { motion } from 'framer-motion'

const examData: Record<string, { name: string; color: string; percentage: number; chapters: Record<string, string[]> }> = {
  'jee_mains': { 
    name: 'JEE Mains', 
    color: 'from-indigo-500 to-blue-600', 
    percentage: 87,
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
    chapters: {
      'Physics': ['Units and Dimensions', 'Kinematics', 'Dynamics', 'Work Energy', 'Rotational Motion', 'Gravitation', 'Properties of Matter', 'Heat Thermodynamics', 'Sound', 'Light', 'Electricity', 'Magnetism', 'Modern Physics'],
      'Chemistry': ['Atomic Structure', 'Chemical Bonding', 'Periodic Properties', 'States of Matter', 'Chemical Thermodynamics', 'Chemical Equilibrium', 'Electrochemistry', 'Chemical Kinetics', 'Surface Chemistry', 'Basic Principles', 'Hydrogen', 's-Block Elements', 'p-Block Elements', 'Organic Chemistry', 'Hydrocarbons', 'Environmental Chemistry', 'Solid State', 'Solutions', 'Electrochemistry', 'Chemical Kinetics', 'General Principles', 'p-Block Elements', 'd and f Block', 'Coordination Compounds', 'Haloalkanes', 'Alcohols Phenols', 'Aldehydes Ketones', 'Amines', 'Biomolecules'],
      'Mathematics': ['Sets Relations Functions', 'Mathematical Induction', 'Complex Numbers', 'Linear Inequalities', 'Permutations Combinations', 'Binomial Theorem', 'Sequences Series', 'Matrices Determinants', 'Trigonometry', 'Two Dimensional Geometry', 'Conic Sections', 'Three Dimensional Geometry', 'Limits Continuity', 'Differentiation', 'Applications of Derivatives', 'Integrals', 'Applications of Integrals', 'Differential Equations', 'Probability']
    }
  },
}

const questions = [
  {
    id: 1,
    year: 2024,
    subject: 'Physics',
    chapter: 'Kinematics',
    question: 'A particle moves in a straight line with initial velocity u and constant acceleration a. The distance covered in the nth second is:',
    options: ['u + a(2n-1)/2', 'u + a(n-1)', 'u + an', 'u + a(2n+1)/2'],
    correctAnswer: 0,
    difficulty: 'Medium',
    appearedIn: ['JEE Mains 2024', 'JEE Advanced 2023'],
    explanation: 'Using the formula for distance covered in nth second: Sn = u + a(2n-1)/2',
  },
  {
    id: 2,
    year: 2024,
    subject: 'Chemistry',
    chapter: 'Chemical Bonding',
    question: 'Which of the following compounds will show geometrical isomerism?',
    options: ['2-Butene', 'Propene', 'Ethene', '1-Butene'],
    correctAnswer: 0,
    difficulty: 'Easy',
    appearedIn: ['JEE Mains 2024', 'NEET 2023'],
    explanation: '2-Butene has restricted rotation around the double bond, allowing cis-trans isomerism.',
  },
  {
    id: 3,
    year: 2023,
    subject: 'Mathematics',
    chapter: 'Integrals',
    question: 'The value of ∫₀^π x sin x dx is:',
    options: ['π', 'π/2', '2π', '0'],
    correctAnswer: 0,
    difficulty: 'Medium',
    appearedIn: ['JEE Mains 2023', 'BITSAT 2024'],
    explanation: 'Using integration by parts: ∫ x sin x dx = -x cos x + sin x. Evaluating from 0 to π gives π.',
  },
  {
    id: 4,
    year: 2024,
    subject: 'Biology',
    chapter: 'Cell: The Unit of Life',
    question: 'Which organelle is responsible for protein synthesis in a cell?',
    options: ['Mitochondria', 'Ribosome', 'Golgi apparatus', 'Lysosome'],
    correctAnswer: 1,
    difficulty: 'Easy',
    appearedIn: ['NEET 2024', 'Manipal 2023'],
    explanation: 'Ribosomes are the sites of protein synthesis in both prokaryotic and eukaryotic cells.',
  },
  {
    id: 5,
    year: 2023,
    subject: 'Physics',
    chapter: 'Gravitation',
    question: 'The escape velocity from Earth is 11.2 km/s. What would be the escape velocity from a planet with twice the mass and same radius?',
    options: ['11.2 km/s', '15.8 km/s', '22.4 km/s', '5.6 km/s'],
    correctAnswer: 1,
    difficulty: 'Hard',
    appearedIn: ['JEE Advanced 2023', 'VIT 2024'],
    explanation: 'Escape velocity ∝ √(M/R). If M doubles, escape velocity becomes √2 times = 11.2 × 1.414 ≈ 15.8 km/s',
  },
  {
    id: 6,
    year: 2024,
    subject: 'Chemistry',
    chapter: 'Atomic Structure',
    question: 'The hybridization of carbon in diamond is:',
    options: ['sp', 'sp²', 'sp³', 'sp³d'],
    correctAnswer: 2,
    difficulty: 'Easy',
    appearedIn: ['JEE Mains 2024', 'NEET 2024'],
    explanation: 'In diamond, each carbon atom forms four single bonds, requiring sp³ hybridization.',
  },
  {
    id: 7,
    year: 2023,
    subject: 'Physics',
    chapter: 'Electrostatics',
    question: 'Two point charges +q and -q are placed at a distance d apart. The electric potential at the midpoint is:',
    options: ['Zero', 'kq/d', '2kq/d', 'kq/2d'],
    correctAnswer: 0,
    difficulty: 'Medium',
    appearedIn: ['JEE Mains 2023', 'NEET 2023'],
    explanation: 'Electric potential is a scalar quantity. At the midpoint, potentials from +q and -q cancel out.',
  },
  {
    id: 8,
    year: 2024,
    subject: 'Mathematics',
    chapter: 'Limits Derivatives',
    question: 'The derivative of sin²x is:',
    options: ['2 sin x', '2 cos x', 'sin 2x', '2 sin x cos x'],
    correctAnswer: 3,
    difficulty: 'Easy',
    appearedIn: ['JEE Mains 2024', 'BITSAT 2023'],
    explanation: 'Using chain rule: d/dx(sin²x) = 2 sin x × cos x = sin 2x',
  },
  {
    id: 9,
    year: 2023,
    subject: 'Biology',
    chapter: 'Human Reproduction',
    question: 'The hormone produced by corpus luteum is:',
    options: ['Estrogen', 'Progesterone', 'FSH', 'LH'],
    correctAnswer: 1,
    difficulty: 'Medium',
    appearedIn: ['NEET 2023', 'Manipal 2024'],
    explanation: 'Corpus luteum secretes progesterone which maintains the endometrium during pregnancy.',
  },
  {
    id: 10,
    year: 2024,
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    question: 'For an isothermal process, which of the following is true?',
    options: ['ΔU = 0', 'ΔH = 0', 'ΔS = 0', 'ΔG = 0'],
    correctAnswer: 0,
    difficulty: 'Medium',
    appearedIn: ['JEE Mains 2024', 'NEET 2024'],
    explanation: 'In an isothermal process, temperature remains constant, so internal energy change ΔU = 0 for an ideal gas.',
  },
  {
    id: 11,
    year: 2023,
    subject: 'Physics',
    chapter: 'Optics',
    question: 'The phenomenon of total internal reflection occurs when light travels from:',
    options: ['Denser to rarer medium', 'Rarer to denser medium', 'Any medium to vacuum', 'Vacuum to any medium'],
    correctAnswer: 0,
    difficulty: 'Easy',
    appearedIn: ['JEE Mains 2023', 'VIT 2023'],
    explanation: 'Total internal reflection occurs when light travels from a denser medium to a rarer medium at an angle greater than the critical angle.',
  },
  {
    id: 12,
    year: 2024,
    subject: 'Mathematics',
    chapter: 'Probability',
    question: 'If P(A) = 0.3 and P(B) = 0.4, and A and B are independent, then P(A ∩ B) is:',
    options: ['0.7', '0.12', '0.1', '0.3'],
    correctAnswer: 1,
    difficulty: 'Easy',
    appearedIn: ['JEE Mains 2024', 'BITSAT 2024'],
    explanation: 'For independent events, P(A ∩ B) = P(A) × P(B) = 0.3 × 0.4 = 0.12',
  },
]

export default function SubjectPage() {
  const router = useRouter()
  const params = useParams()
  const examId = params.exam as string
  const subjectId = params.subject as string
  const exam = examData[examId]

  // Convert subject from URL (e.g., 'physics') to display name (e.g., 'Physics')
  const subjectName = Object.keys(exam?.chapters || {}).find(
    (s) => s.toLowerCase() === subjectId
  ) || subjectId

  const chapters = exam?.chapters[subjectName] || []

  if (!exam || !chapters.length) {
    return (
      <main className="min-h-screen bg-background">
        <Header showAuth={true} />
        <Container size="2xl" className="py-48">
          <Card className="p-12 text-center">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-4">Subject not found</h2>
              <Button onClick={() => router.push(`/pyq/${examId}`)}>Back to Subjects</Button>
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
              onClick={() => router.push(`/pyq/${examId}`)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Subjects
            </Button>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="px-4 py-1.5 rounded-full text-xs font-semibold">
                <BookCheck className="w-3.5 h-3.5 mr-1.5" /> {exam.name}
              </Badge>
              <Badge variant="outline" className="px-4 py-1.5 rounded-full text-xs font-semibold border-primary/20 text-primary">
                {subjectName}
              </Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-semibold tracking-tighter leading-tight">
              Choose Your{' '}
              <span className="text-primary">Chapter</span>
            </h1>
            <p className="text-lg text-muted-foreground/70 max-w-2xl">
              Select a chapter to browse previous year questions for {subjectName} in {exam.name}.
            </p>
          </motion.div>

          {/* Chapter Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((chapter, index) => {
              const chapterQuestions = questions.filter(
                (q) => q.chapter === chapter && q.subject === subjectName
              )
              return (
                <motion.div
                  key={chapter}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => router.push(`/pyq/${examId}/${subjectId}/${encodeURIComponent(chapter)}`)}
                  className="cursor-pointer group"
                >
                  <Card className="h-full rounded-3xl border border-border-subtle bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-8 space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-display font-semibold tracking-tight">{chapter}</h3>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <FileText className="w-4 h-4" />
                          <span>{chapterQuestions.length} questions</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {chapterQuestions.slice(0, 2).map((q) => (
                            <Badge key={q.id} variant="outline" className="text-xs border-white/[0.08]">
                              {q.year}
                            </Badge>
                          ))}
                          {chapterQuestions.length > 2 && (
                            <Badge variant="outline" className="text-xs border-white/[0.08]">
                              +{chapterQuestions.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
