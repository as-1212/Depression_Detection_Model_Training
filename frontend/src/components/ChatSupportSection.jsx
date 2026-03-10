import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Sparkles, Wind, Compass } from 'lucide-react';

const initialMessages = [
  {
    id: 'intro',
    role: 'assistant',
    text: "Hi, I'm MindGuard. I'm not a therapist, but I can offer gentle reflections and coping ideas based on what you share.",
  },
];

const suggestionPills = [
  { id: 'breathing', label: 'Guided breathing', icon: Wind },
  { id: 'grounding', label: 'Grounding exercise', icon: Compass },
  { id: 'check-in', label: 'Quick emotional check-in', icon: Sparkles },
];

function createSupportiveReply(message) {
  const lower = message.toLowerCase();
  if (lower.includes('tired') || lower.includes('exhausted')) {
    return "I hear how draining that feels. When energy is low, it can help to shrink your to‑do list to just one or two very small, kind actions for yourself. Would you like a 2‑minute reset idea?";
  }
  if (lower.includes('anxious') || lower.includes('anxiety') || lower.includes('worry')) {
    return "Anxiety can make your whole body feel on alert. One option is a simple grounding technique: name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.";
  }
  if (lower.includes('worthless') || lower.includes('failure')) {
    return "Feeling worthless is incredibly painful. You deserve care and support, even when your mind is telling you otherwise. Talking to a trusted person or a professional could offer a different, kinder perspective.";
  }
  return "Thank you for trusting me with that. It sounds like you're carrying a lot. I can't fully understand your whole context, but I'm here to help you pause, notice what you feel, and consider small next steps.";
}

export function ChatSupportSection() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (value) => {
    const content = (value ?? input).trim();
    if (!content || isTyping) return;

    const userMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      text: content,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const assistantText = createSupportiveReply(content);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-assistant`,
          role: 'assistant',
          text: assistantText,
        },
      ]);
      setIsTyping(false);
    }, 600 + Math.random() * 600);
  };

  return (
    <section className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-2"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Gentle AI support
        </p>
        <h2 className="text-[26px] font-semibold leading-snug tracking-tight text-slate-50 md:text-[28px]">
          A calm space to put feelings into words.
        </h2>
        <p className="max-w-xl text-sm text-slate-400">
          This chat is not therapy and does not provide medical advice, but it can help
          you slow down, name what you&apos;re feeling and explore small ways to care for
          yourself.
        </p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)]">
        <motion.div
          className="card-elevated rounded-3xl p-4 md:p-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary/20 text-primary-soft">
                <MessageCircle className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-medium text-slate-200">
                  MindGuard support space
                </p>
                <p className="text-[11px] text-slate-500">
                  Messages stay in this browser and are not saved.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-3 h-64 overflow-y-auto rounded-2xl bg-surface-subtle/90 p-3.5 text-[13px] text-slate-200">
            <div className="space-y-2.5">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                      msg.role === 'user'
                        ? 'bg-primary/90 text-slate-50'
                        : 'bg-surface-soft/95 text-slate-100 border border-slate-800/80'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-soft" />
                  MindGuard is reflecting...
                </div>
              )}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="space-y-2"
          >
            <textarea
              rows={2}
              className="textarea-mental"
              placeholder="You can share a few sentences about what has been on your mind today..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {suggestionPills.map((pill) => {
                  const Icon = pill.icon;
                  return (
                    <button
                      key={pill.id}
                      type="button"
                      className="btn-ghost"
                      onClick={() =>
                        handleSend(
                          pill.id === 'breathing'
                            ? 'I would like a simple breathing exercise.'
                            : pill.id === 'grounding'
                            ? 'Can you guide me through a grounding exercise?'
                            : "I'm not sure how I feel, but I'd like a quick emotional check-in."
                        )
                      }
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{pill.label}</span>
                    </button>
                  );
                })}
              </div>
              <motion.button
                type="submit"
                className="btn-primary"
                whileTap={{ scale: 0.97 }}
                disabled={!input.trim()}
              >
                <span>Send</span>
              </motion.button>
            </div>
          </form>
        </motion.div>

        <motion.div
          className="card-elevated rounded-3xl p-4 md:p-5"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-xs font-semibold text-slate-200">
            This space is for reflection, not crisis support.
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-400">
            If you are thinking about self‑harm, hurting yourself, or feel unable to stay
            safe, please contact local emergency services or a crisis hotline
            immediately. You deserve immediate, human support.
          </p>
          <ul className="mt-3 space-y-1.5 text-[12px] text-slate-400">
            <li>• In India: KIRAN mental health helpline – 1800-599-0019</li>
            <li>• In the US &amp; Canada: 988 Suicide &amp; Crisis Lifeline</li>
            <li>• In the EU/UK: call 112/999 or your local crisis line</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

