import LZString from 'lz-string';
import { BirthdayCardData, DEFAULT_CARD_DATA } from '../types/card';

/**
 * Compresses BirthdayCardData into a URL-safe encoded string using LZ-String
 */
export function encodeCardData(data: BirthdayCardData): string {
  try {
    const jsonStr = JSON.stringify(data);
    return LZString.compressToEncodedURIComponent(jsonStr);
  } catch (err) {
    console.error('Failed to encode card data:', err);
    return '';
  }
}

/**
 * Decompresses an LZ-String encoded string back into BirthdayCardData
 */
export function decodeCardData(encodedStr: string): BirthdayCardData | null {
  if (!encodedStr) return null;
  try {
    const decompressed = LZString.decompressFromEncodedURIComponent(encodedStr);
    if (!decompressed) return null;
    const parsed = JSON.parse(decompressed);
    
    // Validate minimal structure
    if (typeof parsed === 'object' && parsed !== null) {
      return {
        recipientName: parsed.recipientName || DEFAULT_CARD_DATA.recipientName,
        birthdayDate: parsed.birthdayDate || DEFAULT_CARD_DATA.birthdayDate,
        senderName: parsed.senderName || DEFAULT_CARD_DATA.senderName,
        letter: parsed.letter || DEFAULT_CARD_DATA.letter,
        musicEnabled: parsed.musicEnabled ?? DEFAULT_CARD_DATA.musicEnabled,
        photos: Array.isArray(parsed.photos) && parsed.photos.length > 0 ? parsed.photos : DEFAULT_CARD_DATA.photos
      };
    }
    return null;
  } catch (err) {
    console.error('Failed to decode card data:', err);
    return null;
  }
}

/**
 * Extracts encoded string from window.location or given URL
 * Handles both `/wish#data=...` and `#data=...` or query params
 */
export function getEncodedDataFromUrl(): string | null {
  if (typeof window === 'undefined') return null;

  const hash = window.location.hash;
  if (hash) {
    // Check for #data=... or #/wish#data=...
    const match = hash.match(/data=([^&]+)/);
    if (match && match[1]) {
      return match[1];
    }
  }

  // Check search params fallback
  const params = new URLSearchParams(window.location.search);
  const dataParam = params.get('data');
  if (dataParam) return dataParam;

  return null;
}

/**
 * Generates the full shareable URL pointing to `/wish#data=...`
 */
export function generateShareableUrl(data: BirthdayCardData): string {
  const compressed = encodeCardData(data);
  const base = `${window.location.origin}${window.location.pathname}`.replace(/\/$/, '');
  return `${base}#/wish#data=${compressed}`;
}
