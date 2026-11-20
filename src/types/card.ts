export interface MemoryPhoto {
  id: number;
  url: string; // Data URL or SVG string
  caption: string;
}

export interface BirthdayCardData {
  recipientName: string;
  birthdayDate: string;
  senderName: string;
  letter: string;
  musicEnabled: boolean;
  photos: MemoryPhoto[];
}

export const DEFAULT_LETTER = `Happy Birthday! Another year older, wiser, and even more wonderful.

Thank you for filling every room you enter with warmth, laughter, and so much kindness. Looking back at all our adventures, late-night talks, and silly jokes, I'm constantly reminded of how lucky I am to have you in my corner.

I hope today reminds you how deeply loved and appreciated you are. May the upcoming year bring you big adventures, quiet moments of peace, unexpected joy, and everything your heart dreams of.

Keep shining as bright as you always do!`;

export const DEFAULT_PHOTOS: MemoryPhoto[] = [
  {
    id: 1,
    url: 'default-1',
    caption: 'Unforgettable starry night ✨'
  },
  {
    id: 2,
    url: 'default-2',
    caption: 'That spontaneous road trip 🚗'
  },
  {
    id: 3,
    url: 'default-3',
    caption: 'Laughing till our stomachs hurt 😂'
  },
  {
    id: 4,
    url: 'default-4',
    caption: 'Always by your side, always 🌸'
  }
];

export const DEFAULT_CARD_DATA: BirthdayCardData = {
  recipientName: 'Aanya',
  birthdayDate: '28 September',
  senderName: 'Someone Special',
  letter: DEFAULT_LETTER,
  musicEnabled: true,
  photos: DEFAULT_PHOTOS
};
