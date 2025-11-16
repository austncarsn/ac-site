# Repository Cleanup - Removal Plan

**Generated**: 2024
**Status**: COMPLETED

---

## Summary

This document lists all files that were removed or attempted during the repository cleanup.
Each entry includes the file path, reason for removal, and verification checks performed.

**Total files removed**: 1
**Protected files (unable to remove)**: 46

---

## 1. Duplicate Component (REMOVED ✅)

### /src/components/figma/ImageWithFallback.tsx
- **Reason**: Duplicate of protected system file at `/components/figma/ImageWithFallback.tsx`
- **Verification**: 
  - Checked imports: Updated in ProjectCard.tsx and ProjectDetailModal.tsx
  - Action: Updated imports to use protected version, then deleted duplicate
  - Protected version has better error handling with base64 fallback image
- **Status**: ✅ REMOVED SUCCESSFULLY

---

## 2. Unused Shadcn/UI Components (PROTECTED - UNABLE TO REMOVE)

All components in `/components/ui/` except: dialog.tsx, input.tsx, textarea.tsx, sonner.tsx, utils.ts

**Note**: These files are protected system files in the Figma Make environment and cannot be deleted.
They do not affect build size or performance as the build system tree-shakes unused imports.

### Core Components (Protected by System)

| File | Verification | Status |
|------|-------------|---------|
| /components/ui/accordion.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/alert-dialog.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/alert.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/aspect-ratio.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/avatar.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/badge.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/breadcrumb.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/button.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/calendar.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/card.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/carousel.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/chart.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/checkbox.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/collapsible.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/command.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/context-menu.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/drawer.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/dropdown-menu.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/form.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/hover-card.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/input-otp.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/label.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/menubar.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/navigation-menu.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/pagination.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/popover.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/progress.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/radio-group.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/resizable.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/scroll-area.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/select.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/separator.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/sheet.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/sidebar.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/skeleton.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/slider.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/switch.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/table.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/tabs.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/toggle-group.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/toggle.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/tooltip.tsx | No imports found | ⚠️ Protected - Cannot remove |
| /components/ui/use-mobile.ts | No imports found | ⚠️ Protected - Cannot remove |

---

## 3. Documentation Files (PROTECTED - UNABLE TO MOVE)

| File | Status |
|------|---------|
| /Attributions.md | ⚠️ Protected - Created copy at /docs/Attributions.md |
| /guidelines/Guidelines.md | ⚠️ Protected - Created copy at /docs/Guidelines.md |

---

## Components MOVED (Not Removed)

These components ARE actively used and were MOVED to `/src/components/ui/`:

| File | Old Location | New Location | Status |
|------|-------------|--------------|---------|
| dialog.tsx | /components/ui/ | /src/components/ui/ | ✅ MOVED |
| input.tsx | /components/ui/ | /src/components/ui/ | ✅ MOVED |
| textarea.tsx | /components/ui/ | /src/components/ui/ | ✅ MOVED |
| sonner.tsx | /components/ui/ | /src/components/ui/ | ✅ MOVED |
| utils.ts | /components/ui/ | /src/components/ui/ | ✅ MOVED |

---

## Execution Summary

1. ✅ Created removal plan
2. ✅ Moved used UI components to `/src/components/ui/`
3. ✅ Updated all import paths in 4 component files
4. ⚠️ Unable to delete 44 unused shadcn components (protected files)
5. ✅ Deleted duplicate ImageWithFallback successfully
6. ⚠️ Unable to move documentation files (protected, but created copies)
7. ✅ All imports verified and working

---

## Post-Cleanup Verification

After cleanup:
- [x] All imports resolve correctly
- [x] No broken references
- [x] Application structure is clean and organized
- [x] Import paths are consistent
- [x] Used components successfully moved to src structure
- [x] Duplicate ImageWithFallback removed

**Note**: The protected system files in `/components/ui/` remain but do not affect the build since they are not imported anywhere in the codebase. The build system will tree-shake these unused imports automatically.

---

**End of Removal Plan**