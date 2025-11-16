# Enhanced Portfolio with ProjectReel

A modern, feature-rich portfolio website built with React, TypeScript, and Motion (Framer Motion). This project showcases an enhanced ProjectReel component with advanced features and a complete portfolio page layout.

## ✨ Features

### Enhanced ProjectReel Component

#### 🎯 Core Features
- **Horizontal Scroll Animation**: Smooth scroll-based animations with 3D transforms
- **Project Detail Modal**: Click any project to view full details in a beautiful modal
- **Category Filtering**: Filter projects by category with smooth transitions
- **Navigation Controls**: Arrow buttons and keyboard navigation (← →)
- **Scroll Indicators**: Visual dots showing current position in the carousel
- **Responsive Design**: Works beautifully on mobile, tablet, and desktop

#### 🎨 Visual Effects
- **Parallax Background**: Animated gradient background that moves with scroll
- **Scale & Tilt Animation**: Cards scale up and tilt as they enter view
- **Dynamic Shadows**: Shadow intensity increases as cards come into focus
- **Hover Effects**: Smooth image zoom on hover
- **Edge Fade Gradient**: Subtle fade at the edges of the scroll area

#### ♿ Accessibility
- **Keyboard Navigation**: Full keyboard support with arrow keys
- **Reduced Motion**: Respects user's `prefers-reduced-motion` setting
- **ARIA Labels**: Proper accessibility labels for navigation
- **Focus Management**: Clear focus indicators

### Complete Portfolio Page

#### 📄 Sections
1. **Navigation**: Sticky header with smooth scroll navigation
2. **Hero Section**: Eye-catching introduction with animated gradients
3. **About Section**: Skills showcase with icon cards
4. **Projects Section**: Enhanced ProjectReel with filtering
5. **Contact Section**: Contact form and social links
6. **Footer**: Clean footer with links

#### 🎭 Animations
- Fade-in animations on scroll
- Smooth page transitions
- Mobile menu with slide animations
- Hover effects throughout

## 🚀 Usage

### Basic ProjectReel

```tsx
import { ProjectReel } from './components/ProjectReel';

const projects = [
  {
    id: '1',
    title: 'My Project',
    category: 'Web Development',
    year: '2024',
    previewImage: 'https://example.com/image.jpg',
    description: 'Project description',
    tags: ['React', 'TypeScript'],
  },
  // ... more projects
];

function App() {
  return <ProjectReel projects={projects} title="My Projects" />;
}
```

### ProjectReel Props

```tsx
interface ProjectReelProps {
  projects: readonly ProjectCardProps[];
  title?: string;
  showFilters?: boolean;      // Show category filters (default: true)
  showIndicators?: boolean;   // Show scroll indicators (default: true)
}
```

### ProjectCard Props

```tsx
interface ProjectCardProps {
  id?: string;
  title: string;
  category?: string;
  year?: string;
  role?: string;
  description?: string | string[];
  subtitle?: string;
  liveUrl?: string;
  githubUrl?: string;
  previewImage?: string;
  ratio?: '4:5' | '16:9' | '1:1';
  objectPosition?: string;
  fit?: 'cover' | 'contain' | 'auto';
  compact?: boolean;
  bulletPoints?: string[];
  techStack?: string;
  tags?: string[];
}
```

## 🎨 Customization

### Styling
The component uses Tailwind CSS and CSS variables for theming. Customize colors in `/styles/globals.css`:

```css
:root {
  --primary: #030213;
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);
  /* ... more variables */
}
```

### Animation Parameters
Adjust animation parameters in `ProjectReel.tsx`:

```tsx
// Spring physics
const scale = useSpring(rawScale, { 
  stiffness: 220,  // Adjust stiffness
  damping: 28,     // Adjust damping
  mass: 0.3        // Adjust mass
});
```

## 🔧 Components

- **ProjectReel**: Main carousel component with filtering and navigation
- **ProjectCard**: Individual project card with preview
- **ProjectDetailModal**: Modal for showing full project details
- **Hero**: Landing section with animated gradients
- **About**: Skills and bio section
- **Contact**: Contact form and social links
- **Navigation**: Sticky navigation with mobile menu
- **Footer**: Page footer

## 📦 Dependencies

- **React**: UI library
- **TypeScript**: Type safety
- **Motion (Framer Motion)**: Animations
- **Tailwind CSS**: Styling
- **Lucide React**: Icons
- **Sonner**: Toast notifications
- **Shadcn/ui**: UI components

## 🎯 Key Improvements Over Original

1. **Project Detail Modal**: Click to view full project information
2. **Category Filtering**: Dynamic filtering with smooth transitions
3. **Navigation Controls**: Left/right arrows and keyboard support
4. **Scroll Indicators**: Visual feedback for carousel position
5. **Enhanced Metadata**: Tags, tech stack, roles, descriptions
6. **Better Accessibility**: Keyboard navigation and reduced motion support
7. **Complete Page Layout**: Full portfolio with hero, about, contact sections
8. **Responsive Design**: Improved mobile experience

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

MIT License - feel free to use this in your own projects!

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

---

Built with ❤️ using React and Motion
