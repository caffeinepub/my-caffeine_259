import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  Brain,
  ChevronDown,
  Clock,
  FileText,
  Heart,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Shield,
  Smile,
  Star,
  Sun,
  Wind,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { BottomNav } from "./components/BottomNav";

const PHOTOS = [
  {
    src: "/assets/uploads/1_1770612275298-3-1.jpg",
    alt: "योग शिविर प्रचार पोस्टर",
    caption: "निःशुल्क योग सेवा शिविर",
  },
  {
    src: "/assets/uploads/IMG_20260304_065449-2.jpg",
    alt: "योग प्रतिभागियों का समूह फोटो",
    caption: "प्रातःकालीन योग सत्र",
  },
  {
    src: "/assets/uploads/IMG_20260304_065451-3-3.jpg",
    alt: "योग प्रतिभागियों का समूह फोटो 2",
    caption: "सामुदायिक योग अभ्यास",
  },
  {
    src: "/assets/uploads/IMG_20260304_065459-4.jpg",
    alt: "योग प्रतिभागियों का समूह फोटो 3",
    caption: "हनुमानगढ़ योग परिवार",
  },
  {
    src: "/assets/uploads/IMG_20260304_065457-3-5.jpg",
    alt: "योग प्रतिभागियों का समूह फोटो 4",
    caption: "निःशुल्क योग केंद्र",
  },
];

const BENEFITS = [
  {
    icon: Activity,
    title: "शारीरिक स्वास्थ्य",
    desc: "नियमित योग से शरीर को शक्ति, लचीलापन और संतुलन प्राप्त होता है",
  },
  {
    icon: Brain,
    title: "मानसिक शांति",
    desc: "योगाभ्यास से मन की एकाग्रता और आंतरिक शांति बढ़ती है",
  },
  {
    icon: Smile,
    title: "तनाव मुक्ति",
    desc: "योग और प्राणायाम से तनाव, चिंता और अवसाद दूर होते हैं",
  },
  {
    icon: Wind,
    title: "लचीलापन",
    desc: "सूर्यनमस्कार और आसनों से शरीर का लचीलापन बढ़ता है",
  },
  {
    icon: Shield,
    title: "रोग प्रतिरोधक क्षमता",
    desc: "नियमित अभ्यास से शरीर की रोग प्रतिरोधक शक्ति मजबूत होती है",
  },
  {
    icon: Zap,
    title: "आत्मिक शांति",
    desc: "ध्यान और योग से आत्मा को गहरी शांति और संतुष्टि मिलती है",
  },
];

function LotusDecor({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block opacity-40 select-none ${className}`}
      aria-hidden
    >
      🪷
    </span>
  );
}

function OMSymbol({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block font-display select-none ${className}`}
      aria-hidden
    >
      ॐ
    </span>
  );
}

function SectionTitle({
  hindi,
  english,
}: {
  hindi: string;
  english: string;
}) {
  return (
    <motion.div
      className="text-center mb-14"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="flex items-center justify-center gap-3 mb-5">
        <div className="section-divider w-16" />
        <LotusDecor className="text-2xl" />
        <div className="section-divider w-16" />
      </div>
      <h2 className="font-hindi font-bold text-3xl sm:text-4xl md:text-5xl text-foreground mb-3">
        {hindi}
      </h2>
      <p className="font-body text-muted-foreground text-base sm:text-lg">
        {english}
      </p>
    </motion.div>
  );
}

function NavBar({
  isMobileOpen,
  setMobileOpen,
}: {
  isMobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { href: "#hero", label: "मुख्य" },
    { href: "#schedule", label: "समय व स्थान" },
    { href: "#benefits", label: "योग लाभ" },
    { href: "#gallery", label: "गैलरी" },
    { href: "#contact", label: "संपर्क" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-[0_2px_20px_oklch(var(--saffron)/0.15)] border-b border-saffron/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <a
          href="#hero"
          data-ocid="nav.link"
          className="flex items-center gap-2.5 group"
          aria-label="मुख्य पृष्ठ"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 shadow-md ring-2 ring-saffron/30 group-hover:ring-saffron/60 transition-all">
            <img
              src="/assets/generated/yoga-app-icon-transparent.dim_512x512.png"
              alt="योग icon"
              className="w-full h-full object-cover"
              width={40}
              height={40}
            />
          </div>
          <span className="font-hindi font-bold text-sm sm:text-base text-foreground leading-tight">
            <span
              className={`block ${scrolled ? "text-saffron-deep" : "text-white"} transition-colors`}
            >
              निःशुल्क योग
            </span>
            <span
              className={`block text-xs ${scrolled ? "text-forest" : "text-white/80"} transition-colors`}
            >
              हनुमानगढ़
            </span>
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-ocid="nav.link"
                className={`px-3 py-2 text-sm font-hindi font-medium transition-colors rounded-md hover:bg-saffron/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron ${
                  scrolled
                    ? "text-foreground hover:text-saffron-deep"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/admission"
              data-ocid="nav.admission_link"
              className={`px-3 py-2 text-sm font-hindi font-semibold transition-colors rounded-md hover:bg-saffron/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron flex items-center gap-1.5 ${
                scrolled
                  ? "text-saffron-deep hover:text-saffron-deep"
                  : "text-gold hover:text-gold"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              प्रवेश फॉर्म
            </Link>
          </li>
        </ul>

        {/* WhatsApp CTA */}
        <a
          href="https://wa.me/919057036745"
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="nav.primary_button"
          className="hidden md:flex items-center gap-2 bg-forest text-white text-sm font-body font-semibold px-4 py-2 rounded-full hover:bg-forest-light transition-all shadow-forest hover:shadow-lg hover:scale-105 active:scale-95"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!isMobileOpen)}
          data-ocid="nav.toggle"
          className={`md:hidden p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron ${
            scrolled
              ? "text-foreground hover:bg-saffron/10"
              : "text-white hover:bg-white/10"
          }`}
          aria-label={isMobileOpen ? "मेनू बंद करें" : "मेनू खोलें"}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-cream/98 backdrop-blur-md border-t border-saffron/20"
          >
            <ul className="flex flex-col px-4 py-3 gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-ocid="nav.link"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 font-hindi text-base text-foreground hover:text-saffron-deep hover:bg-saffron/10 rounded-lg transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/admission"
                  data-ocid="nav.admission_link"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 font-hindi text-base text-saffron-deep hover:text-saffron-deep hover:bg-saffron/10 rounded-lg transition-colors font-semibold"
                >
                  <FileText className="w-4 h-4" />
                  प्रवेश फॉर्म
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href="https://wa.me/919057036745"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="nav.primary_button"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 bg-forest text-white font-body font-semibold px-4 py-3 rounded-full hover:bg-forest-light transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp पर जुड़ें</span>
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      data-ocid="hero.section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/uploads/1_1770612275298-1.jpg"
          alt="योग शिविर पोस्टर"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 hero-overlay" />
        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Decorative OM */}
      <motion.div
        className="absolute top-28 right-6 sm:right-12 text-8xl sm:text-9xl text-white/8 font-display select-none"
        animate={{ rotate: [0, 4, -4, 0], scale: [1, 1.04, 0.97, 1] }}
        transition={{
          duration: 14,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        aria-hidden
      >
        ॐ
      </motion.div>

      {/* Lotus bottom-left */}
      <motion.div
        className="absolute bottom-16 left-6 text-5xl select-none opacity-20"
        animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        aria-hidden
      >
        🪷
      </motion.div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Badge className="mb-6 bg-saffron/25 text-white border-saffron/50 font-hindi text-sm px-5 py-2 backdrop-blur-sm">
            <Star className="w-3.5 h-3.5 mr-1.5 fill-current text-gold" />
            बिल्कुल निःशुल्क · Free for Everyone
          </Badge>
        </motion.div>

        <motion.h1
          className="font-hindi font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-5"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
        >
          निःशुल्क योग कक्षाएं
          <br />
          <span className="text-gold font-display italic">हनुमानगढ़</span>
        </motion.h1>

        <motion.p
          className="font-hindi text-xl sm:text-2xl md:text-3xl text-white/90 mb-4 max-w-2xl mx-auto font-semibold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          स्वस्थ जीवन की ओर एक कदम
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 text-white/75 font-hindi text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gold" />
            प्रतिदिन सुबह 5:00 बजे
          </span>
          <span className="hidden sm:block text-white/40">·</span>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gold" />
            अम्बेडकर भवन, हनुमानगढ़
          </span>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <a
            href="https://wa.me/919057036745"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.primary_button"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-forest hover:bg-forest-light text-white font-body font-bold px-8 py-4 rounded-full transition-all shadow-forest hover:shadow-xl hover:scale-105 active:scale-95 text-base min-h-[44px]"
          >
            <MessageCircle className="w-5 h-5" />
            तुषार वर्मा — WhatsApp
          </a>
          <a
            href="tel:+919024783339"
            data-ocid="hero.secondary_button"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-saffron hover:bg-saffron-deep text-white font-body font-bold px-8 py-4 rounded-full transition-all shadow-saffron hover:shadow-xl hover:scale-105 active:scale-95 text-base min-h-[44px]"
          >
            <Phone className="w-5 h-5" />
            कॉल करें
          </a>
          <Link
            to="/admission"
            data-ocid="hero.admission_button"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-transparent hover:bg-gold/20 text-gold border-2 border-gold/60 hover:border-gold font-body font-bold px-8 py-4 rounded-full transition-all hover:shadow-xl hover:scale-105 active:scale-95 text-base backdrop-blur-sm min-h-[44px]"
          >
            <FileText className="w-5 h-5" />
            प्रवेश फॉर्म भरें
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60"
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        aria-hidden
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}

function ScheduleSection() {
  return (
    <section
      id="schedule"
      data-ocid="schedule.section"
      className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-br from-saffron-deep to-[oklch(0.45_0.15_45)] relative overflow-hidden grain-texture"
    >
      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-[0.07]" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.5) 39px, rgba(255,255,255,0.5) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.5) 39px, rgba(255,255,255,0.5) 40px)",
          }}
        />
      </div>

      {/* Big OM watermark */}
      <div
        className="absolute -right-8 top-1/2 -translate-y-1/2 text-white/[0.04] font-display select-none pointer-events-none"
        style={{ fontSize: "20rem", lineHeight: 1 }}
        aria-hidden
      >
        ॐ
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-16 bg-white/30" />
            <LotusDecor className="text-2xl" />
            <div className="h-px w-16 bg-white/30" />
          </div>
          <h2 className="font-hindi font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-3">
            कक्षा का समय
          </h2>
          <p className="font-body text-white/70 text-base sm:text-lg">
            Class Schedule & Details
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {/* Timing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0 }}
          >
            <Card className="h-full bg-white/12 backdrop-blur-md border-white/25 text-white overflow-hidden hover:bg-white/18 transition-all">
              <CardContent className="p-7">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
                  <Clock className="w-7 h-7 text-gold" />
                </div>
                <p className="font-body text-white/60 text-xs uppercase tracking-widest mb-2">
                  Daily Timing
                </p>
                <h3 className="font-hindi font-bold text-2xl sm:text-3xl text-white mb-2 leading-tight">
                  सुबह 5:00 बजे
                </h3>
                <p className="font-hindi text-white/75 text-sm leading-relaxed">
                  प्रतिदिन (Every Morning)
                </p>
                <Badge className="mt-4 bg-gold/20 text-gold border-gold/30 font-hindi text-xs">
                  <Sun className="w-3 h-3 mr-1" />
                  प्रातःकालीन योग
                </Badge>
              </CardContent>
            </Card>
          </motion.div>

          {/* Instructor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <Card className="h-full bg-white/12 backdrop-blur-md border-white/25 text-white overflow-hidden hover:bg-white/18 transition-all">
              <CardContent className="p-7">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
                  <Heart className="w-7 h-7 text-gold" />
                </div>
                <p className="font-body text-white/60 text-xs uppercase tracking-widest mb-2">
                  Instructor
                </p>
                <h3 className="font-hindi font-bold text-xl sm:text-2xl text-white mb-2 leading-tight">
                  श्री रतिराम जी सहारण
                </h3>
                <p className="font-hindi text-white/75 text-sm leading-relaxed">
                  अनुभवी योग प्रशिक्षक
                </p>
                <Badge className="mt-4 bg-gold/20 text-gold border-gold/30 font-hindi text-xs">
                  <Leaf className="w-3 h-3 mr-1" />
                  प्रमाणित प्रशिक्षक
                </Badge>
              </CardContent>
            </Card>
          </motion.div>

          {/* Free Entry */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.24 }}
          >
            <Card className="h-full bg-white/12 backdrop-blur-md border-white/25 text-white overflow-hidden hover:bg-white/18 transition-all">
              <CardContent className="p-7">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
                  <Star className="w-7 h-7 text-gold fill-gold" />
                </div>
                <p className="font-body text-white/60 text-xs uppercase tracking-widest mb-2">
                  Entry Fee
                </p>
                <h3 className="font-hindi font-bold text-2xl sm:text-3xl text-white mb-2 leading-tight">
                  बिल्कुल निःशुल्क
                </h3>
                <p className="font-hindi text-white/75 text-sm leading-relaxed">
                  सभी के लिए — Completely Free
                </p>
                <Badge className="mt-4 bg-gold/20 text-gold border-gold/30 font-hindi text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  कोई शुल्क नहीं
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="font-hindi text-white/75 text-lg mb-6">
            आज ही जुड़ें — किसी शुल्क की आवश्यकता नहीं
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919057036745"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="schedule.primary_button"
              className="inline-flex items-center justify-center gap-2.5 bg-white text-saffron-deep font-body font-bold px-8 py-4 rounded-full hover:bg-cream transition-all shadow-xl hover:scale-105 active:scale-95 text-base"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp पर जुड़ें
            </a>
            <Link
              to="/admission"
              data-ocid="schedule.admission_button"
              className="inline-flex items-center justify-center gap-2.5 bg-transparent border-2 border-white/50 hover:border-white text-white font-body font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-all hover:scale-105 active:scale-95 text-base"
            >
              <FileText className="w-5 h-5" />
              प्रवेश फॉर्म भरें
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section
      id="location"
      data-ocid="location.section"
      className="py-20 sm:py-28 px-4 sm:px-6 bg-cream relative overflow-hidden"
    >
      {/* Decorative watermark */}
      <div
        className="absolute top-0 left-0 w-72 h-72 opacity-[0.03] text-saffron select-none pointer-events-none"
        aria-hidden
        style={{ fontSize: "18rem", lineHeight: 1 }}
      >
        ॐ
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionTitle hindi="स्थान" english="Location" />

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Card className="overflow-hidden border-saffron/20 shadow-saffron-lg">
            <div className="bg-gradient-to-br from-saffron to-saffron-deep p-8 text-white text-center relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-10 font-display text-center text-[12rem] leading-none text-white select-none pointer-events-none flex items-center justify-center"
                aria-hidden
              >
                ॐ
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-5">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-hindi font-bold text-2xl sm:text-3xl text-white mb-2">
                  अम्बेडकर भवन
                </h3>
                <p className="font-hindi text-white/85 text-lg leading-relaxed">
                  करनी चौक के पास
                  <br />
                  हनुमानगढ़ जंक्शन, राजस्थान
                </p>
              </div>
            </div>

            <CardContent className="p-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-saffron-light flex items-center justify-center">
                    <Clock className="w-5 h-5 text-saffron-deep" />
                  </div>
                  <div>
                    <p className="font-body text-muted-foreground text-xs uppercase tracking-widest mb-1">
                      समय / Timing
                    </p>
                    <p className="font-hindi font-bold text-foreground text-base">
                      प्रतिदिन सुबह 5:00 बजे
                    </p>
                    <p className="font-body text-muted-foreground text-sm">
                      Every day at 5:00 AM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center">
                    <Star className="w-5 h-5 text-forest fill-current" />
                  </div>
                  <div>
                    <p className="font-body text-muted-foreground text-xs uppercase tracking-widest mb-1">
                      प्रवेश / Entry
                    </p>
                    <p className="font-hindi font-bold text-foreground text-base">
                      बिल्कुल निःशुल्क
                    </p>
                    <p className="font-body text-muted-foreground text-sm">
                      Completely Free
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <a
                  href="https://maps.google.com/?q=Ambedkar+Bhawan+Hanumangarh+Junction"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="location.primary_button"
                  className="flex items-center justify-center gap-2.5 w-full bg-saffron hover:bg-saffron-deep text-white font-body font-bold py-3.5 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-saffron"
                >
                  <MapPin className="w-4 h-4" />
                  Google Maps पर देखें
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section
      id="benefits"
      data-ocid="benefits.section"
      className="py-20 sm:py-28 px-4 sm:px-6 bg-background relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle hindi="योग के लाभ" english="Benefits of Yoga" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              data-ocid={`benefits.item.${i + 1}`}
            >
              <Card className="h-full p-6 hover:shadow-card-warm transition-all duration-300 hover:-translate-y-1.5 border-saffron/15 bg-card group cursor-default">
                <CardContent className="p-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-saffron-light to-saffron/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-7 h-7 text-saffron-deep" />
                  </div>
                  <h4 className="font-hindi font-bold text-lg text-foreground mb-3 leading-snug">
                    {benefit.title}
                  </h4>
                  <p className="font-hindi text-sm text-muted-foreground leading-relaxed">
                    {benefit.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="font-hindi text-muted-foreground text-lg mb-6 max-w-xl mx-auto leading-relaxed">
            योग सिर्फ व्यायाम नहीं — यह जीवन जीने की एक कला है
          </p>
          <a
            href="#contact"
            data-ocid="benefits.secondary_button"
            className="inline-flex items-center gap-2 text-saffron-deep font-hindi font-semibold text-base hover:text-saffron transition-colors border-b-2 border-saffron/40 hover:border-saffron pb-0.5"
          >
            अभी जुड़ें →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      data-ocid="gallery.section"
      className="py-20 sm:py-28 px-4 sm:px-6 bg-muted/40"
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle hindi="गैलरी" english="Photo Gallery" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PHOTOS.map((photo, i) => (
            <motion.button
              key={photo.src}
              className="group relative rounded-2xl overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
              onClick={() => setLightbox(i)}
              data-ocid={`gallery.item.${i + 1}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              whileHover={{ scale: 1.02 }}
              aria-label={`फोटो देखें: ${photo.caption}`}
            >
              <div className="aspect-square">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-saffron-deep/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-hindi text-white text-sm font-semibold text-left">
                  {photo.caption}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            data-ocid="gallery.modal"
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              data-ocid="gallery.close_button"
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="बंद करें"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={PHOTOS[lightbox].src}
                alt={PHOTOS[lightbox].alt}
                className="w-full rounded-2xl shadow-2xl"
              />
              <p className="text-center text-white/80 font-hindi mt-3 text-base">
                {PHOTOS[lightbox].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="py-20 sm:py-28 px-4 sm:px-6 bg-cream relative overflow-hidden"
    >
      <div
        className="absolute bottom-0 left-0 w-56 h-56 opacity-[0.04] text-forest select-none pointer-events-none"
        aria-hidden
        style={{ fontSize: "14rem", lineHeight: 1 }}
      >
        ॐ
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionTitle hindi="संपर्क करें" english="Contact Us" />

        <div className="space-y-5">
          {/* WhatsApp Join Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a
              href="https://wa.me/919057036745"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="contact.whatsapp_button"
              className="group flex items-center justify-between w-full bg-forest hover:bg-forest-light text-white font-body font-bold px-7 py-5 rounded-2xl transition-all shadow-forest hover:shadow-xl hover:scale-[1.02] active:scale-[0.99]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-hindi text-lg font-bold leading-tight">
                    तुषार वर्मा — WhatsApp
                  </p>
                  <p className="font-body text-white/70 text-sm">
                    +91 90570 36745
                  </p>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 rotate-[-90deg] opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </motion.div>

          {/* Call Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <a
              href="tel:+919024783339"
              data-ocid="contact.call_button"
              className="group flex items-center justify-between w-full bg-saffron hover:bg-saffron-deep text-white font-body font-bold px-7 py-5 rounded-2xl transition-all shadow-saffron hover:shadow-xl hover:scale-[1.02] active:scale-[0.99]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-hindi text-lg font-bold leading-tight">
                    कॉल करें: +91 90247 83339
                  </p>
                  <p className="font-body text-white/70 text-sm">
                    श्री रतिराम जी सहारण
                  </p>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 rotate-[-90deg] opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </motion.div>

          {/* WhatsApp Channel Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href="https://whatsapp.com/channel/0029VbCDQ4S2kNFrl6zvGj2o"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="contact.channel_button"
              className="group flex items-center justify-between w-full bg-gradient-to-r from-[oklch(0.42_0.14_155)] to-forest text-white font-body font-bold px-7 py-5 rounded-2xl transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.99]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-hindi text-lg font-bold leading-tight">
                    WhatsApp Channel से जुड़ें
                  </p>
                  <p className="font-body text-white/70 text-sm">
                    योग समाचार व अपडेट के लिए
                  </p>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 rotate-[-90deg] opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </motion.div>

          {/* Admission Form CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              to="/admission"
              data-ocid="contact.admission_button"
              className="group flex items-center justify-between w-full bg-gradient-to-r from-saffron-deep to-[oklch(0.62_0.19_55)] text-white font-body font-bold px-7 py-5 rounded-2xl transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] shadow-saffron"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-hindi text-lg font-bold leading-tight">
                    प्रवेश फॉर्म भरें
                  </p>
                  <p className="font-body text-white/70 text-sm">
                    अपना YOGA कोड पाएं — निःशुल्क पंजीकरण
                  </p>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 rotate-[-90deg] opacity-60 group-hover:opacity-100 transition-opacity" />
            </Link>
          </motion.div>
        </div>

        {/* Info card */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <Card className="border-saffron/20 shadow-card-warm bg-card">
            <CardContent className="p-6 sm:p-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-saffron-light flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-saffron-deep" />
                  </div>
                  <div>
                    <p className="font-body text-muted-foreground text-xs uppercase tracking-wider mb-1">
                      स्थान
                    </p>
                    <p className="font-hindi font-semibold text-foreground text-base leading-snug">
                      अम्बेडकर भवन
                    </p>
                    <p className="font-hindi text-muted-foreground text-sm">
                      करनी चौक के पास, हनुमानगढ़ जंक्शन
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-saffron-light flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-saffron-deep" />
                  </div>
                  <div>
                    <p className="font-body text-muted-foreground text-xs uppercase tracking-wider mb-1">
                      समय
                    </p>
                    <p className="font-hindi font-semibold text-foreground text-base">
                      प्रतिदिन सुबह 5:00 बजे
                    </p>
                    <p className="font-hindi text-muted-foreground text-sm">
                      बिल्कुल निःशुल्क
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      data-ocid="footer.section"
      className="bg-foreground text-background/80 py-14 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <OMSymbol className="text-saffron text-3xl" />
              <div>
                <p className="font-hindi font-bold text-lg text-background leading-tight">
                  निःशुल्क योग कक्षाएं
                </p>
                <p className="font-hindi text-background/50 text-sm">हनुमानगढ़</p>
              </div>
            </div>
            <p className="font-hindi text-background/55 text-sm leading-relaxed">
              स्वस्थ जीवन की ओर — निःशुल्क, नित्य, नेक
            </p>
          </div>

          <div>
            <h4 className="font-hindi font-bold text-background text-base mb-4">
              स्थान व समय
            </h4>
            <div className="space-y-2 font-hindi text-sm text-background/65">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-saffron mt-0.5 flex-shrink-0" />
                <p>
                  अम्बेडकर भवन, करनी चौक के पास,
                  <br />
                  हनुमानगढ़ जंक्शन
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-saffron flex-shrink-0" />
                <p>प्रतिदिन सुबह 5:00 बजे</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-hindi font-bold text-background text-base mb-4">
              संपर्क
            </h4>
            <div className="space-y-2 font-hindi text-sm text-background/65">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-saffron flex-shrink-0" />
                <a
                  href="tel:+919024783339"
                  className="hover:text-saffron transition-colors"
                  data-ocid="footer.link"
                >
                  +91 90247 83339 (Call)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-forest-light flex-shrink-0" />
                <a
                  href="https://wa.me/919057036745"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-forest-light transition-colors"
                  data-ocid="footer.link"
                >
                  तुषार वर्मा: +91 90570 36745
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-forest-light flex-shrink-0" />
                <a
                  href="https://whatsapp.com/channel/0029VbCDQ4S2kNFrl6zvGj2o"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-forest-light transition-colors"
                  data-ocid="footer.link"
                >
                  WhatsApp Channel
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-hindi text-xs text-background/40">
            © {year} Free Yoga Class Hanumangarh
          </p>
          <p className="font-body text-xs text-background/40">
            Built with <Heart className="w-3 h-3 inline text-saffron" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-saffron transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <NavBar isMobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className="pb-20 md:pb-0">
        <HeroSection />
        <ScheduleSection />
        <LocationSection />
        <BenefitsSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster />
      <BottomNav />
    </>
  );
}
