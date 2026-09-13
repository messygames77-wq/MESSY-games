import React, { useState } from 'react';
import { Page } from '../types';
import { HelpCircle, ChevronDown, Truck, CreditCard, RotateCcw, Users, Search, Package } from 'lucide-react';

interface FaqPageProps {
  onNavigate: (page: Page) => void;
}

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const faqs: FaqItem[] = [
    {
      category: 'Shipping & Delivery',
      question: 'How fast does delivery take across Egypt?',
      answer:
        'Deliveries within Cairo and Giza typically arrive within 24 to 48 hours. Orders to Alexandria, Delta cities, and Canal zones arrive within 2 to 3 business days. Remote governorates (Hurghada, Sharm El Sheikh, Upper Egypt) take 3 to 4 business days.',
    },
    {
      category: 'Shipping & Delivery',
      question: 'How much is shipping, and how do I get free shipping?',
      answer:
        'Standard nationwide shipping is 50 EGP. Any order totaling 800 EGP or higher automatically qualifies for FREE shipping across all Egyptian governorates!',
    },
    {
      category: 'Payment',
      question: 'Can I pay with Cash on Delivery (COD)?',
      answer:
        'Yes! Cash on Delivery is our default and most popular payment method. You simply pay the delivery courier in cash when the package arrives at your doorstep. You can inspect the sealed package before paying.',
    },
    {
      category: 'Payment',
      question: 'Are online card payments accepted?',
      answer:
        'We are currently integrating an official banking gateway for Visa and Mastercard payments. In the meantime, Cash on Delivery is active for all orders nationwide.',
    },
    {
      category: 'Order Tracking',
      question: 'How do I track the status of my order?',
      answer:
        'Click the PROFILE icon in the top header at any time to open your account and live orders dashboard. You will see a live visual progress tracker showing: ORDER RECEIVED → PREPARING → SHIPPED → DELIVERED, along with your courier tracking number.',
    },
    {
      category: 'Returns',
      question: 'What is your return & exchange policy?',
      answer:
        'We offer a 14-day hassle-free return and exchange guarantee. As long as the shrink-wrap on the card deck is intact and undamaged, we will replace or refund your game without questions. If your game arrives with a manufacturing defect or missing cards, we will dispatch a replacement immediately.',
    },
    {
      category: 'Game Specs',
      question: 'What ages are MESSY GAMES suitable for?',
      answer:
        'Most of our games (such as MESSY MAYHEM and CHAOS CARDS) are rated 10+, making them fantastic for families, teens, and adults. QUICK MESS is friendly for ages 8+, while SQUAD CHAOS and MESSY MYSTERY are rated 12+ for tactical depth and deductive storytelling.',
    },
    {
      category: 'Game Specs',
      question: 'What player counts work best?',
      answer:
        'We design titles for diverse group sizes! For intimate 2–4 player sessions, check out QUICK MESS or CHAOS CARDS. For standard party stacks of 3–8 players, MESSY MAYHEM and MESSY MYSTERY are unbeatable. For huge groups of 4–10 players, SQUAD CHAOS is purpose-built with team mechanics.',
    },
    {
      category: 'Game Specs',
      question: 'Are the card texts in English or Arabic?',
      answer:
        'All Messy Games are 100% bilingual! Cards feature both English instructions and natural Egyptian Arabic translations, so everyone around your table can play smoothly without language barriers.',
    },
  ];

  const categories = ['All', 'Shipping & Delivery', 'Payment', 'Order Tracking', 'Returns', 'Game Specs'];

  const filteredFaqs = activeCategory === 'All' ? faqs : faqs.filter((f) => f.category === activeCategory);

  return (
    <div id="faq-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-600/15 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest">
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>ANSWERS & KNOWLEDGE BASE</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
          FREQUENTLY ASKED QUESTIONS
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          Everything you need to know about deliveries, gameplay, payments, and order tracking.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setOpenIndex(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-amber-400 text-black shadow-md'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion Questions */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all ${
                isOpen
                  ? 'bg-[#0E1326] border-amber-400/40 shadow-xl'
                  : 'bg-[#0B0F1F] border-white/10 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="font-display font-bold text-sm sm:text-base text-white">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-amber-400 flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 ml-5 mr-5">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still need help banner */}
      <div className="p-8 rounded-3xl bg-[#0C1124] border border-white/10 text-center space-y-4">
        <h3 className="font-display font-black text-xl text-white uppercase">
          Still Have a Question?
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Can’t find what you’re looking for? Reach out to our Cairo support desk or track your active shipment in your profile.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('profile')}
            className="px-6 py-3 rounded-xl bg-amber-400 text-black font-black uppercase text-xs hover:bg-amber-300 cursor-pointer shadow-md"
          >
            TRACK MY ORDER IN PROFILE
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-xl bg-white/10 text-white font-bold uppercase text-xs hover:bg-white/15 cursor-pointer border border-white/10"
          >
            CONTACT CUSTOMER SUPPORT
          </button>
        </div>
      </div>
    </div>
  );
};
