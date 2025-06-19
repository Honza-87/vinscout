
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, X, Zap, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

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
}

export const FileUpload = ({ 
  uploadedFiles,
  onFilesUploaded, 
  extractedFiles,
  onExtract,
  isExtracting,
  onUpdateExtractedVin,
  onAddManualVehicle,
  onRemoveManualVehicle
}: FileUploadProps) => {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [manualInput, setManualInput] = useState("");

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

  const getFileBackgroundClass = (file: File) => {
    const extractedFile = extractedFiles.find(ef => ef.file.name === file.name);
    if (!extractedFile) return "bg-gray-50";
    
    switch (extractedFile.status) {
      case 'processing':
        return "bg-gray-100";
      case 'success':
        return "bg-green-50 border-green-200";
      case 'error':
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-gray-50";
    }
  };

  const handleManualAdd = () => {
    if (!manualInput.trim()) {
      toast.error("Please enter a VIN or license plate");
      return;
    }

    const cleanInput = manualInput.trim().toUpperCase();
    
    if (cleanInput.length === 17) {
      onAddManualVehicle(cleanInput);
      toast.success("VIN added successfully");
    } else if (cleanInput.length === 7 || (cleanInput.length === 8 && cleanInput.includes('-'))) {
      onAddManualVehicle(cleanInput);
      toast.success("License plate added successfully");
    } else {
      toast.error("Invalid format. Enter a 17-character VIN or 7-character license plate");
      return;
    }

    setManualInput("");
  };

  // Get all manually entered VINs
  const manualEntryFile = extractedFiles.find(f => f.file.name === 'Manual Entry');
  const manualVins = manualEntryFile?.extractedVins || [];

  return (
    <Card className="border-2 border-purple-200 shadow-lg rounded-lg">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Document Upload & VIN Extraction
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Document Upload */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg text-purple-800">Document Upload</h3>
            
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
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-700">Uploaded Files:</h4>
                  <Button 
                    onClick={onExtract} 
                    className="bg-orange-600 hover:bg-orange-700 rounded-md"
                    disabled={isExtracting}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    {isExtracting ? "Extracting..." : "Extract"}
                  </Button>
                </div>
                {uploadedFiles.map((file, index) => {
                  const extractedFile = extractedFiles.find(ef => ef.file.name === file.name);
                  return (
                    <div key={index} className={`p-3 rounded-lg border ${getFileBackgroundClass(file)}`}>
                      <div className="flex items-center justify-between mb-2">
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
                              <Progress value={uploadProgress[file.name]} className="h-2 rounded-full" />
                            </div>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700 rounded-md"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {extractedFile?.status === 'processing' && (
                        <div className="mt-2">
                          <Progress value={extractedFile.progress} className="h-2 rounded-full" />
                          <p className="text-xs text-gray-500 mt-1">Extracting VINs...</p>
                        </div>
                      )}
                      
                      {extractedFile?.extractedVins && extractedFile.extractedVins.length > 0 && (
                        <div className="mt-2 space-y-2">
                          <p className="text-sm font-medium text-green-700">Extracted VINs:</p>
                          {extractedFile.extractedVins.map((vin, vinIndex) => (
                            <Input
                              key={vinIndex}
                              value={vin}
                              onChange={(e) => onUpdateExtractedVin(index, vinIndex, e.target.value)}
                              className="text-sm rounded-md"
                              placeholder="VIN"
                            />
                          ))}
                        </div>
                      )}
                      
                      {extractedFile?.status === 'error' && (
                        <p className="text-sm text-yellow-700 mt-2">No VINs found in this document</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column - Manual Vehicle Addition */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg text-purple-800">Manual Vehicle Addition</h3>
            
            {/* Show all manually entered VINs */}
            {manualVins.length > 0 && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium text-green-700 mb-2">Added Vehicles:</p>
                <div className="space-y-2">
                  {manualVins.map((vin, index) => (
                    <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                      <span className="text-sm text-green-600 font-mono">{vin}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveManualVehicle(vin)}
                        className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Single manual input field */}
            <div className="space-y-2">
              <Input
                placeholder="Enter VIN (17 chars) or License Plate (7 chars)"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                className="rounded-md"
              />
              <Button onClick={handleManualAdd} className="w-full bg-purple-600 hover:bg-purple-700 rounded-md">
                <Plus className="h-4 w-4 mr-2" />
                Add Vehicle
              </Button>
            </div>
            
            <p className="text-sm text-gray-600">
              Auto-detects VIN (17 characters) or License Plate (7 characters)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
