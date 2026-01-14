// Chord definitions and calculations

// Chord formulas by scale type (Roman numeral notation)
export const CHORD_NUMERALS = {
  major: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
  naturalMinor: ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
  harmonicMinor: ['i', 'ii°', 'III+', 'iv', 'V', 'VI', 'vii°'],
  melodicMinor: ['i', 'ii', 'III+', 'IV', 'V', 'vi°', 'vii°'],
  phrygian: ['i', 'II', 'III', 'iv', 'v°', 'VI', 'vii']
}

// Chord quality intervals (triad)
export const CHORD_INTERVALS = {
  major: [0, 4, 7],      // Major triad
  minor: [0, 3, 7],      // Minor triad
  diminished: [0, 3, 6], // Diminished triad
  augmented: [0, 4, 8]   // Augmented triad
}

/**
 * Get chord quality from Roman numeral
 * @param {string} numeral - Roman numeral (e.g., 'I', 'ii', 'vii°')
 * @returns {string} Chord quality ('major', 'minor', 'diminished', 'augmented')
 */
function getChordQuality(numeral) {
  if (numeral.includes('°')) return 'diminished'
  if (numeral.includes('+')) return 'augmented'
  // Uppercase = major, lowercase = minor
  return numeral[0] === numeral[0].toUpperCase() ? 'major' : 'minor'
}

/**
 * Get chord notes for a given scale degree
 * @param {Array<number>} scaleNotes - Scale notes as semitones (0-11)
 * @param {number} degree - Scale degree (0-6, where 0 = first degree)
 * @param {string} scaleType - Scale type key
 * @param {string} chordType - Chord type key ('triad', 'seventh', 'sus2', 'sus4')
 * @returns {Array<number>} Array of semitone values in the chord
 */
export function getChordNotes(scaleNotes, degree, scaleType, chordType = 'triad') {
  if (degree < 0 || degree >= 7) {
    console.error(`Invalid degree: ${degree}`)
    return []
  }
  
  if (!scaleNotes || scaleNotes.length === 0) {
    return []
  }
  
  // Get the chord type intervals
  const chordTypeIntervals = getChordTypeIntervals(chordType)
  
  // Build chord using the specified intervals (scale degrees)
  const chordNotes = chordTypeIntervals.map(interval => {
    return scaleNotes[(degree + interval) % 7]
  })
  
  return chordNotes.map(note => note % 12)
}

/**
 * Get scale degree intervals for a chord type
 * @param {string} chordType - Chord type key
 * @returns {Array<number>} Scale degree intervals
 */
function getChordTypeIntervals(chordType) {
  const intervals = {
    'triad': [0, 2, 4],     // 1st, 3rd, 5th
    'seventh': [0, 2, 4, 6], // 1st, 3rd, 5th, 7th
    'sus2': [0, 1, 4],      // 1st, 2nd, 5th
    'sus4': [0, 3, 4]       // 1st, 4th, 5th
  }
  
  return intervals[chordType] || intervals['triad']
}

/**
 * Get chord symbol for display
 * @param {string} rootNote - Root note name (e.g., 'C', 'A#/Bb')
 * @param {string} scaleType - Scale type key
 * @param {number} degree - Scale degree (0-6)
 * @returns {string} Chord symbol (e.g., 'Cmaj', 'Am', 'Bdim')
 */
export function getChordSymbol(rootNote, scaleType, degree) {
  const numerals = CHORD_NUMERALS[scaleType]
  if (!numerals) return ''
  
  return numerals[degree]
}

/**
 * Get all chords for a scale
 * @param {string} scaleType - Scale type key
 * @returns {Array<string>} Array of chord symbols
 */
export function getScaleChords(scaleType) {
  return CHORD_NUMERALS[scaleType] || []
}
