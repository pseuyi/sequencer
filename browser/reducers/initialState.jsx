
const initialState = {
  screenWidth: typeof window === 'object' ? window.innerWidth : null,
  isPlaying: false,
  events: [],
  sampleBrush: null,
  edit: false, 
  filterBrush: null,
  patternPageOpen: false
  }

export default initialState;

// sample event: {key: 1, sample: '/pesh_arp.wav', coord: position.z}
