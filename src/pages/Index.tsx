
import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { InsuranceForm } from "@/components/InsuranceForm";
import { ResultsSection } from "@/components/ResultsSection";
import { AdminPanel } from "@/components/AdminPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState("");
  const [processCompleted, setProcessCompleted] = useState(false);

  const handleProcess = async () => {
    if (uploadedFiles.length === 0) return;
    
    setIsProcessing(true);
    setProcessingProgress(0);
    setProcessCompleted(false);
    
    // Simulate OCR processing
    setProcessingStage("Running OCR...");
    for (let i = 0; i <= 33; i++) {
      setProcessingProgress(i);
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    // Simulate VIN extraction
    setProcessingStage("Extracting VIN numbers...");
    for (let i = 33; i <= 66; i++) {
      setProcessingProgress(i);
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    // Simulate CEBIA data collection
    setProcessingStage("Collecting vehicle data from CEBIA...");
    for (let i = 66; i <= 100; i++) {
      setProcessingProgress(i);
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    // Mock extracted vehicle data
    const mockVehicles = [
      {
        id: Date.now(),
        vin: "WBAVA31030NL12345",
        licensePlate: "ABC-1234",
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
      }
    ];
    
    setVehicles(mockVehicles);
    setProcessCompleted(true);
    setIsProcessing(false);
    setProcessingStage("");
  };

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
                  onFilesUploaded={setUploadedFiles}
                  uploadedFiles={uploadedFiles}
                  onProcess={handleProcess}
                  isProcessing={isProcessing}
                  processingProgress={processingProgress}
                  processingStage={processingStage}
                  processCompleted={processCompleted}
                />
              </div>
              
              <div className="space-y-6">
                <InsuranceForm 
                  formData={formData}
                  onFormDataChange={setFormData}
                />
              </div>
            </div>

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
