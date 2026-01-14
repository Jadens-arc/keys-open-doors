<template>
  <div class="chord-selector">
    <div class="chord-header">
      <h3 class="text-lg font-semibold text-gray-100">Scale Degrees</h3>
      <p v-if="!hasSelection" class="text-sm text-gray-400 mt-1">
        Select a key above to see available chords
      </p>
    </div>
    
    <div class="chord-buttons">
      <Button
        v-for="(chord, index) in chords"
        :key="index"
        :label="chord"
        :disabled="!hasSelection"
        :severity="selectedIndex === index ? 'success' : 'secondary'"
        :outlined="selectedIndex !== index"
        @click="handleChordClick(index)"
        class="chord-button"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Button from 'primevue/button'
import { getScaleChords } from '../utils/chords'

const props = defineProps({
  scaleType: {
    type: String,
    default: null
  },
  chordType: {
    type: String,
    default: 'triad'
  },
  selectedIndex: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['select-chord'])

const hasSelection = computed(() => props.scaleType !== null)

const chords = computed(() => {
  if (!props.scaleType) {
    return ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'] // Default placeholder
  }
  return getScaleChords(props.scaleType)
})

const handleChordClick = (index) => {
  if (!hasSelection.value) return
  emit('select-chord', index)
}
</script>

<style scoped>
.chord-selector {
  @apply py-3 mb-3;
}

.chord-header {
  @apply text-center mb-4;
}

.chord-buttons {
  @apply flex justify-center gap-3 flex-wrap;
}

.chord-button {
  @apply min-w-[80px] font-medium;
  border-radius: 0.375rem !important;
  padding: 0.5rem 1.25rem !important;
  transition: all 0.2s ease !important;
  border-width: 1px !important;
}

/* Force selected state styles */
.chord-button:deep(.p-button-success) {
  background-color: #22c55e !important;
  border-color: #16a34a !important;
  color: white !important;
}

.chord-button:deep(.p-button-secondary.p-button-outlined) {
  background-color: rgba(61, 50, 40, 0.5) !important;
  border-color: #5a4d3f !important;
  color: #d1c4b0 !important;
}
</style>
