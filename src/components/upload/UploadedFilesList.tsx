
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface UploadedFilesListProps {
  uploadedFiles: File[];
  isExtracting: boolean;
  onExtract: () => void;
}

export const UploadedFilesList = ({ uploadedFiles, isExtracting, onExtract }: UploadedFilesListProps) => {
  const { t } = useLanguage();

  const getFileIcon = (fileName: string) => {
    if (fileName.toLowerCase().includes('.pdf')) return "📄";
    if (fileName.toLowerCase().includes('.xls') || fileName.toLowerCase().includes('.xlsx')) return "📊";
    if (fileName.toLowerCase().includes('.doc') || fileName.toLowerCase().includes('.docx')) return "📝";
    return "📄";
  };

  if (uploadedFiles.length === 0) return null;

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-gray-700">{t('uploadedFiles')}</h4>
      {uploadedFiles.map((file, index) => (
        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <span className="text-2xl">{getFileIcon(file.name)}</span>
          <div className="flex-1">
            <p className="font-medium text-sm">{file.name}</p>
            <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        </div>
      ))}
      
      <Button 
        onClick={onExtract}
        disabled={isExtracting}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white"
      >
        {isExtracting ? t('extracting') : t('extractVins')}
      </Button>
    </div>
  );
};
