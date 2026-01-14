// Composable for music theory logic
import { getScaleNotes, isNoteInScale } from '../utils/scales'
import { getChordNotes, getChordSymbol } from '../utils/chords'
import { getNoteName, getSemitone } from '../utils/notes'

export function useMusicTheory() {
  /**
   * Get all notes in a scale
   * @param {number} rootSemitone - Root note (0-11)
   * @param {string} scaleType - Scale type key
   * @returns {Array<number>} Scale notes as semitones
   */
  const getScaleNotes = (rootSemitone, scaleType) => {
    const { getScaleNotes: getScale } = require('@/utils/scales')
    return getScaleNotes(rootSemitone, scaleType)
  }

  return {
    getScaleNotes,
    getChordNotes,
    getChordSymbol,
    isNoteInScale
  }
}
