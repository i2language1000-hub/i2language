"use client";
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, MessageCircle, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { faqs } from '../data/siteData';

const quickActions = ['Course Fees', 'PTE vs IELTS', 'Batch Timings', 'Book Free Demo'];

function getReply(message) {
  const normalized = message.toLowerCase();
  const matchedKey = Object.keys(faqs).find((key) => normalized.includes(key));
  return faqs[matchedKey] || faqs.default;
}

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Hi, I am the i2 Virtual Assistant. Ask me about courses, fees, mock tests, LanguageCert vouchers, or batch timings.'
    }
  ]);
  const endRef = useRef(null);

  const sendMessage = (text) => {
    if (!text.trim()) {
      return;
    }

    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInput('');

    window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'bot', text: getReply(text) }]);
    }, 450);
  };

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            className="mb-4 flex w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between bg-forest-900 px-5 py-4 text-white">
              <div>
                <div className="font-heading text-sm font-extrabold">i2 Support Bot</div>
                <div className="text-xs text-forest-200">Usually replies instantly</div>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-full p-1 text-forest-100 transition hover:bg-white/10">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="h-[360px] space-y-3 overflow-y-auto bg-slate-50 px-4 py-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 ${
                    message.role === 'bot'
                      ? 'rounded-tl-md border border-slate-100 bg-white text-slate-700 shadow-sm'
                      : 'ml-auto rounded-tr-md bg-forest-700 text-white'
                  }`}
                >
                  {message.text}
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="border-t border-slate-100 bg-white p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    onClick={() => sendMessage(action)}
                    className="rounded-full border border-forest-100 bg-forest-50 px-3 py-2 text-xs font-semibold text-forest-700 transition hover:bg-forest-100"
                  >
                    {action}
                  </button>
                ))}
              </div>
              <div className="relative">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      sendMessage(input);
                    }
                  }}
                  className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-4 pr-12 text-sm outline-none transition focus:border-forest-400"
                  placeholder="Type your question..."
                />
                <button onClick={() => sendMessage(input)} className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-forest-700 text-white">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button onClick={() => setOpen((prev) => !prev)} className="group flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-forest-600 to-emerald-500 text-white shadow-glow transition duration-300 hover:scale-105">
        {open ? <X className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
      </button>
    </div>
  );
}
