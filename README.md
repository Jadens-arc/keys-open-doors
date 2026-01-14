# Keys Open Doors

A Vue 3 piano learning application to help you visualize scales and chords across different keys and modes.

## Features

- **Key Selection**: Choose from 12 root notes across 5 scale types (Major, Natural Minor, Harmonic Minor, Melodic Minor, Phrygian)
- **Scale Visualization**: See all notes in a scale highlighted on a 2-octave piano (C3-C5)
- **Chord Exploration**: Select chords within the scale to see their component notes
- **Roman Numeral Notation**: Learn chord progressions using standard Roman numeral notation
- **Interactive UI**: Built with PrimeVue components and styled with Tailwind CSS 4

## Technology Stack

- **Vue 3** with Composition API
- **Vite** for fast development and building
- **PrimeVue 4** for UI components
- **Tailwind CSS 4** for styling
- **Music Theory Utilities** for scale and chord calculations

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How to Use

1. **Select a Key**: Click on any note + scale type combination in the key selector grid
2. **View the Scale**: The piano will highlight all notes in the selected scale in blue
3. **Select a Chord**: Click on a Roman numeral chord button to see the chord notes in green
4. **Explore**: Notes in the scale but not in the selected chord will appear dimmed

## Project Structure

```
keys-open-doors/
├── src/
│   ├── components/
│   │   ├── KeySelector.vue       # Grid of key selection buttons
│   │   ├── ChordSelector.vue     # Roman numeral chord buttons
│   │   ├── Piano.vue             # 2-octave piano display
│   │   └── PianoKey.vue          # Individual piano key
│   ├── composables/
│   │   ├── useMusicTheory.js     # Music theory calculations
│   │   └── useKeyboardState.js   # State management
│   ├── utils/
│   │   ├── scales.js             # Scale definitions
│   │   ├── chords.js             # Chord formulas
│   │   └── notes.js              # Note utilities
│   ├── styles/
│   │   └── main.css              # Tailwind CSS config
│   ├── App.vue                   # Main application
│   └── main.js                   # Entry point
```

## Music Theory Reference

### Scale Types

- **Major**: W-W-H-W-W-W-H
- **Natural Minor**: W-H-W-W-H-W-W
- **Harmonic Minor**: W-H-W-W-H-WH-H
- **Melodic Minor**: W-H-W-W-W-W-H
- **Phrygian**: H-W-W-W-H-W-W

### Chord Qualities

- **Uppercase Roman Numerals** (I, IV, V): Major chords
- **Lowercase Roman Numerals** (ii, iii, vi): Minor chords
- **° (Diminished)**: (vii°)
- **+ (Augmented)**: (III+)

## License

MIT
