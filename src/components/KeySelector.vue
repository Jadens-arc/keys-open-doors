<template>
  <div class="key-selector-container">
    <!-- Root Note Selection Section -->
    <div class="selector-card">
      <div class="card-header">
        <h3 class="text-lg font-semibold text-gray-100">Root Key</h3>
      </div>
      <div class="button-row">
        <Button
          v-for="note in rootNotes"
          :key="note.value"
          :label="note.display"
          :severity="tempRootSemitone === note.value ? 'primary' : 'secondary'"
          :outlined="tempRootSemitone !== note.value"
          @click="handleRootClick(note.value, note.display)"
          size="small"
          class="selection-button"
        />
      </div>
    </div>

    <!-- Scale Type Selection Section - Only shown after root note is selected -->
    <Transition name="fade-slide">
      <div v-if="tempRootSemitone !== null" class="selector-card">
        <div class="card-header">
          <h3 class="text-lg font-semibold text-gray-100">Scale / Mode</h3>
        </div>
        <div class="button-row">
          <Button
            v-for="scaleType in scaleTypes"
            :key="scaleType.key"
            :label="scaleType.name"
            :severity="tempScaleType === scaleType.key ? 'primary' : 'secondary'"
            :outlined="tempScaleType !== scaleType.key"
            @click="handleScaleTypeClick(scaleType.key)"
            size="small"
            class="selection-button"
          />
        </div>
      </div>
    </Transition>

    <!-- Chord Type Selection Section - Only shown after scale type is selected -->
    <Transition name="fade-slide">
      <div v-if="tempScaleType !== null" class="selector-card">
        <div class="card-header">
          <h3 class="text-lg font-semibold text-gray-100">Chord Voicing</h3>
        </div>
        <div class="button-row">
          <Button
            v-for="chordType in chordTypes"
            :key="chordType.key"
            :label="chordType.name"
            :severity="tempChordType === chordType.key ? 'primary' : 'secondary'"
            :outlined="tempChordType !== chordType.key"
            @click="handleChordTypeClick(chordType.key)"
            size="small"
            class="selection-button"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import { ROOT_NOTES } from '../utils/notes'
import { SCALE_TYPES } from '../utils/scales'
import { CHORD_TYPES, DEFAULT_CHORD_TYPE } from '../utils/chordTypes'

const props = defineProps({
  selectedRootSemitone: {
    type: Number,
    default: null
  },
  selectedScaleType: {
    type: String,
    default: null
  },
  selectedChordType: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['select-key', 'select-chord-type'])

const rootNotes = ROOT_NOTES
const scaleTypes = SCALE_TYPES
const chordTypes = CHORD_TYPES

// Track temporary selections
const tempRootSemitone = ref(props.selectedRootSemitone)
const tempRootDisplay = ref(null)
const tempScaleType = ref(props.selectedScaleType)
const tempChordType = ref(props.selectedChordType || DEFAULT_CHORD_TYPE)

const handleRootClick = (rootSemitone, rootDisplay) => {
  // If clicking the same root note, deselect it
  if (tempRootSemitone.value === rootSemitone) {
    tempRootSemitone.value = null
    tempRootDisplay.value = null
    tempScaleType.value = null
    tempChordType.value = DEFAULT_CHORD_TYPE
    emit('select-key', null, null, null)
    return
  }
  
  tempRootSemitone.value = rootSemitone
  tempRootDisplay.value = rootDisplay
  
  // If scale type is already selected, emit the complete selection
  if (tempScaleType.value !== null) {
    emit('select-key', rootSemitone, rootDisplay, tempScaleType.value)
  }
}

const handleScaleTypeClick = (scaleType) => {
  tempScaleType.value = scaleType
  
  // If root is already selected, emit the complete selection
  if (tempRootSemitone.value !== null) {
    emit('select-key', tempRootSemitone.value, tempRootDisplay.value, scaleType)
  }
}

const handleChordTypeClick = (chordType) => {
  tempChordType.value = chordType
  emit('select-chord-type', chordType)
}
</script>

<style scoped>
.key-selector-container {
  @apply space-y-3 mb-3;
}

.selector-card {
  @apply py-3;
}

.card-header {
  @apply text-center mb-4;
}

.button-row {
  @apply flex gap-3 flex-wrap justify-center;
}

.selection-button {
  @apply min-w-[70px] font-medium;
  border-radius: 0.375rem !important;
  padding: 0.5rem 1rem !important;
  transition: all 0.2s ease !important;
  border-width: 1px !important;
}

/* Force selected state styles */
.selection-button:deep(.p-button-primary) {
  background-color: #3b82f6 !important;
  border-color: #2563eb !important;
  color: white !important;
}

.selection-button:deep(.p-button-secondary.p-button-outlined) {
  background-color: rgba(61, 50, 40, 0.5) !important;
  border-color: #5a4d3f !important;
  color: #d1c4b0 !important;
}

/* Fade and slide up animation */
.fade-slide-enter-active {
  transition: all 0.4s ease-out;
}

.fade-slide-leave-active {
  transition: all 0.3s ease-in;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
