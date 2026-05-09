"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion"
import {
  Shield, UserCheck, Video, Brain, FileText, Scan, Calendar, Clock,
  MessageCircle, Sparkles, ShieldAlert, BarChart3, TrendingUp, CheckCircle2,
  Stethoscope, QrCode, ScanLine, Bell, ChevronRight, Play, X
} from "lucide-react"

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
}

// Counter animation hook
function useCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!startOnView || !isInView) return
    
    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [end, duration, isInView, startOnView])

  return { count, ref }
}

// Hero Section
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 200])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background orbs */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-20 left-10 w-96 h-96 rounded-full bg-vahy-teal/20 blur-3xl animate-orb-1"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-40 right-20 w-80 h-80 rounded-full bg-vahy-navy blur-3xl animate-orb-2"
      />
      <motion.div 
        style={{ y: y3 }}
        className="absolute bottom-20 left-1/3 w-72 h-72 rounded-full bg-purple-900/30 blur-3xl animate-orb-3"
      />
      
      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-30" />
      
      {/* Content */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div variants={fadeInUp} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-vahy-teal/30 text-sm font-medium text-vahy-text">
            <span>🇲🇬</span>
            <span>Fait pour Madagascar — Conçu pour l&apos;Afrique</span>
          </span>
        </motion.div>
        
        {/* Main heading */}
        <motion.h1 variants={fadeInUp} className="mb-6">
          <span className="block text-6xl md:text-8xl lg:text-9xl font-display font-black text-gradient tracking-tight">
            Vahy
          </span>
          <span className="block text-2xl md:text-4xl lg:text-5xl font-display font-bold text-vahy-text mt-4">
            L&apos;IA au chevet de Madagascar
          </span>
        </motion.h1>
        
        {/* Subheadline */}
        <motion.p variants={fadeInUp} className="text-lg md:text-xl text-vahy-muted mb-10 max-w-2xl mx-auto">
          7 modules. Des milliers de vies. Une seule plateforme.
        </motion.p>
        
        {/* CTAs */}
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="group relative px-8 py-4 rounded-xl font-semibold text-vahy-deep bg-gradient-to-r from-vahy-amber to-yellow-400 hover:shadow-lg hover:shadow-vahy-amber/25 transition-all duration-300 animate-pulse-glow">
            <span className="flex items-center gap-2 justify-center">
              Découvrir l&apos;écosystème
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <button className="px-8 py-4 rounded-xl font-semibold text-vahy-teal border-2 border-vahy-teal/50 hover:bg-vahy-teal/10 hover:border-vahy-teal transition-all duration-300 flex items-center gap-2 justify-center">
            <Play className="w-5 h-5" />
            Voir la démo
          </button>
        </motion.div>
        
        {/* Trust bar */}
        <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 text-sm text-vahy-muted flex-wrap">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-vahy-emerald animate-pulse" />
            Médecins vérifiés
          </span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-vahy-muted" />
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-vahy-emerald animate-pulse" />
            SMS + IA
          </span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-vahy-muted" />
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-vahy-emerald animate-pulse" />
            100% Malagasy
          </span>
        </motion.div>
      </motion.div>
      
      {/* EKG Line */}
      <svg className="absolute bottom-0 left-0 w-full h-24 opacity-20" viewBox="0 0 1200 100" preserveAspectRatio="none">
        <path
          d="M0,50 L200,50 L220,50 L240,20 L260,80 L280,10 L300,90 L320,50 L340,50 L500,50 L520,50 L540,20 L560,80 L580,10 L600,90 L620,50 L640,50 L800,50 L820,50 L840,20 L860,80 L880,10 L900,90 L920,50 L940,50 L1200,50"
          fill="none"
          stroke="url(#ekgGradient)"
          strokeWidth="2"
          strokeDasharray="1000"
          className="animate-ekg"
        />
        <defs>
          <linearGradient id="ekgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00C2C7" />
            <stop offset="100%" stopColor="#38EFF5" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  )
}

// Problem Statement Section
function ProblemSection() {
  const stats = [
    { value: 73, suffix: "%", label: "population sans accès aux soins spécialisés" },
    { value: 2.4, suffix: "h", label: "temps moyen de trajet vers un médecin", isDecimal: true },
    { value: 0, suffix: "", label: "système de suivi patient numérique existant" }
  ]

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Madagascar outline background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <svg viewBox="0 0 200 400" className="h-full max-h-96">
          <path
            d="M100,10 Q150,50 140,100 Q160,150 150,200 Q170,250 140,300 Q120,350 100,390 Q80,350 60,300 Q30,250 50,200 Q40,150 60,100 Q50,50 100,10"
            fill="none"
            stroke="#00C2C7"
            strokeWidth="2"
            strokeDasharray="1000"
            className="animate-ekg"
          />
        </svg>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-display font-bold text-vahy-text mb-4">
            La santé à Madagascar <span className="text-gradient">mérite mieux</span>
          </motion.h2>
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function StatCard({ value, suffix, label, isDecimal }: { value: number; suffix: string; label: string; isDecimal?: boolean }) {
  const { count, ref } = useCounter(isDecimal ? value * 10 : value, 2000)
  const displayValue = isDecimal ? (count / 10).toFixed(1) : count
  
  return (
    <motion.div 
      variants={fadeInUp}
      className="glass rounded-2xl p-8 text-center glass-hover transition-all duration-300"
    >
      <span ref={ref} className="block text-5xl md:text-6xl font-display font-black text-gradient mb-4">
        {displayValue}{suffix}
      </span>
      <span className="text-vahy-muted">{label}</span>
    </motion.div>
  )
}

// Module Grid Section
function ModuleGridSection() {
  const modules = [
    { id: 0, title: "Réseau Médecins", desc: "Médecins vérifiés, signatures numériques", icons: [Shield, UserCheck], wide: true },
    { id: 1, title: "Téléconsultation IA", desc: "Consultation à distance, guidée par l'IA", icons: [Video, Brain] },
    { id: 2, title: "Ordonnances Digitales", desc: "Prescription numérique sécurisée", icons: [FileText, Scan] },
    { id: 3, title: "Calendrier de Prise", desc: "Rappels automatiques de médication", icons: [Calendar, Clock] },
    { id: 4, title: "Suivi IA Conversationnel", desc: "LLM de suivi post-consultation", icons: [MessageCircle, Sparkles], tall: true },
    { id: 5, title: "Safety Sentinel", desc: "Détection d'interactions médicamenteuses", icons: [ShieldAlert] },
    { id: 6, title: "Analytics Santé", desc: "Données anonymisées pour la recherche", icons: [BarChart3, TrendingUp] }
  ]

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-display font-bold text-vahy-text mb-4">
            L&apos;Écosystème Vahy — <span className="text-gradient">7 Piliers</span>
          </motion.h2>
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr"
        >
          {modules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ModuleCard({ module }: { module: { id: number; title: string; desc: string; icons: React.ElementType[]; wide?: boolean; tall?: boolean } }) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  const springConfig = { stiffness: 300, damping: 20 }
  const animatedRotateX = useSpring(rotateX, springConfig)
  const animatedRotateY = useSpring(rotateY, springConfig)
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    setRotateX(-mouseY / 20)
    setRotateY(mouseX / 20)
  }
  
  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovered(false)
  }
  
  return (
    <motion.div
      ref={cardRef}
      variants={fadeInUp}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: animatedRotateX,
        rotateY: animatedRotateY,
        transformPerspective: 1000
      }}
      className={`glass rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
        module.wide ? "md:col-span-2" : ""
      } ${module.tall ? "md:row-span-2" : ""} ${
        isHovered ? "shadow-[0_0_30px_rgba(0,194,199,0.3)] border-vahy-teal/30" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-2">
          {module.icons.map((Icon, i) => (
            <div key={i} className="p-2 rounded-lg bg-vahy-teal/10">
              <Icon className="w-8 h-8 text-vahy-teal drop-shadow-[0_0_10px_rgba(0,194,199,0.5)]" />
            </div>
          ))}
        </div>
        <span className="font-mono text-sm text-vahy-amber font-bold">0{module.id}</span>
      </div>
      
      <h3 className="text-xl font-display font-bold text-vahy-text mb-2">{module.title}</h3>
      <p className="text-vahy-muted text-sm mb-4">{module.desc}</p>
      
      <motion.span 
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="inline-flex items-center gap-1 text-vahy-teal text-sm"
      >
        En savoir plus <ChevronRight className="w-4 h-4" />
      </motion.span>
    </motion.div>
  )
}

// Module 0 Deep Dive
function Module0Section() {
  const features = [
    "Seuls les médecins inscrits à l'Ordre peuvent s'inscrire",
    "Signature numérique juridiquement valide",
    "Profil visible et noté par les patients",
    "Zero fraude possible"
  ]
  
  const [typedText, setTypedText] = useState("")
  const fullText = "Empreinte sécurisée"
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  
  useEffect(() => {
    if (!isInView) return
    let i = 0
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i))
        i++
      } else {
        clearInterval(timer)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [isInView])

  return (
    <section ref={ref} className="py-24 px-4 bg-vahy-navy/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-vahy-amber font-mono text-sm">MODULE 00</motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-display font-bold text-vahy-text mt-2">
            La Confiance <span className="text-gradient">Commence Ici</span>
          </motion.h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Doctor Card Demo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-8"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-vahy-teal/30 to-vahy-cyan/10 flex items-center justify-center">
                <UserCheck className="w-10 h-10 text-vahy-teal" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-display font-bold text-vahy-text">Dr. Rakoto Andrianarisoa</h3>
                <p className="text-vahy-muted">Médecine Générale</p>
                <p className="text-vahy-muted text-sm font-mono">N° Ordre: MG-2024-1847</p>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-vahy-emerald/20 text-vahy-emerald text-sm font-semibold animate-pulse-glow">
                <Shield className="w-4 h-4" />
                <CheckCircle2 className="w-4 h-4" />
                VÉRIFIÉ
              </div>
            </div>
            
            {/* Signature */}
            <div className="border-t border-white/10 pt-6">
              <p className="text-vahy-muted text-sm mb-3">Signature numérique</p>
              <svg className="w-full h-16" viewBox="0 0 300 60">
                <motion.path
                  d="M10,40 Q30,10 50,35 T90,30 T130,40 T170,25 T210,35 T250,30 T290,35"
                  fill="none"
                  stroke="#00C2C7"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </svg>
              <p className="text-vahy-teal font-mono text-sm mt-2">
                {typedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >|</motion.span>
              </p>
            </div>
          </motion.div>
          
          {/* Features */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp} className="flex items-start gap-4">
                <svg className="w-6 h-6 text-vahy-emerald flex-shrink-0 mt-0.5" viewBox="0 0 24 24">
                  <motion.path
                    d="M5 13l4 4L19 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  />
                </svg>
                <span className="text-vahy-text">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Prescription Journey Timeline
function PrescriptionJourneySection() {
  const steps = [
    { icon: Stethoscope, title: "Médecin prescrit", tooltip: "Via app ou SMS" },
    { icon: QrCode, title: "QR Code généré", tooltip: "Unique et sécurisé" },
    { icon: ScanLine, title: "Pharmacien scanne", tooltip: "Vérification instantanée" },
    { icon: Calendar, title: "Calendrier auto-généré", tooltip: "Rappels personnalisés" }
  ]
  
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-vahy-amber font-mono text-sm">MODULES 02 & 03</motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-display font-bold text-vahy-text mt-2">
            De l&apos;Ordonnance au Rappel <span className="text-gradient">en 3 Secondes</span>
          </motion.h2>
        </motion.div>
        
        {/* Timeline - Desktop */}
        <div className="hidden md:block">
          <div className="relative flex items-center justify-between">
            {/* Connecting line */}
            <motion.div 
              className="absolute top-12 left-0 h-1 bg-gradient-to-r from-vahy-teal to-vahy-cyan rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full glass flex items-center justify-center mb-4 border-2 border-vahy-teal/30">
                  <step.icon className="w-10 h-10 text-vahy-teal" />
                </div>
                <h3 className="font-display font-bold text-vahy-text">{step.title}</h3>
                <p className="text-vahy-muted text-sm">{step.tooltip}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Timeline - Mobile */}
        <div className="md:hidden space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex items-center gap-4"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full glass flex items-center justify-center border-2 border-vahy-teal/30">
                  <step.icon className="w-8 h-8 text-vahy-teal" />
                </div>
                {index < steps.length - 1 && (
                  <motion.div 
                    className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-vahy-teal to-vahy-cyan"
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.2 + 0.5 }}
                  />
                )}
              </div>
              <div>
                <h3 className="font-display font-bold text-vahy-text">{step.title}</h3>
                <p className="text-vahy-muted text-sm">{step.tooltip}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Mini notifications */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, delay: 1.5, type: "spring", stiffness: 200 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {["08:00", "14:00", "20:00"].map((time, index) => (
            <motion.div
              key={time}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 1.8 + index * 0.2 }}
              className="glass px-4 py-2 rounded-full flex items-center gap-2"
            >
              <Bell className="w-4 h-4 text-vahy-amber" />
              <span className="font-mono text-sm text-vahy-text">{time}</span>
              <span className="text-vahy-muted text-sm">Rappel</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Module 4 - AI Conversation Showcase
function Module4Section() {
  const messages = [
    { from: "ai", text: "Bonjour Marie! Comment vous sentez-vous depuis votre consultation?" },
    { from: "user", text: "Mieux merci, mais toujours un peu fatiguée" },
    { from: "ai", text: "Avez-vous pris vos médicaments ce matin? 💊" },
    { from: "user", text: "Oui ✓" },
    { from: "ai", text: "Parfait! Je transmets ce rapport à Dr. Rakoto 📋" }
  ]
  
  const thinkingTexts = [
    "Analyse de votre dossier...",
    "Génération du questionnaire...",
    "Envoi du suivi..."
  ]
  
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [thinkingIndex, setThinkingIndex] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  
  useEffect(() => {
    if (!isInView) return
    
    const messageTimers: NodeJS.Timeout[] = []
    messages.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleMessages(index + 1)
      }, index * 1500)
      messageTimers.push(timer)
    })
    
    // Loop animation
    const loopTimer = setInterval(() => {
      setVisibleMessages(0)
      setTimeout(() => {
        messages.forEach((_, index) => {
          setTimeout(() => setVisibleMessages(index + 1), index * 1500)
        })
      }, 500)
    }, 12000)
    
    return () => {
      messageTimers.forEach(clearTimeout)
      clearInterval(loopTimer)
    }
  }, [isInView])
  
  useEffect(() => {
    const interval = setInterval(() => {
      setThinkingIndex((prev) => (prev + 1) % thinkingTexts.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={ref} className="py-24 px-4 bg-vahy-navy/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-vahy-amber font-mono text-sm">MODULE 04</motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-display font-bold text-vahy-text mt-2">
            Votre Ange Gardien <span className="text-gradient">Numérique</span>
          </motion.h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Copy */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-display font-bold text-vahy-text mb-4">
              L&apos;IA qui vous pose les bonnes questions
            </h3>
            <p className="text-vahy-muted mb-6">
              48h après votre consultation, Vahy vous contacte par SMS ou app
            </p>
            
            {/* AI Thinking indicator */}
            <div className="glass rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-vahy-teal typing-dot-1" />
                  <span className="w-2 h-2 rounded-full bg-vahy-teal typing-dot-2" />
                  <span className="w-2 h-2 rounded-full bg-vahy-teal typing-dot-3" />
                </div>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={thinkingIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-vahy-muted text-sm"
                  >
                    {thinkingTexts[thinkingIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            
            <div className="glass rounded-xl p-4 border-vahy-amber/30">
              <p className="text-vahy-amber font-semibold text-sm">
                💡 Vahy fonctionne SANS internet — SMS d&apos;abord, IA quand possible
              </p>
            </div>
          </motion.div>
          
          {/* Right - Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative w-72 md:w-80">
              {/* Phone frame */}
              <div className="relative bg-vahy-deep rounded-[40px] p-2 border-4 border-vahy-navy shadow-2xl">
                {/* Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-vahy-deep rounded-full z-10" />
                
                {/* Screen */}
                <div className="bg-vahy-navy rounded-[32px] overflow-hidden">
                  {/* Header */}
                  <div className="glass p-4 flex items-center gap-3 border-b border-white/10">
                    <div className="w-10 h-10 rounded-full bg-vahy-teal/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-vahy-teal" />
                    </div>
                    <div>
                      <p className="font-semibold text-vahy-text text-sm">Vahy IA</p>
                      <p className="text-xs text-vahy-emerald flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-vahy-emerald" />
                        En ligne
                      </p>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="p-4 space-y-3 min-h-80 max-h-96 overflow-y-auto">
                    {messages.slice(0, visibleMessages).map((msg, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: msg.from === "ai" ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                          msg.from === "ai" 
                            ? "bg-vahy-teal/20 text-vahy-text rounded-bl-sm" 
                            : "bg-vahy-amber/20 text-vahy-text rounded-br-sm"
                        }`}>
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}
                    
                    {visibleMessages === messages.length && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex justify-start"
                      >
                        <span className="px-3 py-1 rounded-full bg-vahy-emerald/20 text-vahy-emerald text-xs font-semibold flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          IA Active
                        </span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Safety Sentinel Section
function SafetySentinelSection() {
  const threats = [
    { icon: "⚠️", text: "Interaction détectée: Warfarine + Aspirine", type: "warning" },
    { icon: "✅", text: "Dosage validé pour l'âge du patient", type: "success" },
    { icon: "🔴", text: "Allergie connue — Alerte envoyée au médecin", type: "danger" }
  ]
  
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-vahy-amber font-mono text-sm">MODULE 05</motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-display font-bold text-vahy-text mt-2">
            Votre Bouclier <span className="text-gradient">Contre les Erreurs Médicales</span>
          </motion.h2>
        </motion.div>
        
        <div className="flex flex-col items-center">
          {/* Shield with rings */}
          <div className="relative mb-12">
            {/* Pulse rings */}
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                className="absolute inset-0 rounded-full border-2 border-vahy-teal/30"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={isInView ? {
                  scale: [1, 2],
                  opacity: [0.6, 0]
                } : {}}
                transition={{
                  duration: 2,
                  delay: ring * 0.5,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            ))}
            
            {/* Rotating ring */}
            <motion.div
              className="absolute -inset-4 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, transparent, #00C2C7, transparent)"
              }}
              animate={isInView ? { rotate: 360 } : {}}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Shield icon */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="relative w-32 h-32 rounded-full glass flex items-center justify-center"
            >
              <ShieldAlert className="w-16 h-16 text-vahy-teal" />
            </motion.div>
          </div>
          
          {/* Threat cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-4 w-full max-w-4xl"
          >
            {threats.map((threat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className={`glass rounded-xl p-4 border-l-4 ${
                  threat.type === "warning" ? "border-yellow-500" :
                  threat.type === "success" ? "border-vahy-emerald" :
                  "border-red-500"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{threat.icon}</span>
                  <p className="text-vahy-text text-sm">{threat.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Impact Section
function ImpactSection() {
  const stats = [
    { value: 7, label: "modules intégrés" },
    { value: 23, label: "districts couverts (phase 1)" },
    { value: "∞", label: "vies potentiellement sauvées", isSymbol: true },
    { value: 1, label: "écosystème unifié" }
  ]
  
  const pillars = [
    { icon: "📶", text: "Zones sans réseau: SMS de base suffisent" },
    { icon: "🌍", text: "Interface en Malagasy, Français, et dialectes régionaux" },
    { icon: "♿", text: "Accessible aux non-alphabétisés via vocal" }
  ]

  return (
    <section className="py-24 px-4 bg-vahy-navy/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-display font-bold text-vahy-text">
            Une technologie qui respire <span className="text-gradient">avec Madagascar</span>
          </motion.h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left - Inclusion */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass rounded-xl p-6 border-vahy-amber/30 mb-8">
              <p className="text-vahy-amber font-semibold">
                Vahy fonctionne SANS internet — SMS d&apos;abord, IA quand possible
              </p>
            </div>
            
            <div className="space-y-4">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-start gap-4"
                >
                  <span className="text-2xl">{pillar.icon}</span>
                  <span className="text-vahy-text">{pillar.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Right - Stats */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <ImpactStatCard key={index} {...stat} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ImpactStatCard({ value, label, isSymbol }: { value: number | string; label: string; isSymbol?: boolean }) {
  const { count, ref } = useCounter(typeof value === "number" ? value : 0, 2000)
  
  return (
    <motion.div variants={fadeInUp} className="glass rounded-xl p-6 text-center">
      <span ref={ref} className="block text-4xl font-display font-black text-gradient mb-2">
        {isSymbol ? value : count}
      </span>
      <span className="text-vahy-muted text-sm">{label}</span>
    </motion.div>
  )
}

// Video Section
function VideoSection() {
  return (
    <section id="video" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-display font-bold text-vahy-text mb-4">
            Découvrez Vahy en Action <span className="text-gradient">Vidéo Présentation</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-vahy-muted">
            Voir comment Vahy transforme l&apos;accès aux soins de santé à Madagascar
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-2 overflow-hidden"
        >
          <video
            width="100%"
            height="auto"
            controls
            className="w-full h-auto rounded-2xl bg-vahy-navy"
          >
            <source 
              src="https://res.cloudinary.com/dyeebnukv/video/upload/v1778357448/Vahy_presentation_dg8n8m.mp4" 
              type="video/mp4" 
            />
            Votre navigateur ne supporte pas la balise vidéo.
          </video>
        </motion.div>
      </div>
    </section>
  )
}

// Final CTA Section
function CTASection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative glass rounded-3xl p-12 overflow-hidden"
        >
          {/* Animated border */}
          <div className="absolute inset-0 rounded-3xl animate-gradient" style={{
            background: "linear-gradient(90deg, #00C2C7, #F5A623, #00C2C7)",
            backgroundSize: "200% 100%",
            padding: "2px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude"
          }} />
          
          <h2 className="text-3xl md:text-5xl font-display font-bold text-vahy-text mb-6">
            Vahy est prêt. <span className="text-gradient">Madagascar aussi.</span>
          </h2>
          
          <button className="group relative px-10 py-5 rounded-xl font-semibold text-vahy-deep bg-gradient-to-r from-vahy-amber to-yellow-400 hover:shadow-lg hover:shadow-vahy-amber/25 transition-all duration-300 text-lg">
            <span className="flex items-center gap-2 justify-center">
              Rejoindre l&apos;aventure
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-vahy-muted text-sm">
            <span>Ministère de la Santé</span>
            <span className="w-1 h-1 rounded-full bg-vahy-muted" />
            <span>CISCO</span>
            <span className="w-1 h-1 rounded-full bg-vahy-muted" />
            <span>Partenaires</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-display font-black text-gradient">Vahy</span>
          <span className="text-vahy-muted">© 2024</span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-vahy-text">Made in Madagascar</span>
          <span className="text-2xl">🇲🇬</span>
        </div>
      </div>
    </footer>
  )
}

// Main Page Component
export default function VahyLandingPage() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const cursorX = useSpring(0, { stiffness: 500, damping: 50 })
  const cursorY = useSpring(0, { stiffness: 500, damping: 50 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [cursorX, cursorY])

  return (
    <main className="min-h-screen bg-vahy-deep text-vahy-text overflow-x-hidden">
      {/* Cursor glow - hidden on mobile */}
      <motion.div
        className="fixed w-64 h-64 rounded-full pointer-events-none z-50 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(0,194,199,0.1) 0%, transparent 70%)"
        }}
      />
      
      <HeroSection />
      <ProblemSection />
      <ModuleGridSection />
      <Module0Section />
      <PrescriptionJourneySection />
      <Module4Section />
      <SafetySentinelSection />
      <ImpactSection />
      <VideoSection />
      <CTASection />
      <Footer />
    </main>
  )
}
