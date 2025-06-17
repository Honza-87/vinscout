
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, X } from "lucide-react";
import { toast } from "sonner";

interface FileUploadProps {
  onFilesUploaded: (files: File[]) => void;
  uploadedFiles: File[];
}

export const FileUpload = ({ onFilesUploaded, uploadedFiles }: FileUploadProps) => {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Validate file types
    const validFiles = acceptedFiles.filter(file => {
      const validTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];
      
      if (!validTypes.includes(file.type)) {
        toast.error(`Invalid file type: ${file.name}`);
        return false;
      }
      
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        toast.error(`File too large: ${file.name}`);
        return false;
      }
      
      return true;
    });

    if (validFiles.length > 0) {
      onFilesUploaded([...uploadedFiles, ...validFiles]);
      
      // Simulate upload progress
      validFiles.forEach(file => {
        simulateUploadProgress(file.name);
      });
      
      toast.success(`${validFiles.length} file(s) uploaded successfully`);
    }
  }, [uploadedFiles, onFilesUploaded]);

  const simulateUploadProgress = (fileName: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setUploadProgress(prev => ({ ...prev, [fileName]: progress }));
    }, 500);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxSize: 50 * 1024 * 1024
  });

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    onFilesUploaded(newFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="border-2 border-purple-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-orange-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Document Upload
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-purple-400 bg-purple-50"
              : "border-gray-300 hover:border-purple-400 hover:bg-purple-50"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          {isDragActive ? (
            <p className="text-purple-600 font-medium">Drop the files here...</p>
          ) : (
            <>
              <p className="text-gray-600 mb-2">
                Drag & drop files here, or{" "}
                <span className="text-purple-600 font-medium">browse files</span>
              </p>
              <p className="text-sm text-gray-500">
                Supports PDF, DOCX, XLSX (max 50MB)
              </p>
            </>
          )}
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="font-medium text-gray-700">Uploaded Files:</h4>
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                      {file.type === 'application/pdf' && ' • PDF'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {uploadProgress[file.name] && uploadProgress[file.name] < 100 && (
                    <div className="w-24">
                      <Progress value={uploadProgress[file.name]} className="h-2" />
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
