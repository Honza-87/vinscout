
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FileDropzone } from "./upload/FileDropzone";
import { UploadedFilesList } from "./upload/UploadedFilesList";
import { ExtractionResults } from "./upload/ExtractionResults";
import { ManualVehicleEntry } from "./upload/ManualVehicleEntry";

interface ExtractedFile {
  file: File;
  status: 'processing' | 'success' | 'error';
  progress: number;
  extractedVins: string[];
}

interface FileUploadProps {
  uploadedFiles: File[];
  onFilesUploaded: (files: File[]) => void;
  extractedFiles: ExtractedFile[];
  onExtract: () => void;
  isExtracting: boolean;
  onUpdateExtractedVin: (fileIndex: number, vinIndex: number, newVin: string) => void;
  onAddManualVehicle: (vin: string) => void;
  onRemoveManualVehicle: (vin: string) => void;
  hasExtracted: boolean;
}

export const FileUpload = ({
  uploadedFiles,
  onFilesUploaded,
  extractedFiles,
  onExtract,
  isExtracting,
  onUpdateExtractedVin,
  onAddManualVehicle,
  onRemoveManualVehicle,
  hasExtracted
}: FileUploadProps) => {
  const { t } = useLanguage();

  return (
    <Card className="border-2 border-orange-200 shadow-lg rounded-lg">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          {t('documentUploadAndExtraction')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - File Upload */}
          <div className="space-y-6">
            <FileDropzone 
              onFilesUploaded={onFilesUploaded}
              uploadedFiles={uploadedFiles}
            />

            <UploadedFilesList 
              uploadedFiles={uploadedFiles}
              isExtracting={isExtracting}
              onExtract={onExtract}
            />

            <ExtractionResults 
              extractedFiles={extractedFiles}
              hasExtracted={hasExtracted}
              uploadedFiles={uploadedFiles}
              onUpdateExtractedVin={onUpdateExtractedVin}
            />
          </div>

          {/* Right Column - Manual Vehicle Addition */}
          <ManualVehicleEntry 
            extractedFiles={extractedFiles}
            onAddManualVehicle={onAddManualVehicle}
            onRemoveManualVehicle={onRemoveManualVehicle}
          />
        </div>
      </CardContent>
    </Card>
  );
};
