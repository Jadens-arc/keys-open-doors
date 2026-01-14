<template>
  <div
    :class="keyClasses"
    :style="keyStyles"
    :title="fullNote"
  >
    <span v-if="showLabel" class="key-label">
      {{ note }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  note: {
    type: String,
    required: true
  },
  octave: {
    type: Number,
    required: true
  },
  isBlack: {
    type: Boolean,
    default: false
  },
  highlighted: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: false
  },
  dimmed: {
    type: Boolean,
    default: false
  },
  notInScale: {
    type: Boolean,
    default: false
  },
  showLabel: {
    type: Boolean,
    default: false
  }
})

const fullNote = computed(() => `${props.note}${props.octave}`)

const keyClasses = computed(() => {
  const classes = []
  
  if (props.isBlack) {
    classes.push('piano-key-black')
    if (props.active) {
      classes.push('piano-key-active')
    } else if (props.highlighted) {
      classes.push('piano-key-highlighted')
    }
  } else {
    classes.push('piano-key-white')
    if (props.active) {
      classes.push('piano-key-active')
    } else if (props.highlighted) {
      classes.push('piano-key-highlighted')
    }
  }
  
  if (props.dimmed) {
    classes.push('piano-key-dimmed')
  }
  
  if (props.notInScale) {
    classes.push('piano-key-not-in-scale')
  }
  
  return classes.join(' ')
})

const keyStyles = computed(() => {
  if (props.isBlack) {
    return {
      width: '40px',
      height: '120px',
      position: 'absolute',
      zIndex: 2
    }
  }
  return {
    width: '60px',
    height: '200px',
    position: 'relative',
    zIndex: 1
  }
})
</script>

<style scoped>
.key-label {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  font-weight: 600;
  color: #374151;
  user-select: none;
}

.piano-key-black .key-label {
  color: #9ca3af;
}
</style>
