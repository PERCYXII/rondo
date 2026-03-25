/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Instagram
} from 'lucide-react';

// --- Assets ---
const LOGO = "https://ais-dev-rtc6n7dgc4ree5euzglxoe-62638855817.europe-west3.run.app/input_file_8.png";
const HERO_IMG = "https://ais-dev-rtc6n7dgc4ree5euzglxoe-62638855817.europe-west3.run.app/input_file_0.png";
const CCTV_IMG = "https://ais-dev-rtc6n7dgc4ree5euzglxoe-62638855817.europe-west3.run.app/input_file_1.png";
const SERVER_IMG = "https://ais-dev-rtc6n7dgc4ree5euzglxoe-62638855817.europe-west3.run.app/input_file_5.png";
const INFRA_IMG = "https://ais-dev-rtc6n7dgc4ree5euzglxoe-62638855817.europe-west3.run.app/input_file_4.png";
const AV_IMG = "https://ais-dev-rtc6n7dgc4ree5euzglxoe-62638855817.europe-west3.run.app/input_file_7.png";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: 'IT Infrastructure',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message cannot be empty';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ fullName: '', email: '', subject: 'IT Infrastructure', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Location', href: '#location' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-navy selection:bg-teal selection:text-white">
      {/* --- Navigation --- */}
      <nav 
        className={`sticky top-0 w-full z-50 transition-all duration-300 border-b border-gray-100 ${
          scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-white shadow-sm py-3'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="flex items-center gap-3">
            <img src={LOGO} alt="Rondo IT Logo" className="h-10 md:h-12 object-contain" referrerPolicy="no-referrer" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium hover:text-teal transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
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
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium hover:text-teal"
                  >
                    {link.name}
                  </a>
                ))}
                <a 
                  href="#contact" 
                  onClick={() => setIsMenuOpen(false)}
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
      <section id="home" className="relative min-h-[60vh] flex items-center overflow-hidden pt-4 pb-4">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={HERO_IMG} 
            alt="Rondo IT Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-navy/20" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 md:p-8 rounded-[24px] shadow-2xl inline-block"
            >
              <span className="inline-block px-3 py-1 bg-teal text-white rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 shadow-lg shadow-teal/20">
                Empowering Digital Transformation
              </span>
              <h1 className="text-3xl md:text-4xl font-bold leading-[1.2] mb-4 text-white mix-blend-plus-lighter">
                Innovative IT & <br />
                <span className="text-teal">Business Solutions</span> <br />
                for a Digital Future
              </h1>
              <p className="text-base text-gray-200 mb-6 max-w-lg leading-relaxed font-medium mix-blend-plus-lighter opacity-90">
                Rondo IT & Business Solutions provides cutting-edge infrastructure, security, and strategic business services tailored for government and enterprise excellence.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#services" className="bg-teal text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-navy transition-all flex items-center gap-2 group shadow-xl shadow-teal/20 text-sm">
                  Our Services <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#contact" className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-navy transition-all text-sm">
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
            <h2 className="text-teal font-bold uppercase tracking-widest text-sm mb-4">About Rondo IT</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-8">Committed to Excellence & Innovation</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Rondo IT and Business Solutions is a premier service provider dedicated to delivering high-impact technology and business support. We provide innovative, reliable, and cost-effective solutions tailored to meet the evolving needs of both public and private sector clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="bg-light-grey p-8 rounded-3xl">
                <h4 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 bg-navy text-white rounded-lg flex items-center justify-center"><Globe size={20} /></span>
                  Our Mission
                </h4>
                <p className="text-gray-600">To deliver innovative, reliable, and cost-effective services that empower organizations to achieve their goals.</p>
              </div>
              <div className="bg-light-grey p-8 rounded-3xl">
                <h4 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 bg-teal text-white rounded-lg flex items-center justify-center"><Shield size={20} /></span>
                  Our Vision
                </h4>
                <p className="text-gray-600">To become a leading provider of IT and business solutions in South Africa and beyond.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { title: 'Professionalism', icon: <Briefcase /> },
                { title: 'Reliability', icon: <Clock /> },
                { title: 'Innovation', icon: <Server /> },
                { title: 'Satisfaction', icon: <CheckCircle2 /> },
              ].map((val, i) => (
                <div key={i} className="border border-gray-100 p-6 rounded-2xl hover:shadow-lg transition-shadow text-center group">
                  <div className="text-teal mb-4 flex justify-center group-hover:scale-110 transition-transform">{val.icon}</div>
                  <p className="font-bold">{val.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 p-10 bg-navy text-white rounded-[40px] text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10"><Award size={120} /></div>
            <h4 className="text-2xl font-bold mb-4 relative z-10">Our Commitment</h4>
            <p className="text-gray-300 max-w-2xl mx-auto relative z-10 italic">
              "Rondo IT and Business Solutions is dedicated to delivering services that meet the highest standards of quality, integrity, and efficiency. We strive to build long-term relationships with our clients by consistently exceeding expectations and providing solutions that add measurable value."
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Specialized Services</h2>
            <p className="text-gray-600">Comprehensive solutions split into IT and Business categories.</p>
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
                <div className="bg-navy text-white p-4 rounded-2xl"><Server size={32} /></div>
                <h3 className="text-3xl font-bold">IT Services</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: 'Equipment Supply', icon: <Briefcase />, desc: 'Supply and delivery of IT equipment.' },
                  { title: 'Infrastructure', icon: <Database />, desc: 'Installation and configuration of IT infrastructure.' },
                  { title: 'CCTV Systems', icon: <Camera />, desc: 'CCTV systems supply and installation.' },
                  { title: 'AV Solutions', icon: <Monitor />, desc: 'Audio-visual solutions (projectors and screens).' },
                  { title: '24/7 Support', icon: <Headphones />, desc: '24/7 IT support services.' },
                  { title: 'Cybersecurity', icon: <Shield />, desc: 'Cybersecurity services.' },
                  { title: 'SharePoint', icon: <Globe />, desc: 'SharePoint maintenance.' },
                  { title: 'Web Maintenance', icon: <FileText />, desc: 'Website maintenance.' },
                ].map((s, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.6, ease: "easeOut" }}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.02)" }}
                    className="flex gap-4 p-4 rounded-2xl hover:bg-light-grey transition-colors group cursor-default"
                  >
                    <div className="text-teal shrink-0 group-hover:scale-110 transition-transform">{s.icon}</div>
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
                <div className="bg-teal text-white p-4 rounded-2xl"><Users size={32} /></div>
                <h3 className="text-3xl font-bold">Business Solutions</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: 'Advertising', icon: <Megaphone />, desc: 'Advertising and media placement.' },
                  { title: 'Gazette Pubs', icon: <FileText />, desc: 'Public notices and government gazette publications.' },
                  { title: 'Recruitment Ads', icon: <Search />, desc: 'Recruitment and vacancy advertising.' },
                  { title: 'Project Comms', icon: <MessageSquare />, desc: 'Project support and communication services.' },
                ].map((s, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                    className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-default"
                  >
                    <div className="text-teal shrink-0 group-hover:scale-110 transition-transform">{s.icon}</div>
                    <div>
                      <h4 className="font-bold text-sm mb-1">{s.title}</h4>
                      <p className="text-xs text-gray-300">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/10">
                <p className="text-sm italic text-gray-400">"We provide strategic business support that ensures your projects communicate effectively and reach the right audience."</p>
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
              <h2 className="text-teal font-bold uppercase tracking-widest text-sm mb-4">Case Studies</h2>
              <h3 className="text-4xl md:text-5xl font-bold">Proven Track Record</h3>
            </div>
            <p className="text-gray-500 max-w-sm">Explore our successful implementations across various government and enterprise sectors.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                client: 'HDA (Western Cape)',
                scope: 'Advertising of Housing Beneficiaries',
                duration: '4 Months',
                status: 'Completed',
                outcome: 'Successful advertising campaign for housing beneficiaries.',
                img: HERO_IMG
              },
              {
                client: 'HDA (Durban)',
                scope: 'Projector & Electric Screen Installation',
                duration: 'Project Based',
                status: 'Completed',
                outcome: 'High-quality AV installation for regional office.',
                img: AV_IMG
              },
              {
                client: 'HDA (Head Office)',
                scope: 'Supply & Delivery of IT Equipment',
                duration: 'Project Based',
                status: 'In Progress',
                outcome: 'Ongoing delivery of high-end IT hardware.',
                img: SERVER_IMG
              },
              {
                client: 'HDA (North West)',
                scope: 'Township Establishment Advertising',
                duration: 'Project Based',
                status: 'On Hold',
                outcome: 'Pending further regulatory approvals.',
                img: INFRA_IMG
              },
              {
                client: 'NHLS',
                scope: 'Vacancy Advertising Services',
                duration: 'Ongoing',
                status: 'In Progress',
                outcome: 'Continuous recruitment and vacancy advertising.',
                img: HERO_IMG
              },
              {
                client: 'Dept. of Water & Sanitation',
                scope: 'CCTV Supply & Installation',
                duration: 'Project Based',
                status: 'Completed',
                outcome: 'Advanced security monitoring for critical sites.',
                img: CCTV_IMG
              }
            ].map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8, type: 'spring', stiffness: 100 }}
                whileHover={{ rotateY: 5, scale: 1.02 }}
                className="group cursor-pointer perspective-1000"
              >
                <div className="relative h-64 rounded-3xl overflow-hidden mb-6">
                  <img src={project.img} alt={project.client} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <p className="text-white font-bold">View Case Study</p>
                  </div>
                </div>
                <h4 className="text-2xl font-bold mb-2">{project.client}</h4>
                <p className="text-teal font-semibold text-sm mb-4">{project.scope}</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-bold text-navy">Duration:</span> {project.duration}</p>
                  <p><span className="font-bold text-navy">Project Status:</span> {project.status}</p>
                  <p><span className="font-bold text-navy">Outcome:</span> {project.outcome}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Clients --- */}
      <section className="py-20 bg-light-grey">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest">Ongoing Clients & Contracts</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
            {['Rondo Group', 'Kapi Projects', 'Mauda BEC'].map((client, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.1 }}
                className="bg-white px-10 py-6 rounded-2xl shadow-sm font-black text-2xl text-navy italic cursor-default grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                {client}
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <p className="text-gray-500 flex items-center justify-center gap-2">
              <CheckCircle2 className="text-teal" size={20} /> Providing 24/7 IT Support, Cybersecurity, and Infrastructure Maintenance.
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
              <h2 className="text-5xl font-bold mb-8">Let's work <br /> <span className="text-teal">together.</span></h2>
              <p className="text-gray-600 mb-12 text-lg">Ready to elevate your business with innovative IT solutions? Our team is standing by to assist with your next project.</p>
              
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="bg-light-grey p-4 rounded-2xl text-teal"><Phone size={24} /></div>
                  <div>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-tighter mb-1">Call Us</p>
                    <p className="text-xl font-bold">+27 (0) 12 345 6789</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="bg-light-grey p-4 rounded-2xl text-teal"><Mail size={24} /></div>
                  <div>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-tighter mb-1">Email Us</p>
                    <p className="text-xl font-bold">info@rondoit.co.za</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="bg-light-grey p-4 rounded-2xl text-teal"><MapPin size={24} /></div>
                  <div>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-tighter mb-1">Visit Us</p>
                    <p className="text-xl font-bold">Menlyn Park, Pretoria</p>
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
                    <p className="text-gray-600">Thank you for reaching out. Our team will get back to you shortly.</p>
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
                        <label className="text-sm font-bold ml-1">Full Name</label>
                        <input 
                          type="text" 
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          placeholder="John Doe" 
                          className={`w-full px-6 py-4 rounded-2xl border-none focus:ring-2 outline-none transition-all ${
                            errors.fullName ? 'ring-2 ring-red-500' : 'focus:ring-teal'
                          } ${isSubmitting ? 'bg-gray-50' : ''}`} 
                        />
                        {errors.fullName && <p className="text-xs text-red-500 ml-1 font-medium">{errors.fullName}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold ml-1">Email Address</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          placeholder="john@example.com" 
                          className={`w-full px-6 py-4 rounded-2xl border-none focus:ring-2 outline-none transition-all ${
                            errors.email ? 'ring-2 ring-red-500' : 'focus:ring-teal'
                          } ${isSubmitting ? 'bg-gray-50' : ''}`} 
                        />
                        {errors.email && <p className="text-xs text-red-500 ml-1 font-medium">{errors.email}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold ml-1">Subject</label>
                      <div className="relative">
                        <select 
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className={`w-full px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-teal outline-none appearance-none bg-white ${isSubmitting ? 'bg-gray-50' : ''}`}
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
                      <label className="text-sm font-bold ml-1">Message</label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        rows={5} 
                        placeholder="How can we help you?" 
                        className={`w-full px-6 py-4 rounded-2xl border-none focus:ring-2 outline-none resize-none transition-all ${
                          errors.message ? 'ring-2 ring-red-500' : 'focus:ring-teal'
                        } ${isSubmitting ? 'bg-gray-50' : ''}`}
                      ></textarea>
                      {errors.message && <p className="text-xs text-red-500 ml-1 font-medium">{errors.message}</p>}
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
                      ) : 'Send Message'}
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
                Find Us in the <span className="text-teal">Heart</span> of Pretoria
              </h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                Strategically located to serve businesses across Gauteng and beyond. Our headquarters in Pretoria is the hub of our innovation and technical excellence.
              </p>

              <div className="space-y-8">
                <div className="flex gap-6 items-start p-8 rounded-3xl bg-light-grey hover:bg-teal/5 transition-colors group">
                  <div className="bg-white p-4 rounded-2xl text-teal shadow-sm group-hover:scale-110 transition-transform">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Headquarters</h4>
                    <p className="text-gray-600">123 Technology Drive, Menlyn Park</p>
                    <p className="text-gray-600">Pretoria, 0081, South Africa</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start p-8 rounded-3xl bg-light-grey hover:bg-teal/5 transition-colors group">
                  <div className="bg-white p-4 rounded-2xl text-teal shadow-sm group-hover:scale-110 transition-transform">
                    <Globe size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Service Area</h4>
                    <p className="text-gray-600">Nationwide coverage with focus on</p>
                    <p className="text-gray-600">Gauteng, Limpopo, and Mpumalanga</p>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114964.3956788546!2d28.11226835!3d-25.74786765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e990513988f407b%3A0x7d28641972005476!2sPretoria!5e0!3m2!1sen!2sza!4v1711382400000!5m2!1sen!2sza" 
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
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <img src={LOGO} alt="Rondo IT Logo" className="h-12 mb-8 brightness-0 invert" referrerPolicy="no-referrer" />
              <p className="text-gray-400 max-w-sm mb-8">
                Rondo IT and Business Solutions continues to grow its footprint through successful project delivery and a strong commitment to excellence. We remain focused on leveraging technology and strategic solutions to support development, efficiency, and transformation across all sectors.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: <Linkedin size={18} />, href: "https://linkedin.com/company/rondo-it", label: "LinkedIn" },
                  { icon: <Twitter size={18} />, href: "https://twitter.com/rondoit", label: "Twitter" },
                  { icon: <Facebook size={18} />, href: "https://facebook.com/rondoit", label: "Facebook" },
                  { icon: <Instagram size={18} />, href: "https://instagram.com/rondoit", label: "Instagram" }
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
                {navLinks.map(link => (
                  <li key={link.name}><a href={link.href} className="hover:text-teal transition-colors">{link.name}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6">Services</h5>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><a href="#services" className="hover:text-teal transition-colors">IT Infrastructure</a></li>
                <li><a href="#services" className="hover:text-teal transition-colors">CCTV Systems</a></li>
                <li><a href="#services" className="hover:text-teal transition-colors">Business Ads</a></li>
                <li><a href="#services" className="hover:text-teal transition-colors">Cybersecurity</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500 uppercase tracking-widest">
            <p>© 2026 Rondo IT and Business Solutions. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
