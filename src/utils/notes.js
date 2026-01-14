// Note utilities for handling note names and conversions

export const ALL_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export const NOTE_NAMES = {
  sharp: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
  flat: ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
}

// Root notes with both sharp and flat names displayed
export const ROOT_NOTES = [
  { display: 'C', value: 0 },
  { display: 'C#/Db', value: 1 },
  { display: 'D', value: 2 },
  { display: 'D#/Eb', value: 3 },
  { display: 'E', value: 4 },
  { display: 'F', value: 5 },
  { display: 'F#/Gb', value: 6 },
  { display: 'G', value: 7 },
  { display: 'G#/Ab', value: 8 },
  { display: 'A', value: 9 },
  { display: 'A#/Bb', value: 10 },
  { display: 'B', value: 11 }
]

/**
 * Get note name by semitone offset
 * @param {number} semitone - 0-11
 * @param {boolean} preferFlat - Use flat notation
 * @returns {string} Note name
 */
export function getNoteName(semitone, preferFlat = false) {
  const notes = preferFlat ? NOTE_NAMES.flat : NOTE_NAMES.sharp
  return notes[semitone % 12]
}

/**
 * Get semitone value from note name
 * @param {string} noteName - Note name (e.g., 'C#', 'Db')
 * @returns {number} Semitone value 0-11
 */
export function getSemitone(noteName) {
  const sharpIndex = NOTE_NAMES.sharp.indexOf(noteName)
  if (sharpIndex !== -1) return sharpIndex
  
  const flatIndex = NOTE_NAMES.flat.indexOf(noteName)
  if (flatIndex !== -1) return flatIndex
  
  return 0 // Default to C if not found
}

/**
 * Generate all piano keys for a given range
 * @param {number} startOctave - Starting octave (e.g., 3)
 * @param {number} numOctaves - Number of octaves (e.g., 2)
 * @returns {Array} Array of piano key objects
 */
export function generatePianoKeys(startOctave = 3, numOctaves = 2) {
  const keys = []
  const totalNotes = (numOctaves * 12) + 1 // +1 for final C
  
  for (let i = 0; i < totalNotes; i++) {
    const noteIndex = i % 12
    const octave = startOctave + Math.floor(i / 12)
    const noteName = ALL_NOTES[noteIndex]
    const isBlack = noteName.includes('#')
    
    keys.push({
      note: noteName,
      octave,
      isBlack,
      fullNote: `${noteName}${octave}`,
      midiNote: (octave + 1) * 12 + noteIndex
    })
  }
  
  return keys
}
