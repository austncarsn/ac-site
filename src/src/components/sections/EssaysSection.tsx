import { AnimatedSection } from '../ui/AnimatedSection';
import { SectionHeader } from '../ui/SectionHeader';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { X } from 'lucide-react';

interface Essay {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string[];
}

const ESSAYS: Essay[] = [
  {
    title: 'On Being Outshined By A Discount Constellation',
    date: 'November 17, 2025',
    category: 'Personal',
    excerpt: 'Today I am annoyed. Not poetic annoyed, not elegant character building annoyed. I am the specific kind of irritated that happens when someone who treated you like a side quest suddenly acts like the main storyline, funded by inheritance and delusion.',
    content: [
      'Today I am annoyed. Not poetic annoyed, not elegant character building annoyed. I am the specific kind of irritated that happens when someone who treated you like a side quest suddenly acts like the main storyline, funded by inheritance and delusion.',
      'There was a time when I thought we were on the same team. Two people trying to build something real, scraping together futures out of late nights and messy dreams. Then his father\'s money arrived, and I watched him transform from "we are in this together" to "you are an optional feature I no longer need." I did not even get a software update. I just got uninstalled.',
      'The part that really fries my circuits is that he traded me in for someone who looks like a Mr Bean understudy. Not the original, not a clever tribute. More like a community theater version that forgot half the lines but still insists on bowing. The two of them float around like a moral lesson in why money does not equal taste.',
      'They have been negative about me for years. Little comments, quiet jabs, invisible verdicts that tried to shrink me into something easier to ignore. I used to absorb that, like maybe they were right and I was the dramatic one, the chaotic one, the one who needed to calm down and stop wanting so much.',
      'Except my life keeps proving them wrong.',
      'Because here is what actually happened. Every time they tried to dim me, I learned how to be my own power grid. Every time they talked about me like I was a warning, I quietly turned myself into a blueprint. I became that person people go to when they want things done right, when they want something thoughtful, when they want someone who can hold both feelings and strategy in the same hand.',
      'They tried to make me feel small. Instead they accidentally trained me for the version of my life where I am not small enough to fit in their story at all.',
      'Are they garbage people? On my petty days, yes, absolutely, and today is a petty day so I will allow it. They feel like emotional litter, the kind that blows across your path just when you thought the street was finally clear. But even trash can be sorted. Their opinions about me go straight into the "not recyclable, not useful" bin.',
      'What matters is what I have turned that irritation into. I show up for people around me with a level of care they never managed to understand. I build beautiful things, I think deeply, I take my chaos and turn it into systems that actually help other people breathe easier. I am a strong component in a lot of lives, and I did that without inheritance money and without needing to step on anyone to stand taller.',
      'They got a payout and a Mr Bean extra. I got resilience, better taste, a sharper sense of humor, and a future that does not depend on anyone remembering me in a will.',
      'So yes, they have been pissing me off today. I let myself feel it. I let myself roll my eyes at their little performance. Then I remember the quiet truth under all this noise.',
      'They can try to outshine me all they want. I am not even in the same lighting setup anymore.',
    ],
  },
  {
    title: 'Order, Gently Mugged By My Brain',
    date: 'November 16, 2025',
    category: 'Process',
    excerpt: 'Today I woke up and chose chaos — again, but with taste. The plan was simple: open the laptop, calmly refine a few components, ship a clean update. Instead, I accidentally ran a full-scale creative heist on my own focus. This is how I work. I don\'t walk in a straight line toward a goal. I ricochet. My chaos isn\'t an accident — it\'s a process with bad posture.',
    content: [
      'Today I woke up and chose chaos — again, but with taste.',
      'The plan was simple: open the laptop, calmly refine a few components, ship a clean update. Instead, I accidentally ran a full-scale creative heist on my own focus. One moment I was adjusting letter spacing on a hero title, the next I had six new project ideas, three Figma files, two design systems, and a half written prompt for a future AI agent who does not even exist yet.',
      'My browser tabs currently look like the inside of my brain if you shook it. VS Code is hosting at least four separate realities. Figma is less a file and more a crime scene.',
      'Somewhere in there is a very sensible portfolio. It is just buried under twenty three "quick experiments" that I refused to abandon because "they might be genius later."',
      'This is how I work. I don\'t walk in a straight line toward a goal. I ricochet.',
      'I start with one clean intention. I see an edge that could be sharper. I chase the edge. The edge becomes a system. The system becomes a project. The project becomes a universe. The universe needs typography tokens.',
      'Suddenly it is dark outside and I am whispering to myself about the emotional subtext of a button hover state.',
      'There is a very specific type of chaos that comes from caring too much about details. I can spend fifteen minutes naming a variable and call it self respect. I can re craft one sentence in a case study until it feels like good skincare for the reader. I can stare at a color token for an embarrassing amount of time just to decide it is one percent too cold emotionally.',
      'And yet, in the middle of all that, there is progress.',
      'Under the pile of experiments and abandoned variants, things are quietly getting better. Components are cleaner. Layouts snap into place. The work starts to feel less like "please ignore the mess" and more like "yes this was all intentional actually, please notice the tension."',
      'My chaos isn\'t an accident. It\'s a process with bad posture.',
      'It looks like distraction when I jump between projects, in reality I am cross pollinating. A layout from one idea sneaks into another. A color from a side experiment becomes the main character in the primary palette. A throwaway joke in a log entry becomes the tone for the whole site.',
      'Today I accepted something important. I am not building a tidy little portfolio filled with politely behaved projects. I am building an ecosystem powered by a mildly feral brain that refuses to separate "serious work" from "ridiculous curiosity."',
      'So this is today\'s log:',
      'I did not follow the plan. I did something stranger.',
      'I let the chaos run, but I gave it structure. I let the experiments multiply, but I saved the good ones. I let myself obsess over details, but only the ones that make the experience feel alive.',
      'If you are reading this in my portfolio, you are not just looking at polished outcomes. You are looking at the aftermath of controlled chaos, curated just enough so it does not bite.',
      'Tomorrow I might finally "keep it simple." Realistically, I will not.',
      'However, I will keep shipping anyway.',
    ],
  },
  {
    title: 'The Art of Systematic Design',
    date: 'November 2025',
    category: 'Design Systems',
    excerpt: 'Exploring how systematic thinking transforms interface design from isolated components into cohesive, scalable systems that serve both users and teams. A deep dive into establishing principles, creating flexible foundations, and building design languages that evolve with product needs while maintaining consistency across platforms and contexts.',
    content: [
      'Exploring how systematic thinking transforms interface design from isolated components into cohesive, scalable systems that serve both users and teams. A deep dive into establishing principles, creating flexible foundations, and building design languages that evolve with product needs while maintaining consistency across platforms and contexts.',
      'Systematic design is about more than just creating a set of guidelines. It\'s about building a framework that allows for flexibility and adaptability. By establishing a set of core principles, we can create a foundation that is both robust and scalable. These principles serve as the building blocks for our design language, providing a consistent and cohesive experience across all platforms and contexts.',
      'One of the key aspects of systematic design is the ability to create flexible foundations. This means designing components that can be easily reused and adapted to different contexts. By focusing on modularity and reusability, we can create a design system that is both efficient and effective. This approach not only saves time and resources, but it also ensures that our design language remains consistent and cohesive.',
      'Building design languages that evolve with product needs is another important aspect of systematic design. As products and technologies evolve, so too must our design language. By creating a design system that is both flexible and adaptable, we can ensure that our design language remains relevant and effective over time. This approach allows us to respond to changing needs and trends, while maintaining a consistent and cohesive experience for our users.',
    ],
  },
  {
    title: 'Production-Ready Components',
    date: 'October 2025',
    category: 'Engineering',
    excerpt: 'Building components that work seamlessly across diverse contexts requires more than clean code. It demands thoughtful architecture, rigorous attention to edge cases, comprehensive accessibility considerations, and robust testing strategies. This essay examines the gap between prototype components and production-grade systems, exploring patterns for resilience, performance, and developer experience.',
    content: [
      'Building components that work seamlessly across diverse contexts requires more than clean code. It demands thoughtful architecture, rigorous attention to edge cases, comprehensive accessibility considerations, and robust testing strategies. This essay examines the gap between prototype components and production-grade systems, exploring patterns for resilience, performance, and developer experience.',
      'The transition from prototype to production is a critical one. Prototype components are often built with a focus on speed and simplicity, but production-grade systems require a more rigorous approach. By focusing on thoughtful architecture, we can create components that are both efficient and effective. This approach not only improves performance, but it also makes the system easier to maintain and scale.',
      'Rigorous attention to edge cases is another important aspect of building production-grade systems. By anticipating and addressing potential issues, we can create components that are both robust and reliable. This approach not only improves performance, but it also enhances the user experience by reducing the likelihood of errors and bugs.',
      'Comprehensive accessibility considerations are also crucial in building production-grade systems. By designing components that are accessible to all users, we can create a more inclusive and equitable experience. This approach not only improves the user experience, but it also helps to ensure that our systems are compliant with relevant standards and regulations.',
      'Robust testing strategies are the final piece of the puzzle. By testing components thoroughly, we can identify and address potential issues before they become problems. This approach not only improves performance, but it also helps to ensure that our systems are reliable and consistent.',
    ],
  },
  {
    title: 'Typography at Scale',
    date: 'September 2025',
    category: 'Typography',
    excerpt: 'How typographic systems establish hierarchy, rhythm, and voice across digital products while maintaining flexibility for diverse content needs. From selecting typefaces and establishing scales to implementing responsive type systems and managing variable fonts, this exploration covers the technical and aesthetic decisions that shape modern digital typography at enterprise scale.',
    content: [
      'How typographic systems establish hierarchy, rhythm, and voice across digital products while maintaining flexibility for diverse content needs. From selecting typefaces and establishing scales to implementing responsive type systems and managing variable fonts, this exploration covers the technical and aesthetic decisions that shape modern digital typography at enterprise scale.',
      'Typography is a fundamental aspect of digital design, playing a crucial role in establishing hierarchy, rhythm, and voice across digital products. By creating a typographic system that is both flexible and scalable, we can ensure that our design language remains consistent and cohesive across all platforms and contexts.',
      'Selecting the right typefaces is the first step in creating a typographic system. By choosing typefaces that are both aesthetically pleasing and functional, we can create a design language that is both visually appealing and easy to read. This approach not only improves the user experience, but it also helps to establish a consistent and cohesive brand identity.',
      'Establishing scales is another important aspect of creating a typographic system. By defining a set of type sizes and weights, we can create a hierarchy that is both clear and consistent. This approach not only improves the user experience, but it also helps to establish a consistent and cohesive brand identity.',
      'Implementing responsive type systems is another important aspect of creating a typographic system. By designing type systems that are responsive to different screen sizes and resolutions, we can ensure that our design language remains consistent and cohesive across all platforms and contexts. This approach not only improves the user experience, but it also helps to establish a consistent and cohesive brand identity.',
      'Managing variable fonts is the final piece of the puzzle. By using variable fonts, we can create a typographic system that is both flexible and scalable. This approach not only improves the user experience, but it also helps to establish a consistent and cohesive brand identity.',
    ],
  },
  {
    title: 'Bridging Design and Code',
    date: 'August 2025',
    category: 'Process',
    excerpt: 'The most effective design systems emerge from the collaborative space between design and engineering, where visual precision meets technical constraint. This essay examines workflows, tools, and communication patterns that enable designers and developers to work in tandem, creating systems that are both visually refined and technically sound, maintainable, and performant.',
    content: [
      'The most effective design systems emerge from the collaborative space between design and engineering, where visual precision meets technical constraint. This essay examines workflows, tools, and communication patterns that enable designers and developers to work in tandem, creating systems that are both visually refined and technically sound, maintainable, and performant.',
      'Collaboration is key in the design and development process. By working together, designers and developers can create systems that are both visually refined and technically sound. This approach not only improves the user experience, but it also helps to ensure that the system is maintainable and performant.',
      'Workflows are an important aspect of collaboration. By establishing a set of workflows, we can ensure that designers and developers are working towards the same goals. This approach not only improves the user experience, but it also helps to ensure that the system is maintainable and performant.',
      'Tools are another important aspect of collaboration. By using the right tools, we can improve the efficiency and effectiveness of the design and development process. This approach not only improves the user experience, but it also helps to ensure that the system is maintainable and performant.',
      'Communication patterns are the final piece of the puzzle. By establishing a set of communication patterns, we can ensure that designers and developers are working towards the same goals. This approach not only improves the user experience, but it also helps to ensure that the system is maintainable and performant.',
    ],
  },
  {
    title: 'Component API Design',
    date: 'July 2025',
    category: 'Architecture',
    excerpt: 'Designing intuitive, flexible component APIs requires balancing developer experience with system constraints. This comprehensive guide explores prop naming conventions, composition patterns, polymorphic components, render props, compound components, and the principles that make interfaces feel natural while preventing misuse and maintaining type safety across large codebases.',
    content: [
      'Designing intuitive, flexible component APIs requires balancing developer experience with system constraints. This comprehensive guide explores prop naming conventions, composition patterns, polymorphic components, render props, compound components, and the principles that make interfaces feel natural while preventing misuse and maintaining type safety across large codebases.',
      'Prop naming conventions are an important aspect of designing component APIs. By using clear and consistent naming conventions, we can create APIs that are both intuitive and easy to use. This approach not only improves the developer experience, but it also helps to prevent misuse and maintain type safety.',
      'Composition patterns are another important aspect of designing component APIs. By using composition patterns, we can create APIs that are both flexible and scalable. This approach not only improves the developer experience, but it also helps to prevent misuse and maintain type safety.',
      'Polymorphic components are another important aspect of designing component APIs. By using polymorphic components, we can create APIs that are both flexible and scalable. This approach not only improves the developer experience, but it also helps to prevent misuse and maintain type safety.',
      'Render props are another important aspect of designing component APIs. By using render props, we can create APIs that are both flexible and scalable. This approach not only improves the developer experience, but it also helps to prevent misuse and maintain type safety.',
      'Compound components are another important aspect of designing component APIs. By using compound components, we can create APIs that are both flexible and scalable. This approach not only improves the developer experience, but it also helps to prevent misuse and maintain type safety.',
      'The principles that make interfaces feel natural while preventing misuse and maintaining type safety across large codebases are the final piece of the puzzle. By following these principles, we can create APIs that are both intuitive and easy to use. This approach not only improves the developer experience, but it also helps to prevent misuse and maintain type safety.',
    ],
  },
  {
    title: 'Design Tokens in Practice',
    date: 'June 2025',
    category: 'Design Systems',
    excerpt: 'Design tokens form the foundation of scalable design systems, translating design decisions into platform-agnostic values. This deep dive covers token taxonomy, semantic vs. literal naming, multi-brand architectures, theme switching, token transformations, and real-world implementation strategies across web, iOS, and Android platforms using modern tooling.',
    content: [
      'Design tokens form the foundation of scalable design systems, translating design decisions into platform-agnostic values. This deep dive covers token taxonomy, semantic vs. literal naming, multi-brand architectures, theme switching, token transformations, and real-world implementation strategies across web, iOS, and Android platforms using modern tooling.',
      'Token taxonomy is an important aspect of designing scalable design systems. By using a consistent and clear taxonomy, we can create design systems that are both flexible and scalable. This approach not only improves the developer experience, but it also helps to prevent misuse and maintain type safety.',
      'Semantic vs. literal naming is another important aspect of designing scalable design systems. By using semantic naming conventions, we can create design systems that are both flexible and scalable. This approach not only improves the developer experience, but it also helps to prevent misuse and maintain type safety.',
      'Multi-brand architectures are another important aspect of designing scalable design systems. By using a multi-brand architecture, we can create design systems that are both flexible and scalable. This approach not only improves the developer experience, but it also helps to prevent misuse and maintain type safety.',
      'Theme switching is another important aspect of designing scalable design systems. By using a theme switching approach, we can create design systems that are both flexible and scalable. This approach not only improves the developer experience, but it also helps to prevent misuse and maintain type safety.',
      'Token transformations are another important aspect of designing scalable design systems. By using token transformations, we can create design systems that are both flexible and scalable. This approach not only improves the developer experience, but it also helps to prevent misuse and maintain type safety.',
      'Real-world implementation strategies across web, iOS, and Android platforms using modern tooling are the final piece of the puzzle. By following these strategies, we can create design systems that are both flexible and scalable. This approach not only improves the developer experience, but it also helps to prevent misuse and maintain type safety.',
    ],
  },
  {
    title: 'Accessibility as Foundation',
    date: 'May 2025',
    category: 'Accessibility',
    excerpt: 'Building accessible interfaces isn\'t a feature. It\'s fundamental architecture. This essay explores integrating WCAG standards into component design from the ground up, covering ARIA patterns, keyboard navigation, screen reader optimization, focus management, color contrast systems, and creating inclusive experiences that work for everyone without compromise.',
    content: [
      'Building accessible interfaces isn\'t a feature. It\'s fundamental architecture. This essay explores integrating WCAG standards into component design from the ground up, covering ARIA patterns, keyboard navigation, screen reader optimization, focus management, color contrast systems, and creating inclusive experiences that work for everyone without compromise.',
      'WCAG standards are an important aspect of building accessible interfaces. By integrating WCAG standards into component design from the ground up, we can create interfaces that are both accessible and inclusive. This approach not only improves the user experience, but it also helps to ensure that the interface is compliant with relevant standards and regulations.',
      'ARIA patterns are another important aspect of building accessible interfaces. By using ARIA patterns, we can create interfaces that are both accessible and inclusive. This approach not only improves the user experience, but it also helps to ensure that the interface is compliant with relevant standards and regulations.',
      'Keyboard navigation is another important aspect of building accessible interfaces. By using keyboard navigation, we can create interfaces that are both accessible and inclusive. This approach not only improves the user experience, but it also helps to ensure that the interface is compliant with relevant standards and regulations.',
      'Screen reader optimization is another important aspect of building accessible interfaces. By using screen reader optimization, we can create interfaces that are both accessible and inclusive. This approach not only improves the user experience, but it also helps to ensure that the interface is compliant with relevant standards and regulations.',
      'Focus management is another important aspect of building accessible interfaces. By using focus management, we can create interfaces that are both accessible and inclusive. This approach not only improves the user experience, but it also helps to ensure that the interface is compliant with relevant standards and regulations.',
      'Color contrast systems are another important aspect of building accessible interfaces. By using color contrast systems, we can create interfaces that are both accessible and inclusive. This approach not only improves the user experience, but it also helps to ensure that the interface is compliant with relevant standards and regulations.',
      'Creating inclusive experiences that work for everyone without compromise is the final piece of the puzzle. By following these principles, we can create interfaces that are both accessible and inclusive. This approach not only improves the user experience, but it also helps to ensure that the interface is compliant with relevant standards and regulations.',
    ],
  },
  {
    title: 'The Evolution of Interface States',
    date: 'April 2025',
    category: 'Design Patterns',
    excerpt: 'Every interface element exists in multiple states: default, hover, focus, active, disabled, loading, error, and success. This comprehensive study examines state management in design systems, exploring visual feedback patterns, micro-interactions, state machines, transition choreography, and establishing consistent behavioral patterns that guide users through complex interactions.',
    content: [
      'Every interface element exists in multiple states: default, hover, focus, active, disabled, loading, error, and success. This comprehensive study examines state management in design systems, exploring visual feedback patterns, micro-interactions, state machines, transition choreography, and establishing consistent behavioral patterns that guide users through complex interactions.',
      'State management is an important aspect of design systems. By managing the states of interface elements, we can create a consistent and cohesive experience for users. This approach not only improves the user experience, but it also helps to ensure that the interface is both functional and intuitive.',
      'Visual feedback patterns are an important aspect of state management. By using visual feedback patterns, we can create a consistent and cohesive experience for users. This approach not only improves the user experience, but it also helps to ensure that the interface is both functional and intuitive.',
      'Micro-interactions are another important aspect of state management. By using micro-interactions, we can create a consistent and cohesive experience for users. This approach not only improves the user experience, but it also helps to ensure that the interface is both functional and intuitive.',
      'State machines are another important aspect of state management. By using state machines, we can create a consistent and cohesive experience for users. This approach not only improves the user experience, but it also helps to ensure that the interface is both functional and intuitive.',
      'Transition choreography is another important aspect of state management. By using transition choreography, we can create a consistent and cohesive experience for users. This approach not only improves the user experience, but it also helps to ensure that the interface is both functional and intuitive.',
      'Establishing consistent behavioral patterns that guide users through complex interactions is the final piece of the puzzle. By following these principles, we can create a consistent and cohesive experience for users. This approach not only improves the user experience, but it also helps to ensure that the interface is both functional and intuitive.',
    ],
  },
];

interface EssayItemProps {
  essay: Essay;
  index: number;
}

function EssayItem({ essay, index }: EssayItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AnimatedSection 
      delay={index * 0.05}
      className="border-t border-border"
      style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6" style={{ gap: 'var(--space-6)' }}>
        <div className="lg:col-span-3">
          <p className="text-caption">{essay.date}</p>
        </div>

        <div className="lg:col-span-9">
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-4" style={{ gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
            <h3 className="text-2xl font-normal tracking-tight break-words">{essay.title}</h3>
            <span className="text-caption shrink-0">{essay.category}</span>
          </div>
          <p className="text-sm opacity-60 break-words">{essay.excerpt}</p>
          <button
            className="text-sm text-primary hover:underline mt-3"
            onClick={() => setIsOpen(true)}
          >
            Read more
          </button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-[680px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-normal tracking-tight">{essay.title}</DialogTitle>
            <DialogDescription className="text-sm opacity-60">{essay.date} • {essay.category}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4" style={{ paddingTop: 'var(--space-4)' }}>
            {essay.content.map((paragraph, i) => (
              <p key={i} className="text-sm opacity-80 leading-relaxed">{paragraph}</p>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </AnimatedSection>
  );
}

export function EssaysSection() {
  return (
    <section id="essays" className="section-padding border-t border-border">
      <div className="container-main">
        <SectionHeader accentColor="#F59E0B">Essays</SectionHeader>

        <div className="space-y-0">
          {ESSAYS.map((essay, index) => (
            <EssayItem key={essay.title} essay={essay} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}