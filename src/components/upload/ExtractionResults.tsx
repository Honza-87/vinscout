
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, Edit3 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ExtractedFile {
  file: File;
  status: 'processing' | 'success' | 'error';
  progress: number;
  extractedVins: string[];
}

interface ExtractionResultsProps {
  extractedFiles: ExtractedFile[];
  hasExtracted: boolean;
  uploadedFiles: File[];
  onUpdateExtractedVin: (fileIndex: number, vinIndex: number, newVin: string) => void;
}

export const ExtractionResults = ({ extractedFiles, hasExtracted, uploadedFiles, onUpdateExtractedVin }: ExtractionResultsProps) => {
  const { t } = useLanguage();
  const [editingVin, setEditingVin] = useState<{fileIndex: number, vinIndex: number} | null>(null);
  const [editValue, setEditValue] = useState("");

  const getFileIcon = (fileName: string) => {
    if (fileName.toLowerCase().includes('.pdf')) return "📄";
    if (fileName.toLowerCase().includes('.xls') || fileName.toLowerCase().includes('.xlsx')) return "📊";
    if (fileName.toLowerCase().includes('.doc') || fileName.toLowerCase().includes('.docx')) return "📝";
    return "📄";
  };

  const handleEditVin = (fileIndex: number, vinIndex: number) => {
    setEditingVin({ fileIndex, vinIndex });
    setEditValue(extractedFiles[fileIndex].extractedVins[vinIndex]);
  };

  const handleSaveEdit = () => {
    if (editingVin && editValue.trim()) {
      onUpdateExtractedVin(editingVin.fileIndex, editingVin.vinIndex, editValue.trim());
      setEditingVin(null);
      setEditValue("");
    }
  };

  const handleCancelEdit = () => {
    setEditingVin(null);
    setEditValue("");
  };

  if (!hasExtracted || uploadedFiles.length === 0 || extractedFiles.filter(f => f.file.name !== 'Manual Entry').length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-gray-700">{t('extractionResults')}</h4>
      {extractedFiles.filter(f => f.file.name !== 'Manual Entry').map((extractedFile, fileIndex) => (
        <div key={fileIndex} className="p-4 border rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{getFileIcon(extractedFile.file.name)}</span>
            <div className="flex-1">
              <p className="font-medium text-sm">{extractedFile.file.name}</p>
              <div className="flex items-center gap-2 mt-1">
                {extractedFile.status === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
                {extractedFile.status === 'error' && <XCircle className="h-4 w-4 text-red-500" />}
                <span className={`text-xs ${
                  extractedFile.status === 'success' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {extractedFile.status === 'success' 
                    ? `${extractedFile.extractedVins.length} ${t('vinsFound')}` 
                    : t('noVinsFound')
                  }
                </span>
              </div>
            </div>
          </div>
          
          {extractedFile.extractedVins.length > 0 && (
            <div className="space-y-2">
              {extractedFile.extractedVins.map((vin, vinIndex) => (
                <div key={vinIndex} className="flex items-center gap-2">
                  {editingVin?.fileIndex === fileIndex && editingVin?.vinIndex === vinIndex ? (
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="flex-1"
                      />
                      <Button size="sm" onClick={handleSaveEdit}>Save</Button>
                      <Button size="sm" variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                    </div>
                  ) : (
                    <>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm flex-1">{vin}</code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditVin(fileIndex, vinIndex)}
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {extractedFile.status === 'processing' && (
            <div className="mt-3">
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${extractedFile.progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{extractedFile.progress}% {t('processing')}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
