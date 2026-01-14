<template>
  <div class="app-container">
    <!-- Left scrolling banner -->
    <!-- <div class="scroll-banner scroll-banner-left">
      <div class="banner-content">
        <span v-for="i in 20" :key="'left-' + i">KEYS OPEN DOORS</span>
      </div>
    </div> -->

    <main class="app-main">
      <KeySelector
        :selectedRootSemitone="selectedRootSemitone"
        :selectedScaleType="selectedScaleType"
        :selectedChordType="selectedChordType"
        @select-key="handleSelectKey"
        @select-chord-type="handleSelectChordType"
      />

      <Transition name="fade-slide">
        <ChordSelector
          v-if="selectedRootDisplay && selectedScaleType && selectedChordType"
          :scaleType="selectedScaleType"
          :chordType="selectedChordType"
          :selectedIndex="selectedChordIndex"
          @select-chord="handleSelectChord"
        />
      </Transition>

      <Transition name="fade-slide">
        <Piano
          v-if="selectedRootDisplay && selectedScaleType && selectedChordType"
          :highlightedNotes="scaleNotes"
          :activeChordNotes="chordNotes"
          :dimmedNotes="dimmedNotes"
        />
      </Transition>

      <Transition name="fade-slide">
        <div v-if="selectedRootDisplay && selectedScaleType && selectedChordType" class="selection-info">
          <div class="info-card">
            <span class="info-label">Current Selection:</span>
            <span class="info-value">{{ selectedRootDisplay }} {{ scaleTypeName }}</span>
            <span v-if="selectedChordIndex !== null" class="info-chord">
              - {{ currentChord }}
            </span>
          </div>
        </div>
      </Transition>
    </main>

    <!-- Right scrolling banner -->
    <!-- <div class="scroll-banner scroll-banner-right">
      <div class="banner-content">
        <span v-for="i in 20" :key="'right-' + i">KEYS OPEN DOORS</span>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { computed } from 'vue'
import KeySelector from './components/KeySelector.vue'
import ChordSelector from './components/ChordSelector.vue'
import Piano from './components/Piano.vue'
import { useKeyboardState } from './composables/useKeyboardState'
import { SCALE_NAMES } from './utils/scales'
import { getScaleChords } from './utils/chords'

// Use the keyboard state composable
const {
  selectedRootSemitone,
  selectedRootDisplay,
  selectedScaleType,
  selectedChordType,
  selectedChordIndex,
  scaleNotes,
  chordNotes,
  dimmedNotes,
  selectKey,
  selectChordType,
  selectChord
} = useKeyboardState()

// Handle key selection
const handleSelectKey = (rootSemitone, rootDisplay, scaleType) => {
  // If all are null, reset everything
  if (rootSemitone === null && rootDisplay === null && scaleType === null) {
    selectKey(null, null, null)
    return
  }
  selectKey(rootSemitone, rootDisplay, scaleType)
}

// Handle chord type selection
const handleSelectChordType = (chordType) => {
  selectChordType(chordType)
}

// Handle chord selection
const handleSelectChord = (chordIndex) => {
  selectChord(chordIndex)
}

// Get human-readable scale name
const scaleTypeName = computed(() => {
  return selectedScaleType.value ? SCALE_NAMES[selectedScaleType.value] : ''
})

// Get current chord symbol
const currentChord = computed(() => {
  if (selectedScaleType.value === null || selectedChordIndex.value === null) {
    return ''
  }
  const chords = getScaleChords(selectedScaleType.value)
  return chords[selectedChordIndex.value] || ''
})
</script>

<style scoped>
.app-container {
  @apply min-h-screen relative;
  background-color: #1a1612;
}

.app-main {
  @apply max-w-7xl mx-auto px-4 py-8;
  position: relative;
  z-index: 1;
}

/* Scrolling banners */
.scroll-banner {
  position: fixed;
  width: 60px;
  height: 100vh;
  overflow: hidden;
  background-color: white;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-banner-left {
  left: 10px;
  top: 0;
}

.scroll-banner-left .banner-content {
  animation: scrollUpLeft 60s linear infinite;
  transform: rotate(-90deg);
  padding: 0 5px;
}

.scroll-banner-right {
  right: 10px;
  top: 0;
}

.scroll-banner-right .banner-content {
  animation: scrollUpRight 60s linear infinite;
  transform: rotate(90deg);
  padding: 0 5px;
}

.banner-content {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1612;
  white-space: nowrap;
  transform-origin: center center;
  line-height: 1;
}

.banner-content span {
  display: inline;
}

@keyframes scrollUpLeft {
  0% {
    transform: rotate(-90deg) translateX(0);
  }
  100% {
    transform: rotate(-90deg) translateX(-400%);
  }
}

@keyframes scrollUpRight {
  0% {
    transform: rotate(90deg) translateX(0);
  }
  100% {
    transform: rotate(90deg) translateX(-400%);
  }
}

.selection-info {
  @apply mt-3 flex justify-center;
}

.info-card {
  @apply px-6 py-4 text-center;
}

.info-label {
  @apply text-sm text-gray-400 mr-2;
}

.info-value {
  @apply text-lg font-semibold text-gray-100;
}

.info-chord {
  @apply text-lg font-semibold text-green-400 ml-1;
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
