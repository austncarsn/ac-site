# Loading System Documentation

## Philosophy

Loading is not a delay—it's part of the experience. The system prioritizes **perceived performance** over raw speed, ensuring the page feels alive, stable, and intentional at every moment.

## Core Principles

### 1. Zero Layout Shift (CLS)
- All above-the-fold elements have predefined dimensions
- Skeleton loaders match exact geometry of final content
- Images use `aspect-ratio` containers to prevent reflow
- No element snaps, flashes, or resizes after first paint

### 2. Calm Transitions
- Only `transform` and `opacity` animations (GPU-accelerated)
- Duration range: 120-240ms for micro-interactions, 300-600ms for crossfades
- Easing: `[0.25, 1, 0.5, 1]` (ease-out-quart) for natural, grounded motion
- Respects `prefers-reduced-motion` with instant fallbacks

### 3. Progressive Enhancement
- Navigation and hero render immediately with system fonts
- Custom fonts swap in with matched metrics (no FOIT)
- Below-the-fold content lazy-loads
- Staggered reveals create rhythm (60-120ms delays)

---

## Implementation

### App-Level Loading (`AppLoader`)

**Purpose:** Smooth initial page load with minimal skeleton

**Location:** `/src/components/loading/AppLoader.tsx`

**Features:**
- Waits for font loading via `document.fonts.ready`
- Shows minimal navigation + hero skeleton
- Crossfades to actual content (300ms duration)
- Locks layout with `min-height: 100vh` to prevent shift

**Usage:**
```tsx
import { AppLoader } from './src/components/loading/AppLoader';

export default function App() {
  return (
    <AppLoader>
      {/* Your app content */}
    </AppLoader>
  );
}
```

---

### Component-Level Loading

#### Skeleton Components

**Location:** `/src/components/loading/Skeleton.tsx`

**Variants:**
- `<Skeleton variant="text" />` - Text lines with subtle pulse
- `<Skeleton variant="card" />` - Card with 24px border radius
- `<Skeleton variant="image" />` - Image placeholder with 16px radius
- `<Skeleton variant="circle" />` - Circular skeleton (avatars, icons)

**Specialized Skeletons:**
- `<SkeletonProjectCard />` - Matches project card layout exactly
- `<SkeletonSystemItem />` - For system spec rows
- `<SkeletonEssayCard />` - For essay list items
- `<SkeletonText lines={3} />` - Multi-line text blocks

**Design Tokens:**
- Background: Gradient from `zinc-100` → `zinc-50` → `zinc-100`
- Animation: 2s loop with opacity pulse (0.6 → 0.8 → 0.6)
- Matches design system radii: 24px cards, 12px small elements

---

#### Progressive Image Loading

**Location:** `/src/components/loading/ProgressiveImage.tsx`

**Features:**
- Blur-up loading effect (20px blur → 0px)
- Slight scale (1.05 → 1) for depth
- Shimmer overlay during load
- `aspect-ratio` container to prevent layout shift
- Automatic `loading="lazy"` for non-priority images

**Usage:**
```tsx
<ProgressiveImage
  src="/path/to/image.jpg"
  alt="Description"
  aspectRatio="16/10"
  priority={false} // true for above-fold images
/>
```

---

#### Content Crossfade Loader

**Location:** `/src/components/loading/ContentLoader.tsx`

**Purpose:** Smooth skeleton → content transitions

**Usage:**
```tsx
<ContentLoader
  isLoading={isLoading}
  skeleton={<SkeletonProjectCard />}
>
  <ProjectCard {...props} />
</ContentLoader>
```

**Staggered variant for lists:**
```tsx
<StaggeredContentLoader
  isLoading={isLoading}
  skeletonCount={3}
  skeletonComponent={SkeletonProjectCard}
  staggerDelay={0.06}
>
  {projects.map(project => <ProjectCard key={project.id} {...project} />)}
</StaggeredContentLoader>
```

---

### Hooks

**Location:** `/src/hooks/useLoadingState.ts`

#### `useLoadingState()`
Manages loading state with minimum duration to prevent flashing.

```tsx
const { isLoading, isReady } = useLoadingState({
  minDuration: 400,      // Minimum time to show skeleton
  simulatedDelay: 800,   // Dev mode delay (production: 0ms)
  enableInProduction: false
});
```

#### `useProgressiveImage(src)`
Tracks image load state for custom implementations.

```tsx
const { imageLoaded, error } = useProgressiveImage(imageUrl);
```

---

## Motion Specifications

### Entry Animations

**Transform + Opacity Only:**
```tsx
initial={{ opacity: 0, y: 12 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
```

**Staggered Reveals:**
```tsx
<motion.div variants={containerVariants}>
  {items.map((item, i) => (
    <motion.div
      key={item.id}
      variants={childVariants}
      custom={i} // For dynamic delays
    />
  ))}
</motion.div>
```

**Reduced Motion:**
```tsx
const prefersReducedMotion = useReducedMotion();

<motion.div
  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: prefersReducedMotion ? 0.15 : 0.3 }}
/>
```

---

## Layout Locking Strategies

### Above-the-Fold

**Navigation:**
- Fixed `height: 68px`
- Always rendered immediately
- System font fallback

**Hero Section:**
- `min-height: 100vh` to lock full viewport
- Text elements have `min-height` matching font metrics
- Button has fixed `height: 48px` and `width: auto`

**Images:**
```tsx
<div style={{ aspectRatio: '16/10' }} className="w-full">
  <img src={url} className="object-cover w-full h-full" />
</div>
```

### Below-the-Fold

**Lazy Loading:**
```tsx
<img loading="lazy" src={url} alt={alt} />
```

**Intersection Observer for Staggered Reveals:**
```tsx
const { ref, inView } = useInView({ once: true, threshold: 0.2 });

<motion.div
  ref={ref}
  initial="hidden"
  animate={inView ? "visible" : "hidden"}
  variants={fadeUpVariants}
/>
```

---

## Performance Checklist

- [x] All above-fold images use `loading="eager"`
- [x] Below-fold images use `loading="lazy"`
- [x] Fonts load with `font-display: swap`
- [x] Skeleton loaders match final content dimensions
- [x] `aspect-ratio` used for all images
- [x] No animations affect layout (only transform/opacity)
- [x] `prefers-reduced-motion` respected globally
- [x] First paint feels complete even if data is resolving
- [x] No spinners for primary content (only for actions/modals)
- [x] Crossfade durations < 400ms
- [x] Stagger delays < 120ms

---

## Design Tokens

### Colors
- Skeleton background: `from-zinc-100 via-zinc-50 to-zinc-100`
- Skeleton animation: Opacity pulse (0.6 ↔ 0.8)
- Placeholder text: `text-zinc-400`

### Timing
- Instant: 150ms (micro-interactions)
- Fast: 240-300ms (crossfades)
- Normal: 400-600ms (page transitions)
- Stagger: 60-120ms between items

### Easing
- Primary: `[0.25, 1, 0.5, 1]` (ease-out-quart)
- Subtle: `[0.16, 1, 0.3, 1]` (ease-out-expo)
- Bounce: Not used (feels ungrounded)

---

## Testing Guidelines

### Slow Network Simulation
1. Open DevTools → Network tab
2. Set throttling to "Slow 3G"
3. Hard refresh (Cmd+Shift+R)
4. **Verify:**
   - No layout shift during load
   - Skeleton dimensions match final content
   - Crossfade feels smooth, not jarring
   - Page feels usable within 1 second

### Low-End Device
1. Open DevTools → Performance tab
2. Set CPU throttling to "6x slowdown"
3. **Verify:**
   - Animations don't jank
   - Interactions respond within 100ms
   - No blocking scripts delay first paint

### Accessibility
1. Enable "Reduce motion" in OS settings
2. **Verify:**
   - All animations respect preference
   - Content appears instantly or with minimal fade
   - No motion-dependent functionality

---

## Mobile Considerations

### Touch Targets
- Minimum: 44px × 44px (WCAG 2.5.5)
- Preferred: 48px × 48px for primary actions
- Navigation links: Full-height touch area

### Performance
- Mobile loads hero + nav first
- Heavy sections load below the fold
- Images: Lower resolution on mobile
- Animations: Shorter durations (0.3s → 0.24s)

### iOS Safari
- Prevent zoom on input focus: `font-size: 16px`
- Disable tap highlight: `-webkit-tap-highlight-color: transparent`
- Smooth momentum scrolling: `-webkit-overflow-scrolling: touch`

---

## Error States

### Image Load Failure
```tsx
{error && (
  <div className="absolute inset-0 flex items-center justify-center bg-zinc-100">
    <div className="text-zinc-400 text-sm">Image unavailable</div>
  </div>
)}
```

### Empty States
```tsx
{filteredProjects.length === 0 && (
  <div className="text-center py-20">
    <p style={{ opacity: 0.4 }}>No projects in this category</p>
  </div>
)}
```

### Network Failures
- Show branded error message, not technical jargon
- Provide retry action
- Maintain layout (don't collapse to nothing)

---

## Future Enhancements

- [ ] Predictive prefetching for modal images
- [ ] Service worker for offline skeleton
- [ ] View transitions API for smoother route changes
- [ ] Dynamic bundle loading for heavy components
- [ ] Image optimization pipeline (WebP, AVIF)
- [ ] Critical CSS inlining for instant paint

---

## Notes for Developers

**DO:**
- Lock layout dimensions early
- Match skeleton geometry exactly
- Test on slow networks
- Respect user preferences
- Use transform/opacity only

**DON'T:**
- Block first paint with scripts
- Rely on spinners for primary content
- Animate width/height/position
- Assume fast network
- Ignore reduced motion preference

The final result should feel **calm, deliberate, and premium**—as if the page was always there and simply chose the right moment to reveal itself.
