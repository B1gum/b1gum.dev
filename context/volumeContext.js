import { createContext, useContext, useState } from 'react';

const VolumeContext = createContext({
  volume: 1,
  setVolume: () => {}
});

export function VolumeProvider({ children }) {
  const [volume, setVolume] = useState(1);
  return (
    <VolumeContext.Provider value={{ volume, setVolume }}>
      {children}
    </VolumeContext.Provider>
  );
}

// custom hook for easy access
export function useVolume() {
  return useContext(VolumeContext);
}
