// Scale definitions and calculations

// Scale intervals (in semitones from root)
export const SCALE_INTERVALS = {
  major: [0, 2, 4, 5, 7, 9, 11],
  naturalMinor: [0, 2, 3, 5, 7, 8, 10],
  harmonicMinor: [0, 2, 3, 5, 7, 8, 11],
  melodicMinor: [0, 2, 3, 5, 7, 9, 11],
  phrygian: [0, 1, 3, 5, 7, 8, 10]
}

// Human-readable scale names
export const SCALE_NAMES = {
  major: 'Major',
  naturalMinor: 'Natural Minor',
  harmonicMinor: 'Harmonic Minor',
  melodicMinor: 'Melodic Minor',
  phrygian: 'Phrygian'
}

// All available scale types
export const SCALE_TYPES = [
  { key: 'major', name: 'Major' },
  { key: 'naturalMinor', name: 'Natural Minor' },
  { key: 'harmonicMinor', name: 'Harmonic Minor' },
  { key: 'melodicMinor', name: 'Melodic Minor' },
  { key: 'phrygian', name: 'Phrygian' }
]

/**
 * Get scale notes given a root note and scale type
 * @param {number} rootSemitone - Root note as semitone (0-11)
 * @param {string} scaleType - Scale type key
 * @returns {Array<number>} Array of semitone values in the scale
 */
export function getScaleNotes(rootSemitone, scaleType) {
  const intervals = SCALE_INTERVALS[scaleType]
  if (!intervals) {
    console.error(`Unknown scale type: ${scaleType}`)
    return []
  }
  
  return intervals.map(interval => (rootSemitone + interval) % 12)
}

/**
 * Check if a note is in a scale
 * @param {number} noteSemitone - Note to check (0-11)
 * @param {Array<number>} scaleNotes - Scale notes as semitones
 * @returns {boolean} True if note is in scale
 */
export function isNoteInScale(noteSemitone, scaleNotes) {
  return scaleNotes.includes(noteSemitone % 12)
}

/**
 * Get scale degree of a note (1-7)
 * @param {number} noteSemitone - Note to check (0-11)
 * @param {Array<number>} scaleNotes - Scale notes as semitones
 * @returns {number|null} Scale degree (1-7) or null if not in scale
 */
export function getScaleDegree(noteSemitone, scaleNotes) {
  const index = scaleNotes.indexOf(noteSemitone % 12)
  return index === -1 ? null : index + 1
}
