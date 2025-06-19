
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";

interface InsuranceCoverageProps {
  formData: {
    mandatoryInsurance: boolean;
    accidentInsurance: boolean;
    injuryInsurance: boolean;
    windowsInsurance: string;
    animalCollisions: boolean;
    luggage: boolean;
    assistanceServices: boolean;
    vandalism: boolean;
  };
  onFormDataChange: (field: string, value: any) => void;
}

export const InsuranceCoverage = ({ formData, onFormDataChange }: InsuranceCoverageProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg text-purple-800">{t('insuranceCoverage')}</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="mandatoryInsurance"
            checked={formData.mandatoryInsurance}
            onCheckedChange={(checked) => onFormDataChange('mandatoryInsurance', checked)}
          />
          <Label htmlFor="mandatoryInsurance">{t('mandatoryInsurance')}</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="accidentInsurance"
            checked={formData.accidentInsurance}
            onCheckedChange={(checked) => onFormDataChange('accidentInsurance', checked)}
          />
          <Label htmlFor="accidentInsurance">{t('accidentInsurance')}</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="windowsInsurance"
            checked={formData.windowsInsurance !== "0"}
            onCheckedChange={(checked) => onFormDataChange('windowsInsurance', checked ? "10" : "0")}
          />
          <Label htmlFor="windowsInsurance">{t('windowsInsurance')}</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="injuryInsurance"
            checked={formData.injuryInsurance}
            onCheckedChange={(checked) => onFormDataChange('injuryInsurance', checked)}
          />
          <Label htmlFor="injuryInsurance">{t('injuryInsurance')}</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="animalCollisions"
            checked={formData.animalCollisions}
            onCheckedChange={(checked) => onFormDataChange('animalCollisions', checked)}
          />
          <Label htmlFor="animalCollisions">{t('animalCollisions')}</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="luggage"
            checked={formData.luggage}
            onCheckedChange={(checked) => onFormDataChange('luggage', checked)}
          />
          <Label htmlFor="luggage">{t('luggage')}</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="assistanceServices"
            checked={formData.assistanceServices}
            onCheckedChange={(checked) => onFormDataChange('assistanceServices', checked)}
          />
          <Label htmlFor="assistanceServices">{t('assistanceServices')}</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="vandalism"
            checked={formData.vandalism}
            onCheckedChange={(checked) => onFormDataChange('vandalism', checked)}
          />
          <Label htmlFor="vandalism">{t('vandalism')}</Label>
        </div>
      </div>
    </div>
  );
};
