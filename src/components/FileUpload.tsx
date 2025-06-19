
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, CheckCircle, XCircle, Edit3, Plus, Trash2 } from "lucide-react";
import { useDropzone } from 'react-dropzone';

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
  const [newVin, setNewVin] = useState("");
  const [editingVin, setEditingVin] = useState<{fileIndex: number, vinIndex: number} | null>(null);
  const [editValue, setEditValue] = useState("");

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

  const handleAddManualVehicle = () => {
    if (newVin.trim()) {
      onAddManualVehicle(newVin.trim());
      setNewVin("");
    }
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

  const getFileIcon = (fileName: string) => {
    if (fileName.toLowerCase().includes('.pdf')) return "📄";
    if (fileName.toLowerCase().includes('.xls') || fileName.toLowerCase().includes('.xlsx')) return "📊";
    if (fileName.toLowerCase().includes('.doc') || fileName.toLowerCase().includes('.docx')) return "📝";
    return "📄";
  };

  const manualEntryFile = extractedFiles.find(f => f.file.name === 'Manual Entry');

  return (
    <Card className="border-2 border-orange-200 shadow-lg rounded-lg">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Document Upload & VIN Extraction
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - File Upload */}
          <div className="space-y-6">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-orange-400 bg-orange-50' : 'border-gray-300 hover:border-orange-400'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              {isDragActive ? (
                <p className="text-orange-600">Drop the files here...</p>
              ) : (
                <div>
                  <p className="text-gray-600 mb-2">
                    Drag & drop documents here, or click to select
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports PDF, Excel (.xls, .xlsx), Word (.doc, .docx)
                  </p>
                </div>
              )}
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-700">Uploaded Files:</h4>
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
                  {isExtracting ? 'Extracting...' : 'Extract VINs'}
                </Button>
              </div>
            )}

            {/* Extraction Results */}
            {extractedFiles.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-700">Extraction Results:</h4>
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
                              ? `${extractedFile.extractedVins.length} VIN(s) found` 
                              : 'No VINs found'
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
                        <p className="text-xs text-gray-500 mt-1">{extractedFile.progress}% complete</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Manual Vehicle Addition */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Manual Vehicle Addition</h4>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter VIN or License Plate"
                  value={newVin}
                  onChange={(e) => setNewVin(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddManualVehicle()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleAddManualVehicle}
                  disabled={!newVin.trim()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Manual entries display */}
            {manualEntryFile && manualEntryFile.extractedVins.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-700">Manual Entries:</h4>
                <div className="space-y-2">
                  {manualEntryFile.extractedVins.map((vin, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                      <code className="bg-white px-2 py-1 rounded text-sm flex-1">{vin}</code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onRemoveManualVehicle(vin)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
