/**
 * Shared color constants for consistent color usage across the application
 */

// Vibrant color palette used for interactive elements
export const VIBRANT_COLORS = [
  '#6B4EFF', // Purple
  '#FF3B5C', // Red/Pink
  '#FF6B00', // Orange
  '#FFEB3B', // Yellow
  '#00E676', // Green
  '#FFC107', // Amber
  '#E040FB', // Magenta
  '#FF5722', // Deep Orange
  '#9C27B0', // Deep Purple
  '#DC143C', // Crimson
  '#00BCD4', // Cyan
  '#3F51B5', // Indigo
  '#673AB7', // Deep Purple Alt
  '#F44336', // Red
  '#4CAF50', // Green Alt
] as const;

// Monochrome palette for neutral color blocks
export const MONOCHROME_PALETTE = [
  '#0A0A0A', '#1A1A1A', '#2D2D2D', '#404040', '#595959',
  '#737373', '#8C8C8C', '#A6A6A6', '#BFBFBF', '#D9D9D9',
] as const;

/**
 * Calculates the complementary color of a given hex color
 * @param hexColor - Hex color string (with or without #)
 * @returns Complementary color as rgba string with 0.2 opacity
 */
export function getComplementaryColor(hexColor: string): string {
  // Remove # if present
  const hex = hexColor.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Convert RGB to HSL
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;
  
  let h = 0;
  
  if (delta !== 0) {
    if (max === rNorm) {
      h = ((gNorm - bNorm) / delta) % 6;
    } else if (max === gNorm) {
      h = (bNorm - rNorm) / delta + 2;
    } else {
      h = (rNorm - gNorm) / delta + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  
  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  
  // Rotate hue by 180 degrees for complementary color
  const compH = (h + 180) % 360;
  
  // Convert HSL back to RGB
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((compH / 60) % 2) - 1));
  const m = l - c / 2;
  
  let rComp = 0;
  let gComp = 0;
  let bComp = 0;
  
  if (compH >= 0 && compH < 60) {
    rComp = c; gComp = x; bComp = 0;
  } else if (compH >= 60 && compH < 120) {
    rComp = x; gComp = c; bComp = 0;
  } else if (compH >= 120 && compH < 180) {
    rComp = 0; gComp = c; bComp = x;
  } else if (compH >= 180 && compH < 240) {
    rComp = 0; gComp = x; bComp = c;
  } else if (compH >= 240 && compH < 300) {
    rComp = x; gComp = 0; bComp = c;
  } else {
    rComp = c; gComp = 0; bComp = x;
  }
  
  const rFinal = Math.round((rComp + m) * 255);
  const gFinal = Math.round((gComp + m) * 255);
  const bFinal = Math.round((bComp + m) * 255);
  
  // Return as rgba with reduced opacity for subtle effect
  return `rgba(${rFinal}, ${gFinal}, ${bFinal}, 0.2)`;
}
