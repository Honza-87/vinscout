
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ClientInformation } from "./insurance/ClientInformation";
import { InsuranceCoverage } from "./insurance/InsuranceCoverage";
import { ParticipationSettings } from "./insurance/ParticipationSettings";

interface InsuranceFormProps {
  formData: {
    policyholderIco: string;
    email: string;
    phone: string;
    startOfInsurance: string;
    participation: string;
    fixedParticipation: string;
    percentageParticipation: string;
    mandatoryInsurance: boolean;
    accidentInsurance: boolean;
    injuryInsurance: boolean;
    windowsInsurance: string;
    animalCollisions: boolean;
    luggage: boolean;
    assistanceServices: boolean;
    vandalism: boolean;
  };
  onFormDataChange: (data: any) => void;
}

export const InsuranceForm = ({ formData, onFormDataChange }: InsuranceFormProps) => {
  const { t } = useLanguage();
  
  const updateFormData = (field: string, value: any) => {
    onFormDataChange({
      ...formData,
      [field]: value
    });
  };

  // Show participation when any insurance is checked
  const showParticipation = formData.mandatoryInsurance || formData.accidentInsurance || formData.windowsInsurance !== "0" || formData.injuryInsurance || formData.animalCollisions || formData.luggage || formData.assistanceServices || formData.vandalism;

  return (
    <Card className="border-2 border-purple-200 shadow-lg rounded-lg">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {t('insuranceDetails')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          {/* Left Column - Client Information */}
          <ClientInformation 
            formData={formData}
            onFormDataChange={updateFormData}
          />

          {/* Middle Column - Insurance Coverage */}
          <InsuranceCoverage 
            formData={formData}
            onFormDataChange={updateFormData}
          />

          {/* Right Column - Participation */}
          <ParticipationSettings 
            formData={formData}
            onFormDataChange={updateFormData}
            showParticipation={showParticipation}
          />
        </div>
      </CardContent>
    </Card>
  );
};
