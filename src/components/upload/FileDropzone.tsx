
import { Upload } from "lucide-react";
import { useDropzone } from 'react-dropzone';
import { useLanguage } from "@/contexts/LanguageContext";

interface FileDropzoneProps {
  onFilesUploaded: (files: File[]) => void;
  uploadedFiles: File[];
}

export const FileDropzone = ({ onFilesUploaded, uploadedFiles }: FileDropzoneProps) => {
  const { t } = useLanguage();
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    onDrop: (acceptedFiles) => {
      onFilesUploaded([...uploadedFiles, ...acceptedFiles]);
    }
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-orange-400 bg-orange-50' : 'border-gray-300 hover:border-orange-400'
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
      {isDragActive ? (
        <p className="text-orange-600">{t('dropFiles')}...</p>
      ) : (
        <div>
          <p className="text-gray-600 mb-2">
            {t('dropFiles')}
          </p>
          <p className="text-sm text-gray-500">
            {t('supportedFormats')}
          </p>
        </div>
      )}
    </div>
  );
};
