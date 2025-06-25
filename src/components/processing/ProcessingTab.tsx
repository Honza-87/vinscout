
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { AlertTriangle, X, Zap } from 'lucide-react';
import { InsuranceForm } from '@/components/InsuranceForm';
import { FileUpload } from '@/components/FileUpload';
import { ResultsSection } from '@/components/ResultsSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { useVehicles } from '@/hooks/useVehicles';
import { useFileProcessing } from '@/hooks/useFileProcessing';
import { useDecoding } from '@/hooks/useDecoding';
import { InsuranceFormData } from '@/types';

interface ProcessingTabProps {
  formData: InsuranceFormData;
  onFormDataChange: (data: InsuranceFormData) => void;
}

export const ProcessingTab = ({ formData, onFormDataChange }: ProcessingTabProps) => {
  const { t } = useLanguage();
  const {
    vehicles,
    addVehicles,
    toggleIndividualCoverage,
    updateVehicleInsurance,
    setVehicles
  } = useVehicles();

  const {
    uploadedFiles,
    setUploadedFiles,
    extractedFiles,
    hasExtracted,
    isExtracting,
    handleExtract,
    updateExtractedVin,
    addManualVehicle,
    removeManualVehicle
  } = useFileProcessing();

  const { isDecoding, decodingProgress, performDecode } = useDecoding();
  const [showUnextractedDialog, setShowUnextractedDialog] = React.useState(false);

  const handleDecode = async () => {
    const unextractedFiles = uploadedFiles.filter(file => {
      const extractedFile = extractedFiles.find(ef => ef.file.name === file.name);
      return !extractedFile || extractedFile.status === 'processing';
    });

    if (unextractedFiles.length > 0) {
      setShowUnextractedDialog(true);
      return;
    }

    const allVins: string[] = [];
    extractedFiles.forEach(file => {
      allVins.push(...file.extractedVins);
    });

    await performDecode(allVins, addVehicles);
  };

  const handleExtractAndDecode = async () => {
    setShowUnextractedDialog(false);
    await handleExtract();
    setTimeout(async () => {
      const allVins: string[] = [];
      extractedFiles.forEach(file => {
        allVins.push(...file.extractedVins);
      });
      await performDecode(allVins, addVehicles);
    }, 1000);
  };

  const handleProceedWithoutExtract = async () => {
    setShowUnextractedDialog(false);
    const allVins: string[] = [];
    extractedFiles.forEach(file => {
      allVins.push(...file.extractedVins);
    });
    await performDecode(allVins, addVehicles);
  };

  const hasExtractedData = extractedFiles.some(f => f.extractedVins.length > 0);

  return (
    <>
      <div className="mb-8">
        <InsuranceForm 
          formData={formData}
          onFormDataChange={onFormDataChange}
        />
      </div>

      <div className="mb-8">
        <FileUpload 
          uploadedFiles={uploadedFiles}
          onFilesUploaded={setUploadedFiles}
          extractedFiles={extractedFiles}
          onExtract={handleExtract}
          isExtracting={isExtracting}
          onUpdateExtractedVin={updateExtractedVin}
          onAddManualVehicle={addManualVehicle}
          onRemoveManualVehicle={removeManualVehicle}
          hasExtracted={hasExtracted}
        />
      </div>

      {hasExtractedData && (
        <div className="mb-8">
          <Button 
            onClick={handleDecode}
            disabled={isDecoding}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg rounded-lg"
          >
            {isDecoding ? `${t('decoding')} ${decodingProgress}%` : 'DECODE'}
          </Button>
        </div>
      )}

      <ResultsSection 
        vehicles={vehicles}
        onVehiclesChange={setVehicles}
        formData={formData}
      />

      <Dialog open={showUnextractedDialog} onOpenChange={setShowUnextractedDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                {t('unextractedFiles')}
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUnextractedDialog(false)}
                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>
              {t('unextractedFilesDesc')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button
              onClick={handleProceedWithoutExtract}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              DECODE
            </Button>
            <Button
              variant="outline"
              onClick={handleExtractAndDecode}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white border-orange-600"
            >
              <Zap className="h-4 w-4 mr-2" />
              {t('extract')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
