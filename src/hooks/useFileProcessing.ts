
import { useState, useCallback } from 'react';
import { ExtractedFile } from '@/types';

export const useFileProcessing = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [extractedFiles, setExtractedFiles] = useState<ExtractedFile[]>([]);
  const [hasExtracted, setHasExtracted] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);

  const handleExtract = useCallback(async () => {
    if (uploadedFiles.length === 0) return;
    
    setIsExtracting(true);
    setHasExtracted(true);
    
    const existingManualEntry = extractedFiles.find(f => f.file.name === 'Manual Entry');
    const newExtractedFiles: ExtractedFile[] = uploadedFiles.map(file => ({
      file,
      status: 'processing' as const,
      progress: 0,
      extractedVins: []
    }));
    
    if (existingManualEntry) {
      newExtractedFiles.push(existingManualEntry);
    }
    
    setExtractedFiles(newExtractedFiles);

    // Simulate extraction process
    for (let i = 0; i < uploadedFiles.length; i++) {
      const extractedFile = newExtractedFiles[i];
      
      for (let progress = 0; progress <= 100; progress += 10) {
        extractedFile.progress = progress;
        setExtractedFiles([...newExtractedFiles]);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      const isPdf = extractedFile.file.type === 'application/pdf';
      let mockVins: string[] = [];
      
      if (Math.random() > 0.2) {
        if (isPdf) {
          mockVins = ["WBAVA31030NL12345"];
        } else {
          mockVins = ["WBAVA31030NL12345", "1HGBH41JXMN109186", "ABC-1234"];
        }
      }
      
      extractedFile.extractedVins = mockVins;
      extractedFile.status = mockVins.length > 0 ? 'success' : 'error';
      setExtractedFiles([...newExtractedFiles]);
    }
    
    setIsExtracting(false);
  }, [uploadedFiles, extractedFiles]);

  const updateExtractedVin = useCallback((fileIndex: number, vinIndex: number, newVin: string) => {
    const updatedFiles = [...extractedFiles];
    updatedFiles[fileIndex].extractedVins[vinIndex] = newVin;
    setExtractedFiles(updatedFiles);
  }, [extractedFiles]);

  const addManualVehicle = useCallback(async (vin: string) => {
    const trimmedVin = vin.trim();
    
    if (trimmedVin.length !== 17 && trimmedVin.length !== 7 && trimmedVin.length !== 8) {
      return;
    }

    const updatedFiles = [...extractedFiles];
    const manualFileIndex = updatedFiles.findIndex(f => f.file.name === 'Manual Entry');
    
    if (manualFileIndex >= 0) {
      updatedFiles[manualFileIndex].extractedVins.push(trimmedVin);
    } else {
      updatedFiles.push({
        file: new File([], 'Manual Entry'),
        status: 'success',
        progress: 100,
        extractedVins: [trimmedVin]
      });
    }
    
    setExtractedFiles(updatedFiles);
  }, [extractedFiles]);

  const removeManualVehicle = useCallback((vinToRemove: string) => {
    const updatedFiles = [...extractedFiles];
    const manualFileIndex = updatedFiles.findIndex(f => f.file.name === 'Manual Entry');
    
    if (manualFileIndex >= 0) {
      updatedFiles[manualFileIndex].extractedVins = updatedFiles[manualFileIndex].extractedVins.filter(vin => vin !== vinToRemove);
      
      if (updatedFiles[manualFileIndex].extractedVins.length === 0) {
        updatedFiles.splice(manualFileIndex, 1);
      }
    }
    
    setExtractedFiles(updatedFiles);
  }, [extractedFiles]);

  return {
    uploadedFiles,
    setUploadedFiles,
    extractedFiles,
    setExtractedFiles,
    hasExtracted,
    isExtracting,
    handleExtract,
    updateExtractedVin,
    addManualVehicle,
    removeManualVehicle
  };
};
