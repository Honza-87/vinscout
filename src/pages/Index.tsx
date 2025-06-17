
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
    percentageParticipation: "3%"
  });
  const [vehicles, setVehicles] = useState<any[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50">
      <div className="container mx-auto p-6">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">
            Fleeto Document Processor
          </h1>
          <p className="text-lg text-gray-600">
            Professional automotive document processing for VIN and license plate extraction
          </p>
        </header>

        <Tabs defaultValue="processing" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="processing" className="text-lg">
              Document Processing
            </TabsTrigger>
            <TabsTrigger value="admin" className="text-lg">
              Admin Panel
            </TabsTrigger>
          </TabsList>

          <TabsContent value="processing">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <FileUpload 
                  onFilesUploaded={setUploadedFiles}
                  uploadedFiles={uploadedFiles}
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
