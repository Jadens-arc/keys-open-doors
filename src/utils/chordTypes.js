// Chord type definitions

export const CHORD_TYPES = [
  {
    key: 'triad',
    name: 'Triads',
    description: 'Basic 3-note chords',
    intervals: [0, 2, 4] // 1st, 3rd, 5th scale degrees
  },
  {
    key: 'seventh',
    name: '7th Chords',
    description: '4-note chords with 7th',
    intervals: [0, 2, 4, 6] // 1st, 3rd, 5th, 7th scale degrees
  },
  {
    key: 'sus2',
    name: 'Sus2',
    description: 'Suspended 2nd (no 3rd)',
    intervals: [0, 1, 4] // 1st, 2nd, 5th scale degrees
  },
  {
    key: 'sus4',
    name: 'Sus4',
    description: 'Suspended 4th (no 3rd)',
    intervals: [0, 3, 4] // 1st, 4th, 5th scale degrees
  }
]

export const DEFAULT_CHORD_TYPE = 'triad'
