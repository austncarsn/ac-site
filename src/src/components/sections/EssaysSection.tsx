import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EASE_OUT_EXPO } from '../../lib/constants';
import { X } from 'lucide-react';

interface Essay {
  title: string;
  date: string;
  dateShort: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string[];
}

const ESSAYS: Essay[] = [
  {
    title: 'On Being Outshined By A Discount Constellation',
    date: 'November 17, 2025',
    dateShort: 'Nov 17',
    category: 'Personal',
    tags: ['PERSONAL', 'RANT'],
    excerpt: 'Today I am annoyed. Not poetic annoyed, not elegant character building annoyed. I am the specific kind of irritated that happens when someone who treated you like a side quest suddenly acts like the main storyline.',
    content: [
      'Today I am annoyed. Not poetic annoyed, not elegant character building annoyed. I am the specific kind of irritated that happens when someone who treated you like a side quest suddenly acts like the main storyline, funded by inheritance and delusion.',
      'There was a time when I thought we were on the same team. Two people trying to build something real, scraping together futures out of late nights and messy dreams. Then his father\'s money arrived, and I watched him transform from "we are in this together" to "you are an optional feature I no longer need." I did not even get a software update. I just got uninstalled.',
      'It forces a reflection on how we value our own output in a market that increasingly rewards noise over signal. The interface of our lives is becoming cluttered with pop-ups we didn\'t consent to.',
    ],
  },
  {
    title: 'Order, Gently Mugged By My Brain',
    date: 'November 16, 2025',
    dateShort: 'Nov 16',
    category: 'Process',
    tags: ['PROCESS', 'CREATIVE'],
    excerpt: 'Today I woke up and chose chaos — again, but with taste. The plan was simple: open the laptop, calmly refine a few components, ship a clean update. Instead, I accidentally ran a full-scale creative heist on my own focus.',
    content: [
      'Today I woke up and chose chaos — again, but with taste.',
      'The plan was simple: open the laptop, calmly refine a few components, ship a clean update. Instead, I accidentally ran a full-scale creative heist on my own focus. One moment I was adjusting letter spacing on a hero title, the next I had six new project ideas, three Figma files, two design systems, and a half written prompt for a future AI agent who does not even exist yet.',
      'My chaos isn\'t an accident. It\'s a process with bad posture.',
    ],
  },
  {
    title: 'The Art of Systematic Design',
    date: 'November 2025',
    dateShort: 'Nov 2025',
    category: 'Design Systems',
    tags: ['DESIGN', 'SYSTEMS'],
    excerpt: 'Exploring how systematic thinking transforms interface design from isolated components into cohesive, scalable systems that serve both users and teams.',
    content: [
      'Exploring how systematic thinking transforms interface design from isolated components into cohesive, scalable systems that serve both users and teams. A deep dive into establishing principles, creating flexible foundations, and building design languages that evolve with product needs while maintaining consistency across platforms and contexts.',
      'Systematic design is about more than just creating a set of guidelines. It\'s about building a framework that allows for flexibility and adaptability.',
    ],
  },
];

export function EssaysSection() {
  const [selectedEssay, setSelectedEssay] = useState<Essay>(ESSAYS[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section 
      id="essays" 
      className="w-full relative z-10"
      style={{ 
        paddingTop: 'var(--space-24)',
        paddingBottom: 'var(--space-24)',
        paddingLeft: 'var(--space-4)',
        paddingRight: 'var(--space-4)',
      }}
    >
      {/* THE COMMAND CONSOLE - Floating System Window */}
      <motion.div
        className="max-w-6xl mx-auto overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        style={{
          backgroundColor: '#18181b', // zinc-900
          borderRadius: '2rem',
          // Isolation shadow - lifts it off the page
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          // The bezel - subtle distinct border
          border: '1px solid rgba(255, 255, 255, 0.1)',
          // Additional ring for depth
          outline: '1px solid rgba(0, 0, 0, 0.2)',
          outlineOffset: '-1px',
        }}
      >
        {/* WINDOW HEADER - Technical interface bar */}
        <div 
          className="h-12 flex items-center px-6 gap-2"
          style={{
            backgroundColor: '#09090b', // zinc-950
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          {/* Traffic lights window controls */}
          <div className="flex gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: '#27272a' }} // zinc-800
            />
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: '#27272a' }}
            />
          </div>
          <div 
            className="ml-auto uppercase tracking-widest"
            style={{
              fontFamily: 'monospace',
              fontSize: '10px',
              color: '#52525b', // zinc-600
              letterSpacing: '0.15em',
            }}
          >
            /system/logs/essays
          </div>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] min-h-[600px]">
          
          {/* LEFT COLUMN - The "Tab" List (Navigation) */}
          <div 
            className="p-6 flex flex-col gap-2"
            style={{
              backgroundColor: 'rgba(9, 9, 11, 0.5)', // zinc-950/50
              borderRight: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <h3 
              className="uppercase pl-4 mb-6"
              style={{
                fontFamily: 'var(--font-family)',
                color: '#71717a', // zinc-500
                fontSize: '12px',
                letterSpacing: '0.2em',
                fontWeight: 300,
              }}
            >
              Index
            </h3>

            {/* Essay List */}
            <div className="flex flex-col gap-2">
              {ESSAYS.map((essay, index) => {
                const isActive = selectedEssay.title === essay.title;
                
                return (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedEssay(essay)}
                    className="group relative text-left p-4 rounded-xl transition-all"
                    style={{
                      backgroundColor: isActive 
                        ? 'rgba(39, 39, 42, 0.5)' // zinc-800/50
                        : 'transparent',
                      border: `1px solid ${isActive 
                        ? 'rgba(255, 255, 255, 0.05)' 
                        : 'transparent'}`,
                      boxShadow: isActive 
                        ? 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                        : 'none',
                    }}
                    whileHover={{
                      backgroundColor: isActive 
                        ? 'rgba(39, 39, 42, 0.5)'
                        : 'rgba(24, 24, 27, 0.5)', // zinc-900/50
                      borderColor: 'rgba(255, 255, 255, 0.05)',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      <span 
                        className="uppercase transition-colors"
                        style={{
                          fontFamily: 'monospace',
                          fontSize: '10px',
                          color: isActive ? '#14B8A6' : '#52525b', // brand or zinc-600
                          letterSpacing: '0.1em',
                        }}
                      >
                        {essay.dateShort}
                      </span>
                      {isActive && (
                        <motion.div
                          className="rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#14B8A6', // brand
                            boxShadow: '0 0 8px rgba(20, 184, 166, 0.6)',
                          }}
                        />
                      )}
                    </div>
                    <span 
                      className="block transition-colors leading-relaxed"
                      style={{
                        fontFamily: 'var(--font-family)',
                        fontSize: '14px',
                        fontWeight: isActive ? 500 : 300,
                        color: isActive ? '#ffffff' : '#71717a', // white or zinc-500
                        lineHeight: '1.6',
                      }}
                    >
                      {essay.title}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN - The Reading Pane (Content) */}
          <motion.div 
            key={selectedEssay.title}
            className="p-10 md:p-14 relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            style={{
              backgroundColor: '#18181b', // zinc-900
            }}
          >
            {/* Subtle background noise texture */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: 0.03,
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Cpath d='M0 0h1v1H0V0zm2 2h1v1H2V2z' fill='%23ffffff'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Content */}
            <div className="relative z-10 max-w-2xl">
              {/* Tags */}
              <div className="flex gap-3 mb-6">
                {selectedEssay.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded"
                    style={{
                      fontSize: '10px',
                      fontFamily: 'monospace',
                      border: '1px solid #3f3f46', // zinc-700
                      color: '#a1a1aa', // zinc-400
                      backgroundColor: 'rgba(39, 39, 42, 0.5)', // zinc-800/50
                      letterSpacing: '0.05em',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 
                className="mb-8"
                style={{
                  fontFamily: 'var(--font-family)',
                  fontSize: 'clamp(28px, 5vw, 40px)',
                  color: '#ffffff',
                  fontWeight: 300,
                  lineHeight: '1.2',
                  letterSpacing: '0.02em',
                }}
              >
                {selectedEssay.title}
              </h2>

              {/* Content */}
              <div className="space-y-6">
                {selectedEssay.content.map((paragraph, i) => (
                  <p 
                    key={i}
                    style={{
                      fontFamily: 'var(--font-family)',
                      fontSize: '16px',
                      fontWeight: 300,
                      color: '#a1a1aa', // zinc-400
                      lineHeight: '1.8',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Read Full Entry Button */}
              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="mt-12 flex items-center gap-2 uppercase tracking-widest transition-colors"
                style={{
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  color: '#71717a', // zinc-500
                  letterSpacing: '0.15em',
                }}
                whileHover={{ color: '#ffffff' }}
                transition={{ duration: 0.2 }}
              >
                Read Full Entry <span>→</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* FULL ESSAY MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            >
              <motion.div
                className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden"
                style={{
                  backgroundColor: '#18181b', // zinc-900
                  borderRadius: '2rem',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div
                  className="flex items-center justify-between px-8 h-16 border-b"
                  style={{
                    backgroundColor: '#09090b', // zinc-950
                    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <div
                    className="uppercase tracking-widest"
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '10px',
                      color: '#52525b', // zinc-600
                      letterSpacing: '0.15em',
                    }}
                  >
                    /system/logs/essays/{selectedEssay.dateShort.toLowerCase().replace(' ', '-')}
                  </div>
                  <motion.button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-lg transition-colors"
                    style={{
                      color: '#71717a', // zinc-500
                    }}
                    whileHover={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: '#ffffff',
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Scrollable Content */}
                <div
                  className="overflow-y-auto p-8 md:p-12"
                  style={{
                    maxHeight: 'calc(90vh - 4rem)',
                  }}
                >
                  {/* Tags */}
                  <div className="flex gap-3 mb-8">
                    {selectedEssay.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded"
                        style={{
                          fontSize: '10px',
                          fontFamily: 'monospace',
                          border: '1px solid #3f3f46', // zinc-700
                          color: '#a1a1aa', // zinc-400
                          backgroundColor: 'rgba(39, 39, 42, 0.5)', // zinc-800/50
                          letterSpacing: '0.05em',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h1
                    className="mb-6"
                    style={{
                      fontFamily: 'var(--font-family)',
                      fontSize: 'clamp(32px, 5vw, 48px)',
                      color: '#ffffff',
                      fontWeight: 300,
                      lineHeight: '1.2',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {selectedEssay.title}
                  </h1>

                  {/* Date & Category */}
                  <div
                    className="flex gap-4 mb-12 pb-6 border-b"
                    style={{
                      borderBottomColor: 'rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '12px',
                        color: '#14B8A6', // brand
                        letterSpacing: '0.1em',
                      }}
                    >
                      {selectedEssay.date}
                    </span>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '12px',
                        color: '#71717a', // zinc-500
                        letterSpacing: '0.1em',
                      }}
                    >
                      {selectedEssay.category}
                    </span>
                  </div>

                  {/* Full Content */}
                  <div className="space-y-8 max-w-3xl">
                    {selectedEssay.content.map((paragraph, i) => (
                      <p
                        key={i}
                        style={{
                          fontFamily: 'var(--font-family)',
                          fontSize: '18px',
                          fontWeight: 300,
                          color: '#d4d4d8', // zinc-300
                          lineHeight: '1.8',
                          letterSpacing: '0.01em',
                        }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Footer Spacer */}
                  <div className="mt-16" />
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}