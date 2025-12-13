import { useState, useEffect } from 'react';
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
    title: 'A Cold Kept Me Up All Night and I Had Thoughts',
    date: 'December 13, 2024',
    dateShort: 'Dec 13',
    category: 'Life',
    tags: ['HEALTH', 'INSOMNIA'],
    excerpt: 'What do you do at 3am when your nose has declared war on breathing? Apparently, you contemplate the entire human respiratory system and why tissues are never where you need them.',
    content: [
      '2:14am. I have achieved a new understanding of the phrase "can\'t breathe through my nose." It\'s not that I CAN\'T—it\'s that my body has decided breathing is now a luxury feature that requires a premium subscription I apparently didn\'t renew.',
      'You know what\'s wild? We take approximately 20,000 breaths per day and never think about it until a cold shows up like an uninvited houseguest and says "remember breathing? That thing you do unconsciously? Let\'s make it a whole SITUATION."',
      'The ceiling at 3am is fascinating, by the way. I\'ve counted the texture patterns. Twice. I\'ve also discovered that when you\'re congested enough, your own heartbeat sounds like a distant techno beat. My body is literally throwing a rave and I wasn\'t invited.',
      '4:17am update: I got up for the 6th time to get water. The kitchen floor is cold. This is a betrayal. Also, why do I have 47 different types of tea but none of them are labeled \"will actually make you feel better at 4am\"? False advertising, chamomile. You promised relaxation, not an existential crisis about mortality.',
      'By 5:30am I had convinced myself I was patient zero of some new respiratory thing. WebMD said I had everything from a mild cold to \"you should probably update your will.\" Thanks, internet. Very helpful. Very reassuring.',
      'The birds started chirping around 6am, which felt deeply personal. Like they were mocking me. "Oh look, the human is still awake. How cute. We\'re going to be EXTRA loud today." Nature is brutal when you haven\'t slept.',
      'Final thought at 6:42am: Tissues. Why are tissues never where you left them? I bought a box specifically for the nightstand. It\'s now in the kitchen. I didn\'t move it. My cold has developed telekinetic powers. This is my villain origin story.',
    ],
  },
  {
    title: 'I Spent 6 Hours Perfecting a Button No One Will Ever Click',
    date: 'December 3, 2024',
    dateShort: 'Dec 03',
    category: 'Design Philosophy',
    tags: ['DESIGN', 'PERFECTIONISM'],
    excerpt: 'A meditation on why I obsessively adjusted the border-radius of a "Terms & Conditions" button from 6px to 5.8px, then back to 6px, then settled on 5.9px at 2am.',
    content: [
      'Today I achieved enlightenment. Not through meditation or self-reflection, but by discovering that a button\'s border-radius looks subtly more harmonious at 5.9px instead of 6px. Will anyone notice? Absolutely not. Did I spend 6 hours on it? You bet your perfectly kerned typography I did.',
      'The Terms & Conditions button. A noble element. A digital handshake that 99.8% of users will scroll past without reading. And yet, there I was at 2:47am, toggling between 5.8px, 5.9px, and 6px like a designer possessed by the ghost of Massimo Vignelli.',
      'My partner asked what I was working on. "Important interface work," I said, zoomed in to 400% on a gray rectangle. They nodded slowly and backed away. Smart. This is the kind of obsession that built the pyramids, except the pyramids were probably finished faster and had better browser support.',
      'The real question isn\'t whether this level of detail matters. It\'s whether I can live with myself knowing I shipped a 6px radius when 5.9px exists. The answer is no. The design system must be pure. The spacing must sing. The button that no one clicks must be *chef\'s kiss* perfect.',
    ],
  },
  {
    title: 'My Git Commits Read Like A Descent Into Madness',
    date: 'November 28, 2024',
    dateShort: 'Nov 28',
    category: 'Development',
    tags: ['CODING', 'CHAOS'],
    excerpt: 'An archaeological expedition through my commit history reveals a developer who started with hope and ended with "PLEASE WORK I BEG YOU" at 4am.',
    content: [
      '10:23am - "Initial commit - clean architecture ✨"',
      '11:45am - "Add responsive grid system"',
      '2:14pm - "Refactor components for better reusability"',
      '4:32pm - "Fix: minor styling adjustments"',
      '6:18pm - "WHY IS CSS LIKE THIS"',
      '8:45pm - "Revert last 4 commits, starting over"',
      '11:23pm - "it works but idk why"',
      '2:47am - "FINALLY FIXED THE BUG (don\'t touch anything ever)"',
      '3:15am - "touched it. it broke. going to bed."',
      '3:16am - "jk can\'t sleep until this is fixed"',
      '4:04am - "PLEASE WORK I BEG YOU"',
      '4:05am - "IT WORKED OMG"',
      '4:06am - "pushed to prod, if anyone asks I was never here"',
    ],
  },
  {
    title: 'Naming Variables: A Horror Story in CamelCase',
    date: 'November 15, 2024',
    dateShort: 'Nov 15',
    category: 'Code Quality',
    tags: ['NAMING', 'EXISTENTIAL'],
    excerpt: 'Is it userData or userInfo? currentUser or activeUser? Why did I choose userDataManagerHelperUtilInstance and how do I live with this decision?',
    content: [
      'I have been staring at a variable name for 20 minutes. Not writing code. Not solving problems. Just... staring at the word "userDataManagerHelperUtilInstance" wondering what demon possessed me to type that.',
      'It started so innocently. I needed to store user data. "user" seemed too vague. "userData" felt verbose. "userInfo" implied it might be informational rather than definitive. So naturally, I escalated to "userDataManagerHelperUtilInstance" because clearly I was having a normal one.',
      'The worst part? There\'s another variable three files over called "currentActiveUserInfoData". They do basically the same thing. I am both the author and victim of this madness. This is what happens when you give developers naming freedom and a caffeine addiction.',
      'My code review comments now read like philosophy papers. "What IS userData, really?" "Does userInfo INFO the user, or does the user INFO the userInfo?" I have become the person I feared. The variable naming has consumed me. Send help. Or a style guide. Preferably both.',
    ],
  },
];

export function EssaysSection() {
  const [selectedEssay, setSelectedEssay] = useState<Essay>(ESSAYS[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

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
                    className="group relative text-left px-4 py-3 transition-all"
                    style={{
                      backgroundColor: 'transparent', // Flatten - no card background
                      border: 'none', // Remove borders entirely
                      borderLeft: isActive 
                        ? '2px solid rgba(182, 207, 255, 0.3)' // Subtle accent line
                        : '2px solid transparent',
                      paddingLeft: isActive ? '14px' : '16px', // Adjust for border
                    }}
                    whileHover={{
                      backgroundColor: 'rgba(24, 24, 27, 0.3)', // Very subtle hover
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Date - Low contrast metadata */}
                    <span 
                      className="block mb-1 uppercase transition-colors"
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '9px', // Smaller
                        color: isActive ? '#71717a' : '#3f3f46', // zinc-500 or zinc-700 - very subtle
                        letterSpacing: '0.08em',
                        fontWeight: 300,
                      }}
                    >
                      {essay.dateShort}
                    </span>
                    
                    {/* Title - Primary identifier */}
                    <span 
                      className="block transition-colors"
                      style={{
                        fontSize: '14px',
                        fontWeight: isActive ? 400 : 300, // Typography-based emphasis
                        color: isActive ? '#e4e4e7' : '#52525b', // zinc-200 or zinc-600
                        lineHeight: '1.5',
                        letterSpacing: '0.01em',
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
            className="p-6 md:p-12 lg:p-14 relative"
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
              {/* Tags - Visually secondary */}
              <div className="flex gap-2 mb-3">
                {selectedEssay.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded"
                    style={{
                      fontSize: '9px', // Smaller
                      fontFamily: 'monospace',
                      border: '1px solid rgba(63, 63, 70, 0.4)', // Softer border
                      color: '#71717a', // More subtle - zinc-500
                      backgroundColor: 'rgba(39, 39, 42, 0.3)', // Less prominent
                      letterSpacing: '0.05em',
                      opacity: 0.7, // Additional subtlety
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title - Clear anchor */}
              <h2 
                className="mb-12"
                style={{
                  fontSize: 'clamp(28px, 5vw, 40px)',
                  color: '#ffffff',
                  fontWeight: 300,
                  lineHeight: '1.3', // Slightly more relaxed
                  letterSpacing: '0.01em',
                }}
              >
                {selectedEssay.title}
              </h2>

              {/* Content - Generous spacing for long-form reading */}
              <div className="space-y-8">
                {selectedEssay.content.map((paragraph, i) => (
                  <p 
                    key={i}
                    style={{
                      fontSize: '16px',
                      fontWeight: 300,
                      color: '#d4d4d8', // Increased contrast - zinc-300 instead of zinc-400
                      lineHeight: '2.0', // Generous line height for reading
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
                        color: '#B6CFFF', // pastel blue
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

                  {/* Close hint */}
                  <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '11px',
                        color: '#52525b', // zinc-600
                        letterSpacing: '0.15em',
                      }}
                    >
                      PRESS ESC OR CLICK OUTSIDE TO CLOSE
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}