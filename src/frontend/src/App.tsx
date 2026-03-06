import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import {
  ChevronDown,
  Clock,
  Heart,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Star,
  Sun,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useActor } from "./hooks/useActor";
import { useAddCamp, useGetAllCamps } from "./hooks/useQueries";

const CAMP_DATA = {
  name: "निःशुल्क योग सेवा शिविर",
  location: "अम्बेडकर भवन, करणी चौक सुरेशिया",
  timing: "प्रतिदिन सुबह 5:30 बजे",
  instructor: "रतिराम जी सहारण",
};

const PHOTOS = [
  {
    src: "/assets/uploads/1_1770612275298-1.jpg",
    alt: "योग शिविर प्रचार पोस्टर",
    caption: "योग सेवा शिविर",
  },
  {
    src: "/assets/uploads/IMG_20260304_065457-2.jpg",
    alt: "योग प्रतिभागियों का समूह फोटो",
    caption: "प्रातःकालीन योग सत्र",
  },
  {
    src: "/assets/uploads/1_1770612275298-1-3.jpg",
    alt: "योग शिविर पोस्टर",
    caption: "निःशुल्क योग शिक्षा",
  },
  {
    src: "/assets/uploads/IMG_20260304_065451-4.jpg",
    alt: "योग प्रतिभागियों का दूसरा समूह फोटो",
    caption: "सामुदायिक योग अभ्यास",
  },
];

const BENEFITS = [
  {
    icon: Sun,
    title: "शारीरिक स्वास्थ्य",
    desc: "नियमित योग से शरीर को बल और लचीलापन मिलता है",
  },
  {
    icon: Heart,
    title: "मानसिक शांति",
    desc: "योग से मन को शांति और एकाग्रता मिलती है",
  },
  {
    icon: Leaf,
    title: "प्राकृतिक उपचार",
    desc: "प्राणायाम से श्वसन तंत्र मजबूत होता है",
  },
  {
    icon: Users,
    title: "सामुदायिक जुड़ाव",
    desc: "साथ मिलकर योग करने से सामाजिक बंधन मजबूत होता है",
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
    { href: "#about", label: "परिचय" },
    { href: "#timing", label: "समय व स्थान" },
    { href: "#instructor", label: "प्रशिक्षक" },
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
          className="flex items-center gap-2 group"
          aria-label="मुख्य पृष्ठ"
        >
          <OMSymbol className="text-saffron text-2xl group-hover:scale-110 transition-transform" />
          <span className="font-hindi font-bold text-sm sm:text-base text-foreground leading-tight">
            <span className="block text-saffron-deep">निःशुल्क योग</span>
            <span className="block text-forest text-xs">सेवा शिविर</span>
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-ocid="nav.link"
                className="px-3 py-2 text-sm font-hindi font-medium text-foreground hover:text-saffron-deep transition-colors rounded-md hover:bg-saffron/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* WhatsApp CTA */}
        <a
          href="https://wa.me/919024783339"
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
          className="md:hidden p-2 rounded-lg text-foreground hover:bg-saffron/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
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
              <li className="pt-2">
                <a
                  href="https://wa.me/919024783339"
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
        {/* Decorative grain */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Decorative OM */}
      <motion.div
        className="absolute top-28 right-8 text-7xl text-white/10 font-display select-none"
        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 0.95, 1] }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        aria-hidden
      >
        ॐ
      </motion.div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Badge className="mb-6 bg-saffron/20 text-saffron-light border-saffron/40 font-hindi text-sm px-4 py-1.5 backdrop-blur-sm">
            <Star className="w-3.5 h-3.5 mr-1.5 fill-current" />
            निःशुल्क • नित्य • नेक
          </Badge>
        </motion.div>

        <motion.h1
          className="font-hindi font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
        >
          निःशुल्क योग
          <br />
          <span className="text-gold font-display italic">सेवा शिविर</span>
        </motion.h1>

        <motion.p
          className="font-hindi text-lg sm:text-xl md:text-2xl text-white/85 mb-3 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          स्वस्थ जीवन की ओर — एक कदम
        </motion.p>

        <motion.p
          className="font-body text-base sm:text-lg text-white/70 mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          Every day at 5:30 AM · Free for all · अम्बेडकर भवन
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <a
            href="https://wa.me/919024783339"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.primary_button"
            className="flex items-center justify-center gap-2.5 bg-saffron hover:bg-saffron-deep text-white font-body font-bold px-8 py-4 rounded-full transition-all shadow-saffron-lg hover:shadow-xl hover:scale-105 active:scale-95 text-base"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp पर जुड़ें
          </a>
          <a
            href="#about"
            data-ocid="hero.secondary_button"
            className="flex items-center justify-center gap-2 border-2 border-white/50 text-white hover:bg-white/10 font-body font-semibold px-8 py-4 rounded-full transition-all backdrop-blur-sm text-base"
          >
            अधिक जानें
            <ChevronDown className="w-4 h-4" />
          </a>
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

function AboutSection() {
  return (
    <section
      id="about"
      data-ocid="about.section"
      className="py-20 sm:py-28 px-4 sm:px-6 bg-cream relative overflow-hidden"
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-64 h-64 opacity-5 text-saffron select-none pointer-events-none"
        aria-hidden
        style={{ fontSize: "16rem", lineHeight: 1 }}
      >
        ॐ
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="section-divider w-16" />
            <LotusDecor className="text-2xl" />
            <div className="section-divider w-16" />
          </div>
          <h2 className="font-hindi font-bold text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
            हमारे बारे में
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            About Our Free Yoga Camp
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-hindi font-bold text-2xl sm:text-3xl text-saffron-deep mb-6 leading-relaxed">
              योग — जीवन का सर्वश्रेष्ठ उपहार
            </h3>
            <div className="space-y-4 font-hindi text-foreground text-base sm:text-lg leading-relaxed">
              <p>
                हमारा{" "}
                <strong className="text-saffron-deep">
                  निःशुल्क योग सेवा शिविर
                </strong>{" "}
                समाज की निःस्वार्थ सेवा के उद्देश्य से स्थापित किया गया है। हम चाहते हैं कि
                हर व्यक्ति, चाहे वो किसी भी आर्थिक स्थिति में हो, योग के लाभों को प्राप्त
                कर सके।
              </p>
              <p>
                यह शिविर{" "}
                <strong className="text-forest">
                  अम्बेडकर भवन, करणी चौक सुरेशिया
                </strong>{" "}
                में प्रतिदिन{" "}
                <strong className="text-saffron-deep">सुबह 5:30 बजे</strong>{" "}
                आयोजित होता है। यहाँ सभी आयु वर्ग के लोग एकत्रित होकर योग का अभ्यास करते
                हैं।
              </p>
              <p>
                अनुभवी योग प्रशिक्षक{" "}
                <strong className="text-forest">रतिराम जी सहारण</strong> के
                मार्गदर्शन में आप असली योग की शिक्षा प्राप्त कर सकते हैं — बिल्कुल निःशुल्क।
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-saffron-lg">
              <img
                src="/assets/uploads/IMG_20260304_065457-2.jpg"
                alt="योग प्रतिभागियों का समूह"
                className="w-full h-80 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-saffron-deep/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white font-hindi">
                <p className="text-sm font-semibold opacity-90">
                  प्रातःकालीन योग सत्र
                </p>
              </div>
            </div>
            {/* Decorative border */}
            <div className="absolute -bottom-3 -right-3 w-full h-full rounded-3xl border-2 border-saffron/30 -z-10" />
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {BENEFITS.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <Card
                className="h-full text-center p-6 hover:shadow-card-warm transition-all duration-300 hover:-translate-y-1 border-saffron/15 bg-background"
                data-ocid={
                  `about.card.${i + 1}` as `about.card.${1 | 2 | 3 | 4}`
                }
              >
                <CardContent className="p-0">
                  <div className="w-12 h-12 rounded-2xl bg-saffron-light flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-saffron-deep" />
                  </div>
                  <h4 className="font-hindi font-bold text-base text-foreground mb-2">
                    {benefit.title}
                  </h4>
                  <p className="font-hindi text-sm text-muted-foreground leading-relaxed">
                    {benefit.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TimingSection() {
  return (
    <section
      id="timing"
      data-ocid="timing.section"
      className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-br from-saffron-deep to-[oklch(0.45_0.15_45)] relative overflow-hidden grain-texture"
    >
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 40px, oklch(1 0 0 / 0.1) 40px, oklch(1 0 0 / 0.1) 41px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-white/40" />
            <LotusDecor className="text-2xl" />
            <div className="h-px w-16 bg-white/40" />
          </div>
          <h2 className="font-hindi font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-3">
            समय और स्थान
          </h2>
          <p className="font-body text-white/70 text-lg">Timing & Location</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Timing Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card
              className="bg-white/10 backdrop-blur-md border-white/20 text-white overflow-hidden"
              data-ocid="timing.card"
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-body text-white/70 text-sm uppercase tracking-widest mb-1">
                      Daily Timing
                    </p>
                    <h3 className="font-hindi font-bold text-2xl sm:text-3xl text-white mb-2 leading-tight">
                      सुबह 5:30 बजे
                    </h3>
                    <p className="font-hindi text-white/80 text-base">
                      प्रतिदिन (Every Morning)
                    </p>
                    <Badge className="mt-3 bg-white/20 text-white border-white/30 font-hindi">
                      <Sun className="w-3 h-3 mr-1" />
                      प्रातः योग
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Card
              className="bg-white/10 backdrop-blur-md border-white/20 text-white overflow-hidden"
              data-ocid="location.card"
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-body text-white/70 text-sm uppercase tracking-widest mb-1">
                      Location
                    </p>
                    <h3 className="font-hindi font-bold text-xl sm:text-2xl text-white mb-2 leading-tight">
                      अम्बेडकर भवन
                    </h3>
                    <p className="font-hindi text-white/80 text-base leading-relaxed">
                      करणी चौक सुरेशिया
                    </p>
                    <Badge className="mt-3 bg-white/20 text-white border-white/30 font-hindi">
                      <MapPin className="w-3 h-3 mr-1" />
                      निःशुल्क प्रवेश
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="font-hindi text-white/75 text-lg mb-5">
            आज ही शामिल हों — किसी शुल्क की आवश्यकता नहीं
          </p>
          <a
            href="https://wa.me/919024783339"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="timing.primary_button"
            className="inline-flex items-center gap-2.5 bg-white text-saffron-deep font-body font-bold px-8 py-4 rounded-full hover:bg-cream transition-all shadow-xl hover:scale-105 active:scale-95 text-base"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp पर जुड़ें
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function InstructorSection() {
  return (
    <section
      id="instructor"
      data-ocid="instructor.section"
      className="py-20 sm:py-28 px-4 sm:px-6 bg-background"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="section-divider w-16" />
            <LotusDecor className="text-2xl" />
            <div className="section-divider w-16" />
          </div>
          <h2 className="font-hindi font-bold text-3xl sm:text-4xl md:text-5xl text-foreground mb-3">
            हमारे प्रशिक्षक
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            Our Yoga Instructor
          </p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Card
            className="overflow-hidden border-saffron/20 shadow-saffron"
            data-ocid="instructor.card"
          >
            <div className="relative h-52 bg-gradient-to-br from-saffron to-saffron-deep overflow-hidden">
              <img
                src="/assets/uploads/IMG_20260304_065451-4.jpg"
                alt="रतिराम जी सहारण के साथ योग प्रतिभागी"
                className="w-full h-full object-cover object-top opacity-60"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-saffron-deep/80" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <OMSymbol className="text-white/30 text-6xl absolute top-2 right-4" />
              </div>
            </div>

            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-saffron-light flex items-center justify-center mx-auto -mt-16 relative z-10 border-4 border-background shadow-saffron">
                  <span className="font-hindi font-bold text-2xl text-saffron-deep">
                    र
                  </span>
                </div>
                <h3 className="font-hindi font-bold text-2xl sm:text-3xl text-foreground mt-4 mb-2">
                  रतिराम जी सहारण
                </h3>
                <Badge className="bg-forest/10 text-forest border-forest/20 font-hindi mb-6">
                  <Leaf className="w-3 h-3 mr-1" />
                  योग प्रशिक्षक
                </Badge>

                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  <a
                    href="tel:+919024783339"
                    data-ocid="instructor.primary_button"
                    className="flex items-center justify-center gap-2.5 bg-saffron text-white font-body font-semibold px-5 py-3 rounded-xl hover:bg-saffron-deep transition-all shadow-saffron hover:shadow-saffron-lg hover:scale-105 active:scale-95"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+91 90247 83339</span>
                  </a>
                  <a
                    href="https://wa.me/919024783339"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="instructor.secondary_button"
                    className="flex items-center justify-center gap-2.5 bg-forest text-white font-body font-semibold px-5 py-3 rounded-xl hover:bg-forest-light transition-all shadow-forest hover:scale-105 active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
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
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="section-divider w-16" />
            <LotusDecor className="text-2xl" />
            <div className="section-divider w-16" />
          </div>
          <h2 className="font-hindi font-bold text-3xl sm:text-4xl md:text-5xl text-foreground mb-3">
            गैलरी
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            Photo Gallery
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {PHOTOS.map((photo, i) => (
            <motion.button
              key={photo.src}
              className="group relative rounded-2xl overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
              onClick={() => setLightbox(i)}
              data-ocid={
                `gallery.item.${i + 1}` as `gallery.item.${1 | 2 | 3 | 4}`
              }
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
        className="absolute bottom-0 left-0 w-48 h-48 opacity-5 text-forest select-none pointer-events-none"
        aria-hidden
        style={{ fontSize: "12rem", lineHeight: 1 }}
      >
        ॐ
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="section-divider w-16" />
            <LotusDecor className="text-2xl" />
            <div className="section-divider w-16" />
          </div>
          <h2 className="font-hindi font-bold text-3xl sm:text-4xl md:text-5xl text-foreground mb-3">
            संपर्क करें
          </h2>
          <p className="font-body text-muted-foreground text-lg">Contact Us</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {/* Contact 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card
              className="h-full border-saffron/20 shadow-card-warm hover:shadow-saffron transition-all"
              data-ocid="contact.card.1"
            >
              <CardContent className="p-7">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-saffron-light flex items-center justify-center">
                    <Phone className="w-5 h-5 text-saffron-deep" />
                  </div>
                  <div>
                    <p className="font-body text-muted-foreground text-xs uppercase tracking-widest mb-1">
                      मुख्य संपर्क
                    </p>
                    <h3 className="font-hindi font-bold text-lg text-foreground mb-1">
                      रतिराम जी सहारण
                    </h3>
                    <a
                      href="tel:+919024783339"
                      data-ocid="contact.primary_button"
                      className="font-body text-saffron-deep font-semibold text-base hover:text-saffron transition-colors"
                    >
                      +91 90247 83339
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card
              className="h-full border-forest/20 shadow-forest/10 hover:shadow-forest transition-all"
              data-ocid="contact.card.2"
            >
              <CardContent className="p-7">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-forest" />
                  </div>
                  <div>
                    <p className="font-body text-muted-foreground text-xs uppercase tracking-widest mb-1">
                      सह-संपर्क
                    </p>
                    <h3 className="font-hindi font-bold text-lg text-foreground mb-1">
                      तुषार वर्मा
                    </h3>
                    <a
                      href="tel:+919057036745"
                      data-ocid="contact.secondary_button"
                      className="font-body text-forest font-semibold text-base hover:text-forest-light transition-colors"
                    >
                      +91 90570 36745
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* WhatsApp CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-forest to-forest-light border-0 shadow-forest overflow-hidden">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-5">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-hindi font-bold text-2xl sm:text-3xl text-white mb-3">
                Yoga WhatsApp चैनल
              </h3>
              <p className="font-hindi text-white/80 text-base mb-7 max-w-md mx-auto leading-relaxed">
                हमारे WhatsApp चैनल से जुड़ें और योग से जुड़ी नवीनतम जानकारी प्राप्त करें
              </p>
              <a
                href="https://wa.me/919024783339"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="contact.whatsapp_button"
                className="inline-flex items-center gap-3 bg-white text-forest font-body font-bold px-8 py-4 rounded-full hover:bg-cream transition-all shadow-xl hover:scale-105 active:scale-95 text-base"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp पर जुड़ें
              </a>
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
    <footer className="bg-foreground text-background/80 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <OMSymbol className="text-saffron text-3xl" />
              <div>
                <p className="font-hindi font-bold text-lg text-background leading-tight">
                  निःशुल्क योग सेवा शिविर
                </p>
              </div>
            </div>
            <p className="font-hindi text-background/60 text-sm leading-relaxed">
              स्वस्थ जीवन की ओर — निःशुल्क, नित्य, नेक
            </p>
          </div>

          <div>
            <h4 className="font-hindi font-bold text-background text-base mb-4">
              स्थान व समय
            </h4>
            <div className="space-y-2 font-hindi text-sm text-background/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-saffron mt-0.5 flex-shrink-0" />
                <p>अम्बेडकर भवन, करणी चौक सुरेशिया</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-saffron flex-shrink-0" />
                <p>प्रतिदिन सुबह 5:30 बजे</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-hindi font-bold text-background text-base mb-4">
              संपर्क
            </h4>
            <div className="space-y-2 font-hindi text-sm text-background/70">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-saffron flex-shrink-0" />
                <a
                  href="tel:+919024783339"
                  className="hover:text-saffron transition-colors"
                >
                  +91 90247 83339
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-saffron flex-shrink-0" />
                <a
                  href="tel:+919057036745"
                  className="hover:text-saffron transition-colors"
                >
                  +91 90570 36745
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-forest-light flex-shrink-0" />
                <a
                  href="https://wa.me/919024783339"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-forest-light transition-colors"
                >
                  WhatsApp चैनल
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 text-center">
          <p className="font-body text-xs text-background/40">
            © {year}. Built with{" "}
            <Heart className="w-3 h-3 inline text-saffron" /> using{" "}
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

function CampDataSeed() {
  const { actor, isFetching } = useActor();
  const { data: camps, isSuccess } = useGetAllCamps();
  const addCamp = useAddCamp();
  const seeded = useRef(false);

  useEffect(() => {
    if (!actor || isFetching || !isSuccess || seeded.current) return;
    if (camps.length === 0) {
      seeded.current = true;
      addCamp.mutate(CAMP_DATA);
    }
  }, [actor, isFetching, isSuccess, camps, addCamp]);

  return null;
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <CampDataSeed />
      <NavBar isMobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main>
        <HeroSection />
        <AboutSection />
        <TimingSection />
        <InstructorSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
