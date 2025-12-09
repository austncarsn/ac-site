/**
 * Shared color constants for consistent color usage across the application
 */

// Blue gradient palette for interactive elements - from dark pastel blue to lightest shade
export const VIBRANT_COLORS = [
  '#4A6FA5', // Dark Pastel Blue
  '#5C7FB8', // Medium Dark Blue
  '#6E8FCA', // Mid Blue
  '#809FDC', // Medium Blue
  '#92AFEE', // Medium Light Blue
  '#A4BFFF', // Light Blue
  '#B6CFFF', // Lighter Blue
  '#C8DFFF', // Very Light Blue
  '#DAEFFF', // Pale Blue
  '#ECFAFF', // Lightest Blue
] as const;

// Off-white monochrome palette for neutral color blocks
export const MONOCHROME_PALETTE = [
  '#F8F8F8', '#F6F6F6', '#F4F4F4', '#F2F2F2', '#F0F0F0',
  '#EEEEEE', '#ECECEC', '#EAEAEA', '#E8E8E8', '#E6E6E6',
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