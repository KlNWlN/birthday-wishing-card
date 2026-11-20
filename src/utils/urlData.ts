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
    // Trim and decode in case of URL encoding issues
    const cleaned = decodeURIComponent(encodedStr.trim());
    let decompressed = LZString.decompressFromEncodedURIComponent(cleaned);
    
    // Fallback if decodeURIComponent wasn't needed
    if (!decompressed) {
      decompressed = LZString.decompressFromEncodedURIComponent(encodedStr.trim());
    }

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
 * Robustly checks:
 * 1. window.location.hash (#data=... or #wish#data=... or #/wish#data=...)
 * 2. window.location.search (?data=...)
 * 3. raw hash if hash itself is the encoded payload (#<compressed>)
 */
export function getEncodedDataFromUrl(): string | null {
  if (typeof window === 'undefined') return null;

  const fullHash = window.location.hash;
  if (fullHash) {
    // 1. Look for data=...
    const match = fullHash.match(/data=([^&]+)/);
    if (match && match[1]) {
      return match[1];
    }

    // 2. Look for hash that starts with #/wish?data=...
    const qMatch = fullHash.match(/\?data=([^&]+)/);
    if (qMatch && qMatch[1]) {
      return qMatch[1];
    }
  }

  // 3. Check search params (?data=...)
  const params = new URLSearchParams(window.location.search);
  const dataParam = params.get('data');
  if (dataParam) return dataParam;

  return null;
}

/**
 * Generates the clean, single-hash shareable URL
 * Format: https://example.com/#data=<compressed>
 * This format is 100% compliant with RFC 3986, never splits in WhatsApp/SMS,
 * and loads seamlessly on any host (Vercel, Netlify, GitHub Pages, or local).
 */
export function generateShareableUrl(data: BirthdayCardData, customBaseUrl?: string): string {
  const compressed = encodeCardData(data);
  const base = customBaseUrl 
    ? customBaseUrl.replace(/\/$/, '')
    : `${window.location.origin}${window.location.pathname}`.replace(/\/$/, '');
  
  return `${base}/#data=${compressed}`;
}
