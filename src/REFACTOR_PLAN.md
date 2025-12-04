# Repository Cleanup - Refactor Plan

---

## Phase 2: File Moves and Renames

### A. Move Used Shadcn Components

Move from `/components/ui/` to `/src/components/ui/`:

| Current Path | New Path | Imports to Update |
|--------------|----------|-------------------|
| /components/ui/dialog.tsx | /src/components/ui/dialog.tsx | ProjectDetailModal.tsx |
| /components/ui/input.tsx | /src/components/ui/input.tsx | ContactSection.tsx |
| /components/ui/textarea.tsx | /src/components/ui/textarea.tsx | ContactSection.tsx |
| /components/ui/sonner.tsx | /src/components/ui/sonner.tsx | App.tsx |
| /components/ui/utils.ts | /src/components/ui/utils.ts | All UI components |

### B. Move Documentation Files

| Current Path | New Path |
|--------------|----------|
| /Attributions.md | /docs/Attributions.md |
| /guidelines/Guidelines.md | /docs/Guidelines.md |

After move, delete empty `/guidelines/` directory.

### C. Create New Directories

| Directory | Purpose |
|-----------|---------|
| /src/components/ui/ | Shadcn components (moved from root) |
| /src/lib/ | Shared utilities and helpers |
| /docs/ | Documentation files |

---

## Phase 3: Import Path Updates

### Files Requiring Import Updates

#### App.tsx
```tsx
// BEFORE
import { Toaster } from './components/ui/sonner';

// AFTER
import { Toaster } from './src/components/ui/sonner';
```

#### src/components/sections/ContactSection.tsx
```tsx
// BEFORE
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';

// AFTER
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
```

#### src/components/projects/ProjectDetailModal.tsx
```tsx
// BEFORE
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../../components/ui/dialog';

// AFTER  
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
```

#### src/components/projects/ProjectCard.tsx
```tsx
// BEFORE
import { ImageWithFallback } from '../figma/ImageWithFallback';

// AFTER
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
```

#### src/components/projects/ProjectDetailModal.tsx (ImageWithFallback)
```tsx
// BEFORE
import { ImageWithFallback } from '../figma/ImageWithFallback';

// AFTER
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
```

---

## Phase 4: Directory Structure After Cleanup

```
/
├── App.tsx
├── README.md
├── REMOVAL_PLAN.md
├── REFACTOR_PLAN.md
├── DEPLOYMENT.md (NEW)
├── components/
│   └── figma/
│       └── ImageWithFallback.tsx (PROTECTED)
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── dialog.tsx (MOVED)
│   │   │   ├── input.tsx (MOVED)
│   │   │   ├── textarea.tsx (MOVED)
│   │   │   ├── sonner.tsx (MOVED)
│   │   │   └── utils.ts (MOVED)
│   │   ├── layout/
│   │   │   ├── Navigation.tsx
│   │   │   └── Footer.tsx
│   │   ├── projects/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectDetailModal.tsx
│   │   │   ├── ProjectFilters.tsx
│   │   │   └── ProjectGrid.tsx
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── WorkSection.tsx
│   │       ├── SystemsSection.tsx
│   │       ├── EssaysSection.tsx
│   │       ├── AboutSection.tsx
│   │       └── ContactSection.tsx
│   ├── lib/
│   │   └── (future utilities)
│   └── data/
│       ├── index.ts
│       └── projects.ts
├── styles/
│   └── globals.css
└── docs/
    ├── Attributions.md (MOVED)
    └── Guidelines.md (MOVED)
```

---

## Summary of Changes

| Action | Count | Files |
|--------|-------|-------|
| Move | 5 | UI components to src/components/ui/ |
| Move | 2 | Documentation to docs/ |
| Delete | 44 | Unused shadcn components |
| Delete | 1 | Duplicate ImageWithFallback |
| Update imports | 5 | Component files |
| Create directories | 3 | src/components/ui/, src/lib/, docs/ |

**Total operations**: 60 file operations

---

**Status**: Ready for execution
