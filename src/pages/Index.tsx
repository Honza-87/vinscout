import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { InsuranceForm } from "@/components/InsuranceForm";
import { ResultsSection } from "@/components/ResultsSection";
import { AdminPanel } from "@/components/AdminPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface ExtractedFile {
  file: File;
  status: 'processing' | 'success' | 'error';
  progress: number;
  extractedVins: string[];
}

const Index = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [extractedFiles, setExtractedFiles] = useState<ExtractedFile[]>([]);
  const [formData, setFormData] = useState({
    insurerTin: "",
    ownerSameAsInsurer: true,
    ownerTin: "",
    startOfInsurance: "",
    participation: "fixed",
    fixedParticipation: "0",
    percentageParticipation: "min"
  });
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isDecoding, setIsDecoding] = useState(false);
  const [decodingProgress, setDecodingProgress] = useState(0);

  const handleExtract = async () => {
    if (uploadedFiles.length === 0) return;
    
    setIsExtracting(true);
    const newExtractedFiles: ExtractedFile[] = uploadedFiles.map(file => ({
      file,
      status: 'processing' as const,
      progress: 0,
      extractedVins: []
    }));
    
    setExtractedFiles(newExtractedFiles);

    // Process each file
    for (let i = 0; i < newExtractedFiles.length; i++) {
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
    const newVehicles = allVins.map((vin, index) => ({
      id: Date.now() + index,
      vin,
      licensePlate: "",
      mileage: "",
      vehicleValue: "",
      mandatoryInsurance: false,
      accidentInsurance: false,
      injuryInsurance: false,
      windowsInsurance: "10",
      ownerTin: formData.ownerSameAsInsurer ? "" : "",
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
    }));

    setVehicles(newVehicles);
    setIsDecoding(false);
    setDecodingProgress(0);
  };

  const updateExtractedVin = (fileIndex: number, vinIndex: number, newVin: string) => {
    const updatedFiles = [...extractedFiles];
    updatedFiles[fileIndex].extractedVins[vinIndex] = newVin;
    setExtractedFiles(updatedFiles);
  };

  const addManualVehicle = async (vin: string) => {
    // Simulate CEBIA data collection for manual entry
    const newExtracted = [...extractedFiles];
    const manualFileIndex = newExtracted.findIndex(f => f.file.name === 'Manual Entry');
    
    if (manualFileIndex >= 0) {
      newExtracted[manualFileIndex].extractedVins.push(vin);
    } else {
      newExtracted.push({
        file: new File([], 'Manual Entry'),
        status: 'success',
        progress: 100,
        extractedVins: [vin]
      });
    }
    
    setExtractedFiles(newExtracted);
  };

  const hasExtractedData = extractedFiles.some(f => f.extractedVins.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50">
      <div className="container mx-auto p-6">
        <header className="text-center mb-8">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <FileUpload 
                  uploadedFiles={uploadedFiles}
                  onFilesUploaded={setUploadedFiles}
                  extractedFiles={extractedFiles}
                  onExtract={handleExtract}
                  isExtracting={isExtracting}
                  onUpdateExtractedVin={updateExtractedVin}
                  onAddManualVehicle={addManualVehicle}
                />
              </div>
              
              <div className="space-y-6">
                <InsuranceForm 
                  formData={formData}
                  onFormDataChange={setFormData}
                />
              </div>
            </div>

            {hasExtractedData && (
              <div className="mb-8">
                <Button 
                  onClick={handleDecode}
                  disabled={isDecoding}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg rounded-lg"
                >
                  {isDecoding ? `Decoding... ${decodingProgress}%` : 'Decode Vehicle Data from CEBIA'}
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
      </div>
    </div>
  );
};

export default Index;
