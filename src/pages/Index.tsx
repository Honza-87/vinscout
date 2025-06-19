import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { InsuranceForm } from "@/components/InsuranceForm";
import { ResultsSection } from "@/components/ResultsSection";
import { AdminPanel } from "@/components/AdminPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertTriangle, X, Zap } from "lucide-react";

interface ExtractedFile {
  file: File;
  status: 'processing' | 'success' | 'error';
  progress: number;
  extractedVins: string[];
}

const Index = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [extractedFiles, setExtractedFiles] = useState<ExtractedFile[]>([]);
  const [hasExtracted, setHasExtracted] = useState(false);
  const [formData, setFormData] = useState({
    insurerTin: "",
    email: "",
    phone: "",
    startOfInsurance: "",
    participation: "fixed",
    fixedParticipation: "100mil", // Changed to recommended standard
    percentageParticipation: "min",
    mandatoryInsurance: true, // Set to true by default
    accidentInsurance: false,
    injuryInsurance: false,
    windowsInsurance: "0",
    animalCollisions: false,
    luggage: false,
    assistanceServices: false,
    vandalism: false
  });
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isDecoding, setIsDecoding] = useState(false);
  const [decodingProgress, setDecodingProgress] = useState(0);
  const [showUnextractedDialog, setShowUnextractedDialog] = useState(false);

  const handleExtract = async () => {
    if (uploadedFiles.length === 0) return;
    
    setIsExtracting(true);
    setHasExtracted(true); // Set extraction flag
    
    // Keep existing manual entries when adding new files
    const existingManualEntry = extractedFiles.find(f => f.file.name === 'Manual Entry');
    const newExtractedFiles: ExtractedFile[] = uploadedFiles.map(file => ({
      file,
      status: 'processing' as const,
      progress: 0,
      extractedVins: []
    }));
    
    // Add back the manual entry if it exists
    if (existingManualEntry) {
      newExtractedFiles.push(existingManualEntry);
    }
    
    setExtractedFiles(newExtractedFiles);

    // Process each uploaded file (not the manual entry)
    for (let i = 0; i < uploadedFiles.length; i++) {
      const extractedFile = newExtractedFiles[i];
      
      // Simulate extraction progress
      for (let progress = 0; progress <= 100; progress += 10) {
        extractedFile.progress = progress;
        setExtractedFiles([...newExtractedFiles]);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      // Simulate extraction result based on file type
      const isPdf = extractedFile.file.type === 'application/pdf';
      let mockVins: string[] = [];
      
      if (Math.random() > 0.2) { // 80% success rate
        if (isPdf) {
          // Only one VIN per PDF
          mockVins = ["WBAVA31030NL12345"];
        } else {
          // Multiple VINs/plates for XLS/DOC files
          mockVins = ["WBAVA31030NL12345", "1HGBH41JXMN109186", "ABC-1234"];
        }
      }
      
      extractedFile.extractedVins = mockVins;
      extractedFile.status = mockVins.length > 0 ? 'success' : 'error';
      setExtractedFiles([...newExtractedFiles]);
    }
    
    setIsExtracting(false);
  };

  const handleDecode = async () => {
    // Check if there are unextracted files
    const unextractedFiles = uploadedFiles.filter(file => {
      const extractedFile = extractedFiles.find(ef => ef.file.name === file.name);
      return !extractedFile || extractedFile.status === 'processing';
    });

    if (unextractedFiles.length > 0) {
      setShowUnextractedDialog(true);
      return;
    }

    await performDecode();
  };

  const performDecode = async () => {
    // Collect all VINs from extracted files and manual additions
    const allVins: string[] = [];
    extractedFiles.forEach(file => {
      allVins.push(...file.extractedVins);
    });

    if (allVins.length === 0) return;

    setIsDecoding(true);
    setDecodingProgress(0);

    // Simulate CEBIA data collection
    for (let i = 0; i <= 100; i += 5) {
      setDecodingProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Create vehicles from all VINs
    const newVehicles = allVins.map((vinOrPlate, index) => {
      const isVin = vinOrPlate.length === 17;
      return {
        id: Date.now() + index,
        vin: isVin ? vinOrPlate : "",
        licensePlate: isVin ? "" : vinOrPlate,
        mileage: "",
        vehicleValue: "",
        mandatoryInsurance: false,
        accidentInsurance: false,
        injuryInsurance: false,
        windowsInsurance: "10",
        ownerSameAsInsurer: true,
        operatorSameAsInsurer: true,
        ownerTin: "",
        operatorTin: "",
        cebia: {
          type: "Passenger Car",
          manufacturer: "BMW",
          model: "320d",
          engineDisplacement: "1995 cm³",
          enginePower: "140 kW",
          maxWeight: "1850 kg",
          year: "2020",
          seats: "5"
        }
      };
    });

    setVehicles(newVehicles);
    setIsDecoding(false);
    setDecodingProgress(0);
  };

  const handleExtractAndDecode = async () => {
    setShowUnextractedDialog(false);
    await handleExtract();
    setTimeout(async () => {
      await performDecode();
    }, 1000);
  };

  const handleProceedWithoutExtract = async () => {
    setShowUnextractedDialog(false);
    await performDecode();
  };

  const updateExtractedVin = (fileIndex: number, vinIndex: number, newVin: string) => {
    const updatedFiles = [...extractedFiles];
    updatedFiles[fileIndex].extractedVins[vinIndex] = newVin;
    setExtractedFiles(updatedFiles);
  };

  const addManualVehicle = async (vin: string) => {
    // Validate VIN or license plate
    const trimmedVin = vin.trim();
    
    if (trimmedVin.length === 17) {
      // It's a VIN
    } else if (trimmedVin.length === 7 || trimmedVin.length === 8) {
      // It's a license plate
    } else {
      // Invalid entry - don't add it
      return;
    }

    // Find or create manual entry file
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
  };

  const removeManualVehicle = (vinToRemove: string) => {
    const updatedFiles = [...extractedFiles];
    const manualFileIndex = updatedFiles.findIndex(f => f.file.name === 'Manual Entry');
    
    if (manualFileIndex >= 0) {
      updatedFiles[manualFileIndex].extractedVins = updatedFiles[manualFileIndex].extractedVins.filter(vin => vin !== vinToRemove);
      
      // If no VINs left, remove the manual entry file completely
      if (updatedFiles[manualFileIndex].extractedVins.length === 0) {
        updatedFiles.splice(manualFileIndex, 1);
      }
    }
    
    setExtractedFiles(updatedFiles);
  };

  const hasExtractedData = extractedFiles.some(f => f.extractedVins.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50">
      <div className="container mx-auto p-6">
        <header className="text-center mb-8 relative">
          <div className="absolute left-0 top-0">
            <img 
              src="/lovable-uploads/fe5d5630-7728-44c7-8b57-8cc5139a93e7.png" 
              alt="Petrisk Logo" 
              className="h-12 w-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-purple-800 mb-2">
            VinScout Document Processor
          </h1>
          <p className="text-lg text-gray-600">
            Professional automotive document processing for VIN and license plate extraction
          </p>
        </header>

        <Tabs defaultValue="processing" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 rounded-lg">
            <TabsTrigger value="processing" className="text-lg rounded-md">
              Document Processing
            </TabsTrigger>
            <TabsTrigger value="admin" className="text-lg rounded-md">
              Admin Panel
            </TabsTrigger>
          </TabsList>

          <TabsContent value="processing">
            {/* Insurance Details - Full Width */}
            <div className="mb-8">
              <InsuranceForm 
                formData={formData}
                onFormDataChange={setFormData}
              />
            </div>

            {/* Document Upload & VIN Extraction - Full Width with Two Columns */}
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
                  {isDecoding ? `Decoding... ${decodingProgress}%` : 'Decode'}
                </Button>
              </div>
            )}

            <ResultsSection 
              vehicles={vehicles}
              onVehiclesChange={setVehicles}
              formData={formData}
            />
          </TabsContent>

          <TabsContent value="admin">
            <AdminPanel />
          </TabsContent>
        </Tabs>

        {/* Unextracted Files Dialog */}
        <Dialog open={showUnextractedDialog} onOpenChange={setShowUnextractedDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  Unextracted Files
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
                There are files that haven't been extracted yet. What would you like to do?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2">
              <Button
                onClick={handleProceedWithoutExtract}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Decode
              </Button>
              <Button
                variant="outline"
                onClick={handleExtractAndDecode}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white border-orange-600"
              >
                <Zap className="h-4 w-4 mr-2" />
                Extract
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;
