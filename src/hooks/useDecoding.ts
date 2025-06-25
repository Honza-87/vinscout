
import { useState, useCallback } from 'react';

export const useDecoding = () => {
  const [isDecoding, setIsDecoding] = useState(false);
  const [decodingProgress, setDecodingProgress] = useState(0);

  const performDecode = useCallback(async (extractedVins: string[], onVehiclesDecoded: (vins: string[]) => void) => {
    if (extractedVins.length === 0) return;

    setIsDecoding(true);
    setDecodingProgress(0);

    // Simulate decoding process
    for (let i = 0; i <= 100; i += 5) {
      setDecodingProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    onVehiclesDecoded(extractedVins);
    setIsDecoding(false);
    setDecodingProgress(0);
  }, []);

  return {
    isDecoding,
    decodingProgress,
    performDecode
  };
};
