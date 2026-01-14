// Composable for keyboard state management
import { ref, computed } from 'vue'
import { getScaleNotes } from '../utils/scales'
import { getChordNotes } from '../utils/chords'
import { DEFAULT_CHORD_TYPE } from '../utils/chordTypes'

export function useKeyboardState() {
  // Selected values
  const selectedRootSemitone = ref(null)
  const selectedRootDisplay = ref(null)
  const selectedScaleType = ref(null)
  const selectedChordType = ref(DEFAULT_CHORD_TYPE)
  const selectedChordIndex = ref(null)

  // Computed: Scale notes (all notes in the selected scale)
  const scaleNotes = computed(() => {
    if (selectedRootSemitone.value === null || !selectedScaleType.value) {
      return []
    }
    return getScaleNotes(selectedRootSemitone.value, selectedScaleType.value)
  })

  // Computed: Chord notes (notes in the selected chord)
  const chordNotes = computed(() => {
    if (scaleNotes.value.length === 0 || selectedChordIndex.value === null || !selectedChordType.value) {
      return []
    }
    return getChordNotes(
      scaleNotes.value,
      selectedChordIndex.value,
      selectedScaleType.value,
      selectedChordType.value
    )
  })

  // Computed: Dimmed notes (notes in scale but not in chord)
  const dimmedNotes = computed(() => {
    if (chordNotes.value.length === 0) {
      return []
    }
    return scaleNotes.value.filter(note => !chordNotes.value.includes(note))
  })

  /**
   * Select a key (root + scale type)
   */
  const selectKey = (rootSemitone, rootDisplay, scaleType) => {
    selectedRootSemitone.value = rootSemitone
    selectedRootDisplay.value = rootDisplay
    selectedScaleType.value = scaleType
    selectedChordIndex.value = null // Reset chord selection
  }

  /**
   * Select chord type
   */
  const selectChordType = (chordType) => {
    selectedChordType.value = chordType
    // Don't reset chord selection - keep the same degree selected
  }

  /**
   * Select a chord by index
   */
  const selectChord = (chordIndex) => {
    if (selectedChordIndex.value === chordIndex) {
      // Deselect if clicking same chord
      selectedChordIndex.value = null
    } else {
      selectedChordIndex.value = chordIndex
    }
  }

  /**
   * Reset all selections
   */
  const reset = () => {
    selectedRootSemitone.value = null
    selectedRootDisplay.value = null
    selectedScaleType.value = null
    selectedChordType.value = DEFAULT_CHORD_TYPE
    selectedChordIndex.value = null
  }

  return {
    // State
    selectedRootSemitone,
    selectedRootDisplay,
    selectedScaleType,
    selectedChordType,
    selectedChordIndex,
    
    // Computed
    scaleNotes,
    chordNotes,
    dimmedNotes,
    
    // Methods
    selectKey,
    selectChordType,
    selectChord,
    reset
  }
}
