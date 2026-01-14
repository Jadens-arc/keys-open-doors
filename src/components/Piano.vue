<template>
  <div class="piano-container">
    <div class="piano-wrapper">
      <div class="piano-keys">
        <template v-for="(key, index) in pianoKeys" :key="key.fullNote">
          <PianoKey
            :note="key.note"
            :octave="key.octave"
            :isBlack="key.isBlack"
            :highlighted="isHighlighted(key)"
            :active="isActive(key)"
            :dimmed="isDimmed(key)"
            :notInScale="isNotInScale(key)"
            :showLabel="!key.isBlack"
            :style="getKeyPosition(key, index)"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PianoKey from './PianoKey.vue'
import { generatePianoKeys, getSemitone } from '../utils/notes'

const props = defineProps({
  highlightedNotes: {
    type: Array,
    default: () => []
  },
  activeChordNotes: {
    type: Array,
    default: () => []
  },
  dimmedNotes: {
    type: Array,
    default: () => []
  }
})

// Generate 2 octaves of piano keys (C3 to C5)
const pianoKeys = generatePianoKeys(3, 2)

// Check if a key should be highlighted (in scale)
const isHighlighted = (key) => {
  const semitone = getSemitone(key.note)
  return props.highlightedNotes.includes(semitone)
}

// Check if a key is in the active chord
const isActive = (key) => {
  const semitone = getSemitone(key.note)
  return props.activeChordNotes.includes(semitone)
}

// Check if a key should be dimmed (in scale but not in chord)
const isDimmed = (key) => {
  const semitone = getSemitone(key.note)
  // If there are active chord notes, dim keys that are in scale but not in chord
  if (props.activeChordNotes.length > 0 && props.highlightedNotes.length > 0) {
    return props.dimmedNotes.includes(semitone)
  }
  return false
}

// Check if a key is not in the scale at all (when a chord is selected)
const isNotInScale = (key) => {
  const semitone = getSemitone(key.note)
  // Only apply this when a chord is selected
  if (props.activeChordNotes.length > 0 && props.highlightedNotes.length > 0) {
    return !props.highlightedNotes.includes(semitone)
  }
  return false
}

// Calculate position for each key (for black keys)
const getKeyPosition = (key, index) => {
  if (!key.isBlack) {
    return {}
  }
  
  // Count white keys before this key to determine position
  const whiteKeysBefore = pianoKeys
    .slice(0, index)
    .filter(k => !k.isBlack).length
  
  // Black keys are positioned between white keys
  // Each white key is 60px wide
  const leftOffset = (whiteKeysBefore * 60) - 20
  
  return {
    left: `${leftOffset}px`
  }
}
</script>

<style scoped>
.piano-container {
  @apply flex justify-center items-center py-3;
}

.piano-wrapper {
  @apply relative p-4;
}

.piano-keys {
  @apply relative flex;
  height: 220px;
}
</style>
