/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  Server,
  Camera,
  Monitor,
  Headphones,
  Globe,
  Database,
  Search,
  Megaphone,
  FileText,
  Users,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronRight,
  Award,
  CheckCircle2,
  Clock,
  Briefcase,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";

// --- Assets ---
const LOGO = "../logo.png ";
const HERO_IMAGES = [
  "/img1 (1).png",
  "/img1 (2).png",
  "/img1 (3).png",
  "/img1 (4).png",
  "/img1 (5).png",
  "/img1 (6).png",
];
const CCTV_IMG = "/cctv.jpg";
const SERVER_IMG = "/server.jpg";
const INFRA_IMG = "/infra.jpg";
const AV_IMG = "/av.jpg";
const HDA_IMG = "/hda.jpg";
const NHLS_IMG = "/nhls.jpg";
const WATER_IMG = "/water.jpg";

const ProjectCard: React.FC<{ project: any; index: number }> = ({ project, index }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const images = project.images || [project.img];

  const isVideo = (src: string) => /\.(mp4|webm|ogg)$/i.test(src);

  useEffect(() => {
    const handleClose = () => setIsZoomed(false);
    window.addEventListener('closePreview', handleClose);
    return () => window.removeEventListener('closePreview', handleClose);
  }, []);

  useEffect(() => {
    if (images.length > 1 && !isZoomed) {
      const interval = setInterval(() => {
        setCurrentImg((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images.length, isZoomed]);

  useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isZoomed]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: index * 0.2,
          duration: 0.8,
          type: "spring",
          stiffness: 100,
        }}
        whileHover={{ rotateY: 5, scale: 1.02 }}
        className="group cursor-pointer perspective-1000"
        onClick={() => setIsZoomed(true)}
      >
        <div className="relative h-64 rounded-3xl overflow-hidden mb-6">
          <AnimatePresence mode="popLayout">
            {isVideo(images[currentImg]) ? (
              <motion.video
                key={currentImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                src={images[currentImg]}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover bg-white group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <motion.img
                key={currentImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                src={images[currentImg]}
                alt={project.client}
                className="absolute inset-0 w-full h-full object-cover bg-white group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            )}
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
            <p className="text-white font-bold flex items-center gap-2">
              <Search size={18} /> Click to View
            </p>
          </div>
        </div>
        <h4 className="text-2xl font-bold mb-2">{project.client}</h4>
        <p className="text-teal font-semibold text-sm mb-4">
          {project.scope}
        </p>
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-bold text-navy">Duration:</span>{" "}
            {project.duration}
          </p>
          <p>
            <span className="font-bold text-navy">
              Project Status:
            </span>{" "}
            {project.status}
          </p>
          <p>
            <span className="font-bold text-navy">Outcome:</span>{" "}
            {project.outcome}
          </p>
        </div>
      </motion.div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-[110px] md:top-[130px] bottom-0 left-0 right-0 z-40 flex items-center justify-center p-4 sm:p-10 cursor-zoom-out before:absolute before:inset-0 before:bg-navy/95 before:backdrop-blur-xl"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-6xl max-h-full flex items-center justify-center overflow-hidden"
            >
              {images.length > 1 && (
                <div className="absolute top-4 left-4 bg-black/50 text-white px-4 py-1.5 rounded-full text-sm font-medium z-20 shadow-lg backdrop-blur-md border border-white/10">
                  {currentImg + 1} / {images.length}
                </div>
              )}
              {isVideo(images[currentImg]) ? (
                <video
                  src={images[currentImg]}
                  controls
                  autoPlay
                  className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl cursor-pointer"
                  onClick={(e) => {
                    if (images.length > 1) {
                      e.stopPropagation();
                      setCurrentImg((prev) => (prev + 1) % images.length);
                    }
                  }}
                />
              ) : (
                <img
                  src={images[currentImg]}
                  alt={project.client}
                  className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl cursor-pointer"
                  onClick={(e) => {
                    if (images.length > 1) {
                      e.stopPropagation();
                      setCurrentImg((prev) => (prev + 1) % images.length);
                    }
                  }}
                />
              )}
              {images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white px-6 py-2.5 rounded-full text-sm font-medium backdrop-blur-md pointer-events-none opacity-80 shadow-xl border border-white/10">
                  Click media for next
                </div>
              )}
              <button 
                onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }} 
                className="absolute top-4 right-4 bg-white/10 text-white p-3 rounded-full hover:bg-teal hover:text-white transition-colors z-20 shadow-lg backdrop-blur-md border border-white/20" 
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Location", href: "#location" },
  { name: "Contact", href: "#contact" },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [heroImgIndex, setHeroImgIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "IT Infrastructure",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Construct email content
    const subject = encodeURIComponent(`Website Inquiry: ${formData.subject}`);
    const body = encodeURIComponent(`Name: ${formData.fullName}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    
    // Open default email client
    window.location.href = `mailto:info@rondoitbs.co.za?subject=${subject}&body=${body}`;

    setIsSubmitting(false);
    setIsSuccess(true);
    
    setFormData({
      fullName: "",
      email: "",
      subject: "IT Infrastructure",
      message: "",
    });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setIsScrolling(true);
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
      
      const sections = navLinks.map(link => link.href.substring(1));
      let current = "home";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Trigger transition when a section takes up roughly the middle of the screen
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Execute once to set initial state correctly on load
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const getBackgroundStyle = () => {
    switch (activeSection) {
      case "home":
        return "opacity-[0.03] blur-3xl scale-110";
      case "about":
        return "opacity-[0.06] blur-sm scale-100 grayscale";
      case "services":
        return "opacity-[0.04] blur-md scale-105";
      case "projects":
        return "opacity-[0.08] blur-[2px] scale-100";
      case "location":
        return "opacity-[0.05] blur-lg scale-110 grayscale";
      case "contact":
        return "opacity-[0.1] blur-none scale-100";
      default:
        return "opacity-[0.05] blur-md scale-100";
    }
  };

  // Automatically rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImgIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-navy selection:bg-teal selection:text-white relative">
      
      {/* Sticky Background Logo */}
      <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center overflow-hidden mix-blend-multiply">
        <img
          src="/logo.png"
          alt="Background Overlay"
          className={`w-[80vw] md:w-[60vw] max-w-[800px] object-contain transition-all duration-[1200ms] ease-in-out ${getBackgroundStyle()}`}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* --- Navigation --- */}
      <nav
        className={`sticky top-0 w-full z-50 transition-all duration-300 border-b ${
          !scrolled 
            ? "bg-white border-gray-100 shadow-sm"
            : isScrolling
              ? "bg-transparent backdrop-blur-md border-transparent shadow-sm"
              : "bg-white/95 backdrop-blur-md border-gray-100 shadow-md"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="flex items-center -ml-2 -mt-2 -mb-2">
            <img
              src={LOGO}
              alt="Rondo IT Logo"
              className="h-[120px] md:h-[144px] object-contain p-0 m-0"
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => window.dispatchEvent(new Event('closePreview'))}
                className="text-sm font-medium hover:text-teal transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => window.dispatchEvent(new Event('closePreview'))}
              className="bg-navy text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-teal transition-all duration-300 shadow-lg shadow-navy/10"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-navy"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 md:hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.dispatchEvent(new Event('closePreview'));
                    }}
                    className="text-lg font-medium hover:text-teal"
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.dispatchEvent(new Event('closePreview'));
                  }}
                  className="bg-navy text-white text-center py-3 rounded-xl font-semibold"
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow">
        {/* --- Hero Section --- */}
        <section
          id="home"
          className="relative min-h-[60vh] flex items-center overflow-hidden pt-4 pb-4"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0 bg-navy overflow-hidden">
            <AnimatePresence>
              <motion.img
                key={heroImgIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                src={HERO_IMAGES[heroImgIndex]}
                alt="Rondo IT Background"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-navy/20 pointer-events-none" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className=" backdrop-blur-x3 p-5 md:p-8 shadow-2xl inline-block"
              >
                <h1 className="text-3xl md:text-5xl font-bold leading-[1.2] mb-4 text-white mix-blend-plus-lighter">
                  Your Number 1 IT & <br />
                  <span className="text-teal">Business Solutions</span> <br />
                  Company
                </h1>
                <p className="text-base text-gray-200 mb-6 max-w-lg leading-relaxed font-medium mix-blend-plus-lighter opacity-90">
                  Rondo IT & Business Solutions provides cutting-edge
                  infrastructure, security, and strategic business services
                  tailored for government and enterprise excellence.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#services"
                    className="bg-teal text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-navy transition-all flex items-center gap-2 group shadow-xl shadow-teal/20 text-sm"
                  >
                    Our Services{" "}
                    <ChevronRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </a>
                  <a
                    href="#contact"
                    className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-navy transition-all text-sm"
                  >
                    Contact Us
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- About Us --- */}
        <section id="about" className="relative py-24 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={CCTV_IMG}
              alt="About Background"
              className="w-full h-full object-cover opacity-10"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-white/95" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <h2 className="text-teal font-bold uppercase tracking-widest text-sm mb-4">
                About Rondo IT
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-8">
                Committed to Excellence & Innovation
              </h3>
              <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                <p>
                  Rondo IT and Business Solutions is a dynamic and innovative service provider specializing in Information Technology services and integrated Business Solutions. The company is committed to delivering high-quality, efficient, and cost-effective solutions tailored to meet the evolving needs of both public and private sector clients.
                </p>
                <p>
                  With a strong focus on professionalism, reliability, and client satisfaction, Rondo IT and Business Solutions has established itself as a trusted partner in delivering impactful projects across various industries.
                </p>
              </div>
              {/* <div className="mt-10 inline-block bg-teal/10 px-8 py-4 rounded-3xl border border-teal/20 text-left">
                <h4 className="text-teal uppercase tracking-widest text-xs font-bold mb-1">Managing Director</h4>
                <p className="text-navy font-black text-xl">Rokhethwa Ndouvhada</p>
              </div> */}
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="bg-light-grey p-8 rounded-3xl">
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-3">
                    <span className="w-10 h-10 bg-navy text-white rounded-lg flex items-center justify-center">
                      <Globe size={20} />
                    </span>
                    Our Mission
                  </h4>
                  <p className="text-gray-600">
                    To deliver innovative, reliable, and cost-effective services
                    that empower organizations to achieve their goals.
                  </p>
                </div>
                <div className="bg-light-grey p-8 rounded-3xl">
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-3">
                    <span className="w-10 h-10 bg-teal text-white rounded-lg flex items-center justify-center">
                      <Shield size={20} />
                    </span>
                    Our Vision
                  </h4>
                  <p className="text-gray-600">
                    To become a leading provider of IT and business solutions in
                    South Africa and beyond.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { title: "Professionalism", icon: <Briefcase /> },
                  { title: "Reliability", icon: <Clock /> },
                  { title: "Innovation", icon: <Server /> },
                  { title: "Satisfaction", icon: <CheckCircle2 /> },
                ].map((val, i) => (
                  <div
                    key={i}
                    className="border border-gray-100 p-6 rounded-2xl hover:shadow-lg transition-shadow text-center group"
                  >
                    <div className="text-teal mb-4 flex justify-center group-hover:scale-110 transition-transform">
                      {val.icon}
                    </div>
                    <p className="font-bold">{val.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-20 p-10 bg-navy text-white rounded-[40px] text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-10">
                <Award size={120} />
              </div>
              <h4 className="text-2xl font-bold mb-4 relative z-10">
                Our Commitment
              </h4>
              <p className="text-gray-300 max-w-2xl mx-auto relative z-10 italic">
                "Rondo IT and Business Solutions is dedicated to delivering
                services that meet the highest standards of quality, integrity,
                and efficiency. We strive to build long-term relationships with
                our clients by consistently exceeding expectations and providing
                solutions that add measurable value."
              </p>
            </div>
          </div>
        </section>

        {/* --- Services --- */}
        <section id="services" className="relative py-24 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={SERVER_IMG}
              alt="Services Background"
              className="w-full h-full object-cover opacity-20"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-light-grey/90" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Our Specialized Services
              </h2>
              <p className="text-gray-600">
                Comprehensive solutions split into IT and Business categories.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* IT Services */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-[40px] shadow-sm"
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="bg-navy text-white p-4 rounded-2xl">
                    <Server size={32} />
                  </div>
                  <h3 className="text-3xl font-bold">IT Services</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Equipment Supply",
                      icon: <Briefcase />,
                      desc: "Supply and delivery of IT equipment.",
                    },
                    {
                      title: "Infrastructure",
                      icon: <Database />,
                      desc: "Installation and configuration of IT infrastructure.",
                    },
                    {
                      title: "CCTV Systems",
                      icon: <Camera />,
                      desc: "CCTV systems supply and installation.",
                    },
                    {
                      title: "AV Solutions",
                      icon: <Monitor />,
                      desc: "Audio-visual solutions (projectors and screens).",
                    },
                    {
                      title: "24/7 Support",
                      icon: <Headphones />,
                      desc: "24/7 IT support services.",
                    },
                    {
                      title: "Cybersecurity",
                      icon: <Shield />,
                      desc: "Cybersecurity services.",
                    },
                    {
                      title: "SharePoint",
                      icon: <Globe />,
                      desc: "SharePoint maintenance.",
                    },
                    {
                      title: "Web Maintenance",
                      icon: <FileText />,
                      desc: "Website maintenance.",
                    },
                  ].map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.05,
                        duration: 0.6,
                        ease: "easeOut",
                      }}
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: "rgba(0,0,0,0.02)",
                      }}
                      className="flex gap-4 p-4 rounded-2xl hover:bg-light-grey transition-colors group cursor-default"
                    >
                      <div className="text-teal shrink-0 group-hover:scale-110 transition-transform">
                        {s.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm mb-1">{s.title}</h4>
                        <p className="text-xs text-gray-500">{s.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Business Solutions */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-navy text-white p-10 rounded-[40px] shadow-xl"
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="bg-teal text-white p-4 rounded-2xl">
                    <Users size={32} />
                  </div>
                  <h3 className="text-3xl font-bold">Business Solutions</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Advertising",
                      icon: <Megaphone />,
                      desc: "Advertising and media placement.",
                    },
                    {
                      title: "Gazette Publications",
                      icon: <FileText />,
                      desc: "Public notices and government gazette publications.",
                    },
                    {
                      title: "Recruitment Advertisements",
                      icon: <Search />,
                      desc: "Recruitment and vacancy advertising.",
                    },
                    {
                      title: "Project Communications",
                      icon: <MessageSquare />,
                      desc: "Project support and communication services.",
                    },
                  ].map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.1,
                        duration: 0.6,
                        ease: "easeOut",
                      }}
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: "rgba(255,255,255,0.05)",
                      }}
                      className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-default"
                    >
                      <div className="text-teal shrink-0 group-hover:scale-110 transition-transform">
                        {s.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm mb-1">{s.title}</h4>
                        <p className="text-xs text-gray-300">{s.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/10">
                  <p className="text-sm italic text-gray-400">
                    "We provide strategic business support that ensures your
                    projects communicate effectively and reach the right
                    audience."
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- Projects --- */}
        <section id="projects" className="relative py-24 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={INFRA_IMG}
              alt="Projects Background"
              className="w-full h-full object-cover opacity-10"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-white/95" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-xl">
                <h2 className="text-teal font-bold uppercase tracking-widest text-sm mb-4">
                  Case Studies
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold">
                  Proven Track Record
                </h3>
              </div>
              <p className="text-gray-500 max-w-sm">
                Explore our successful implementations across various government
                and enterprise sectors.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  client: "Residential Client (Madabani, Sinthumule Limpopo)",
                  scope: "CCTV & Solar Lights Installation",
                  duration: "Project Based",
                  status: "Completed",
                  outcome: "Enhanced residential security and off-grid lighting.",
                  img: "/WhatsApp Image 2026-04-26 at 13.54.08.jpeg",
                  images: [
                    "/WhatsApp Video 2026-04-26 at 10.09.04.mp4",
                    "/WhatsApp Image 2026-04-26 at 10.09.01.jpeg",
                    "/WhatsApp Image 2026-04-26 at 13.54.08 (1).jpeg",
                    "/WhatsApp Image 2026-04-26 at 13.54.08.jpeg",
                    "/WhatsApp Image 2026-04-26 at 13.54.09.jpeg",
                    "/WhatsApp Image 2026-04-26 at 13.54.10 (1).jpeg",
                    "/WhatsApp Image 2026-04-26 at 13.54.10.jpeg",
                    "/WhatsApp Image 2026-04-26 at 14.24.26.jpeg",
                    "/WhatsApp Video 2026-04-26 at 10.09.04 (1).mp4"
                  ],
                },
                {
                  client: "HDA (Western Cape)",
                  scope: "Advertising of Housing Beneficiaries",
                  duration: "4 Months",
                  status: "Completed",
                  outcome:
                    "Successful advertising campaign for housing beneficiaries.",
                  img: HDA_IMG,
                },
                {
                  client: "HDA (Durban)",
                  scope: "Projector & Electric Screen Installation",
                  duration: "Project Based",
                  status: "Completed",
                  outcome: "High-quality AV installation for regional office.",
                  img: HDA_IMG,
                  images: [
                    "/WhatsApp Video 2026-03-26 at 19.45.21.mp4",
                    HDA_IMG,
                    "/WhatsApp Image 2026-03-25 at 17.51.03 (1).jpeg",
                    "/WhatsApp Image 2026-03-25 at 17.51.03 (2).jpeg",
                    "/WhatsApp Image 2026-03-25 at 17.51.03 (3).jpeg"
                  ],
                },
                {
                  client: "HDA (Head Office)",
                  scope: "Supply & Delivery of IT Equipment",
                  duration: "Project Based",
                  status: "Completed",
                  outcome: "Ongoing delivery of high-end IT hardware.",
                  img: HDA_IMG,
                },
                {
                  client: "HDA (North West)",
                  scope: "Township Establishment Advertising",
                  duration: "Project Based",
                  status: "Completed",
                  outcome: "All 7  local newspaper and Government gazette were approved.",
                  img: HDA_IMG,
                },
                {
                  client: "NHLS",
                  scope: "Vacancy Advertising Services",
                  duration: "Ongoing",
                  status: "Completed",
                  outcome: "Continuous recruitment and vacancy advertising.",
                  img: NHLS_IMG,
                },
                {
                  client: "Dept. of Water & Sanitation",
                  scope: "CCTV Supply & Installation",
                  duration: "Project Based",
                  status: "Completed",
                  outcome: "Advanced security monitoring for critical sites.",
                  img: WATER_IMG,
                  images: [
                    "/WhatsApp Video 2026-03-26 at 19.44.04.mp4",
                    "/WhatsApp Video 2026-03-26 at 19.45.16.mp4",
                    WATER_IMG,
                    
                    "/WhatsApp Image 2026-03-25 at 17.51.43 (1).jpeg",
                    "/WhatsApp Image 2026-03-25 at 17.51.43 (2) - Copy.jpeg",
                    "/WhatsApp Image 2026-03-25 at 17.51.44.jpeg",
                    "/WhatsApp Image 2026-03-25 at 17.51.45 - Copy.jpeg",
                    "/WhatsApp Image 2026-03-25 at 17.51.45 (1) - Copy.jpeg"
                  ],
                },
              ].map((project, i) => (
                <ProjectCard key={i} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* --- Clients --- */}
        <section className="py-20 bg-light-grey">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest">
                Ongoing Clients & Contracts
              </h3>
            </div>
            <div className="w-full relative overflow-hidden py-4 group">
              {/* Fade masks */}
              <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-light-grey to-transparent z-10 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-light-grey to-transparent z-10 pointer-events-none"></div>

              <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
                {[...Array(2)].map((_, arrayIndex) => (
                  <div key={arrayIndex} className="flex gap-8 md:gap-16 items-center pr-8 md:pr-16">
                    {[
                      { name: "Client Partner", logo: "/WhatsApp Image 2026-03-27 at 11.24.40.jpeg" },
                      { name: "Client Partner", logo: "/WhatsApp Image 2026-03-27 at 11.21.39.jpeg" },
                      { name: "Client Partner", logo: "/WhatsApp Image 2026-03-27 at 11.21.17.jpeg" },
                      { name: "Rondo Group", logo: "/rondo-group-logo.jpeg" },
                      { name: "Kapi Projects", logo: "/kapi-logo.png" },
                      { name: "Mauda BEC", logo: "/mauda-bec-logo.jpg" },
                      { name: "Dept. of Water & Sanitation", logo: WATER_IMG },
                      { name: "NHLS", logo: NHLS_IMG },
                      { name: "HDA", logo: HDA_IMG },
                    ].map((client, i) => (
                      <div
                        key={`${arrayIndex}-${i}`}
                        className="bg-white px-10 py-6 rounded-2xl shadow-sm font-black text-2xl text-navy italic cursor-default transition-all duration-300 flex items-center justify-center min-w-[280px] md:min-w-[336px] h-[168px] hover:scale-105"
                      >
                        {client.logo ? (
                          <img
                            src={client.logo}
                            alt={client.name}
                            className="max-h-full max-w-full object-contain mix-blend-multiply"
                          />
                        ) : (
                          client.name
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-16 text-center">
              <p className="text-gray-500 flex items-center justify-center gap-2">
                <CheckCircle2 className="text-teal" size={20} /> Providing 24/7
                IT Support, Cybersecurity, and Infrastructure Maintenance.
              </p>
            </div>
          </div>
        </section>

        {/* --- Contact --- */}
        <section id="contact" className="relative py-24 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={AV_IMG}
              alt="Contact Background"
              className="w-full h-full object-cover opacity-20"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-white/90" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-20">
              <div>
                <h2 className="text-5xl font-bold mb-8">
                  Let's work <br /> <span className="text-teal">together.</span>
                </h2>
                <p className="text-gray-600 mb-12 text-lg">
                  Ready to elevate your business with innovative IT solutions?
                  Our team is standing by to assist with your next project.
                </p>

                <div className="space-y-8">
                  <div className="flex gap-6 items-start">
                    <div className="bg-light-grey p-4 rounded-2xl text-teal">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-bold uppercase tracking-tighter mb-1">
                        Call Us
                      </p>
                      <p className="text-xl font-bold">
                        <a href="tel:+27733858066" className="hover:text-teal transition-colors">073 385 8066</a>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="bg-light-grey p-4 rounded-2xl text-teal">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-bold uppercase tracking-tighter mb-1">
                        Email Us
                      </p>
                      <p className="text-xl font-bold">
                        <a href="mailto:info@rondoitbs.co.za" className="hover:text-teal transition-colors">info@rondoitbs.co.za</a>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="bg-light-grey p-4 rounded-2xl text-teal">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-bold uppercase tracking-tighter mb-1">
                        Visit Us
                      </p>
                      <p className="text-lg leading-tight mt-1 font-bold">Block N1, 107 Boardwalk Blvd, Faerie Glen, Pretoria, 0081</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="bg-light-grey p-4 rounded-2xl text-teal">
                      <Users size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-bold uppercase tracking-tighter mb-1">
                        Director & Founder
                      </p>
                      <p className="text-xl font-bold">Rokhethwa Ndouvhada</p>
                      <div className="text-sm mt-1 text-gray-500 font-medium">
                        <p>Rokhethwan@rondoitbs.co.za</p>
                        <p>073 385 8066</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-light-grey p-10 rounded-[40px]"
              >
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="h-full flex flex-col items-center justify-center text-center py-12"
                    >
                      <div className="bg-teal text-white p-6 rounded-full mb-6">
                        <CheckCircle2 size={48} />
                      </div>
                      <h3 className="text-3xl font-bold mb-4">Message Sent!</h3>
                      <p className="text-gray-600">
                        Thank you for reaching out. Our team will get back to
                        you shortly.
                      </p>
                      <button
                        onClick={() => setIsSuccess(false)}
                        className="mt-8 text-teal font-bold hover:underline"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                      onSubmit={handleSubmit}
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold ml-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            placeholder="John Doe"
                            className={`w-full px-6 py-4 rounded-2xl border-none focus:ring-2 outline-none transition-all ${
                              errors.fullName
                                ? "ring-2 ring-red-500"
                                : "focus:ring-teal"
                            } ${isSubmitting ? "bg-gray-50" : ""}`}
                          />
                          {errors.fullName && (
                            <p className="text-xs text-red-500 ml-1 font-medium">
                              {errors.fullName}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold ml-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            placeholder="john@example.com"
                            className={`w-full px-6 py-4 rounded-2xl border-none focus:ring-2 outline-none transition-all ${
                              errors.email
                                ? "ring-2 ring-red-500"
                                : "focus:ring-teal"
                            } ${isSubmitting ? "bg-gray-50" : ""}`}
                          />
                          {errors.email && (
                            <p className="text-xs text-red-500 ml-1 font-medium">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold ml-1">
                          Subject
                        </label>
                        <div className="relative">
                          <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className={`w-full px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-teal outline-none appearance-none bg-white ${isSubmitting ? "bg-gray-50" : ""}`}
                          >
                            <option>IT Infrastructure</option>
                            <option>CCTV Installation</option>
                            <option>Business Solutions</option>
                            <option>Other Inquiry</option>
                          </select>
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <ChevronRight size={20} className="rotate-90" />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold ml-1">
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          rows={5}
                          placeholder="How can we help you?"
                          className={`w-full px-6 py-4 rounded-2xl border-none focus:ring-2 outline-none resize-none transition-all ${
                            errors.message
                              ? "ring-2 ring-red-500"
                              : "focus:ring-teal"
                          } ${isSubmitting ? "bg-gray-50" : ""}`}
                        ></textarea>
                        {errors.message && (
                          <p className="text-xs text-red-500 ml-1 font-medium">
                            {errors.message}
                          </p>
                        )}
                      </div>
                      <button
                        disabled={isSubmitting}
                        className="w-full bg-navy text-white py-5 rounded-2xl font-bold hover:bg-teal transition-all shadow-xl shadow-navy/10 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- Map & Location Section --- */}
        <section id="location" className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2"
              >
                <div className="inline-block px-4 py-2 bg-teal/10 text-teal rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                  Our Presence
                </div>
                <h2 className="text-5xl font-bold mb-8 leading-tight">
                  Find Us in the <span className="text-teal">Heart</span> of
                  Pretoria
                </h2>
                <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                  Strategically located to serve businesses across Gauteng and
                  beyond. Our headquarters in Pretoria is the hub of our
                  innovation and technical excellence.
                </p>

                <div className="space-y-8">
                  <div className="flex gap-6 items-start p-8 rounded-3xl bg-light-grey hover:bg-teal/5 transition-colors group">
                    <div className="bg-white p-4 rounded-2xl text-teal shadow-sm group-hover:scale-110 transition-transform">
                      <MapPin size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Headquarters</h4>
                      <p className="text-gray-600">
                        Block N1, 107 Boardwalk Blvd
                      </p>
                      <p className="text-gray-600">
                        Faerie Glen, Pretoria, 0081
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start p-8 rounded-3xl bg-light-grey hover:bg-teal/5 transition-colors group">
                    <div className="bg-white p-4 rounded-2xl text-teal shadow-sm group-hover:scale-110 transition-transform">
                      <Globe size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Service Area</h4>
                      <p className="text-gray-600">
                        Nationwide coverage with focus on
                      </p>
                      <p className="text-gray-600">
                        Gauteng, Limpopo, and Mpumalanga
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2 w-full h-[600px] rounded-[40px] overflow-hidden shadow-2xl relative group"
              >
                <iframe
                  src="https://maps.google.com/maps?width=600&height=400&hl=en&q=Block N1, 107 Boardwalk Blvd, Faerie Glen, Pretoria, 0081&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none border-[16px] border-white/10 rounded-[40px]"></div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-navy text-white pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2">
              <img
                src={LOGO}
                alt="Rondo IT Logo"
                className="h-[108px] p-0 m-0 brightness-0 invert"
                referrerPolicy="no-referrer"
              />
              <p className="text-gray-400 max-w-sm mb-8">
                Rondo IT and Business Solutions continues to grow its footprint
                through successful project delivery and a strong commitment to
                excellence. We remain focused on leveraging technology and
                strategic solutions to support development, efficiency, and
                transformation across all sectors.
              </p>
              <div className="flex gap-4">
                {[
                  {
                    icon: <Linkedin size={18} />,
                    href: "https://linkedin.com/company/rondo-it",
                    label: "LinkedIn",
                  },
                  {
                    icon: <Twitter size={18} />,
                    href: "https://twitter.com/rondoit",
                    label: "Twitter",
                  },
                  {
                    icon: <Facebook size={18} />,
                    href: "https://facebook.com/rondoit",
                    label: "Facebook",
                  },
                  {
                    icon: <Instagram size={18} />,
                    href: "https://instagram.com/rondoit",
                    label: "Instagram",
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal transition-colors cursor-pointer text-white"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h5 className="font-bold mb-6">Quick Links</h5>
              <ul className="space-y-4 text-gray-400 text-sm">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="hover:text-teal transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6">Services</h5>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li>
                  <a
                    href="#services"
                    className="hover:text-teal transition-colors"
                  >
                    IT Infrastructure
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-teal transition-colors"
                  >
                    CCTV Systems
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-teal transition-colors"
                  >
                    Business Ads
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-teal transition-colors"
                  >
                    Cybersecurity
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6">Contact Info</h5>
              <div className="space-y-2 text-gray-400 text-sm">
                <p className="text-white font-bold text-base">Rokhethwa Ndouvhada</p>
                <p className="text-teal font-medium">Director & Founder</p>
                <div className="pt-2">
                  <p>
                    <a href="mailto:info@rondoitbs.co.za" className="hover:text-teal transition-colors">info@rondoitbs.co.za</a>
                  </p>
                  <p>
                    <a href="tel:+27733858066" className="hover:text-teal transition-colors">073 385 8066</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500 uppercase tracking-widest">
            <p>© 2026 Rondo IT and Business Solutions. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
