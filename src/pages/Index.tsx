
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminPanel } from "@/components/AdminPanel";
import { useLanguage } from "@/contexts/LanguageContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AppHeader } from "@/components/layout/AppHeader";
import { ProcessingTab } from "@/components/processing/ProcessingTab";
import { InsuranceFormData } from "@/types";

const Index = () => {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState<InsuranceFormData>({
    policyholderIco: "",
    email: "",
    phone: "",
    startOfInsurance: "",
    participation: "fixed",
    mandatoryInsuranceLimit: "100mil",
    accidentInsuranceFixed: "100",
    percentageParticipation: "min",
    mandatoryInsurance: true,
    accidentInsurance: false,
    injuryInsurance: false,
    windowsInsurance: "0",
    animalCollisions: false,
    luggage: false,
    assistanceServices: false,
    vandalism: false,
    useFixedAmount: false,
    usePercentageAmount: false
  });

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50">
        <div className="container mx-auto p-6">
          <AppHeader />

          <Tabs defaultValue="processing" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 rounded-lg">
              <TabsTrigger value="processing" className="text-lg rounded-md">
                {t('documentProcessing')}
              </TabsTrigger>
              <TabsTrigger value="admin" className="text-lg rounded-md">
                {t('adminPanel')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="processing">
              <ProcessingTab 
                formData={formData}
                onFormDataChange={setFormData}
              />
            </TabsContent>

            <TabsContent value="admin">
              <AdminPanel />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Index;
