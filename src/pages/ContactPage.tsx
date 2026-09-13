import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, ExternalLink } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Order Tracking / Support');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [lastSentData, setLastSentData] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
  } | null>(null);

  const targetEmail = 'messy.games77@gmail.com';

  const triggerMailto = (senderName: string, senderEmail: string, msgSubject: string, msgBody: string) => {
    const formattedSubject = encodeURIComponent(`[MESSY GAMES] ${msgSubject} - from ${senderName}`);
    const formattedBody = encodeURIComponent(
      `Sender Name: ${senderName}\nSender Email: ${senderEmail}\nInquiry: ${msgSubject}\n\nMessage:\n${msgBody}\n\n--- Sent from Messy Games Online Store ---`
    );
    window.location.href = `mailto:${targetEmail}?subject=${formattedSubject}&body=${formattedBody}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setLastSentData({
      name,
      email,
      subject,
      message,
    });

    // Trigger email client directed to messy.games77@gmail.com
    triggerMailto(name, email, subject, message);

    setIsSent(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div id="contact-page" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-widest">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>DIRECT TABLE SUPPORT</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
          GET IN TOUCH
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Need help with an order, rule clarification, or feedback? Send us a message directly.
        </p>
      </div>

      {/* Contact Form Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#0B0F1F] border border-white/10 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="font-display font-black text-xl text-white uppercase tracking-wide">
            Send us a Message
          </h2>
          <span className="text-xs text-amber-300 font-mono flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>{targetEmail}</span>
          </span>
        </div>

        {isSent ? (
          <div className="p-8 sm:p-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
            <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl text-white">Message Dispatched!</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Your message has been directed to{' '}
                <span className="text-amber-400 font-bold">{targetEmail}</span>. Our team will review it and reply back to you promptly.
              </p>
            </div>

            {lastSentData && (
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-left text-xs text-slate-300 space-y-1 max-w-lg mx-auto">
                <div>
                  <span className="text-slate-500 font-bold uppercase">From:</span> {lastSentData.name} ({lastSentData.email})
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase">Subject:</span> {lastSentData.subject}
                </div>
                <div className="pt-1 text-slate-200 line-clamp-3">
                  <span className="text-slate-500 font-bold uppercase block">Message:</span> {lastSentData.message}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {lastSentData && (
                <button
                  type="button"
                  onClick={() =>
                    triggerMailto(
                      lastSentData.name,
                      lastSentData.email,
                      lastSentData.subject,
                      lastSentData.message
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-400 text-black font-black uppercase text-xs hover:bg-amber-300 cursor-pointer shadow-md"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Re-open in Mail App</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsSent(false)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider cursor-pointer border border-white/10"
              >
                Send Another Message
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-300">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Youssef Nabil"
                  className="w-full px-4 py-3 rounded-xl bg-[#060812] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-300">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="youssef@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#060812] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-slate-300">
                Subject / Inquiry Type
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#060812] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 cursor-pointer transition-colors"
              >
                <option value="Order Tracking / Support">Order Tracking / Support</option>
                <option value="Game Rule Clarification">Game Rule Clarification</option>
                <option value="Wholesale & Bookstore Distribution">Wholesale & Bookstore Distribution</option>
                <option value="General Feedback">General Feedback / Game Suggestion</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-slate-300">
                Message *
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                className="w-full px-4 py-3 rounded-xl bg-[#060812] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 resize-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl font-display font-black text-sm uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 shadow-[0_0_20px_rgba(250,204,21,0.25)] transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>SEND MESSAGE TO MESSY.GAMES77@GMAIL.COM</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
