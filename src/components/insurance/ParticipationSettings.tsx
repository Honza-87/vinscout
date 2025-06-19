
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

interface ParticipationSettingsProps {
  formData: {
    participation: string;
    fixedParticipation: string;
    percentageParticipation: string;
    mandatoryInsurance: boolean;
    accidentInsurance: boolean;
    windowsInsurance: string;
  };
  onFormDataChange: (field: string, value: string) => void;
  showParticipation: boolean;
}

export const ParticipationSettings = ({ formData, onFormDataChange, showParticipation }: ParticipationSettingsProps) => {
  const { t } = useLanguage();

  if (!showParticipation) return null;

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg text-purple-800">{t('participation')}</h3>
      
      <div className="space-y-4">
        {/* Mandatory Insurance participation */}
        {formData.mandatoryInsurance && (
          <div>
            <Label>{t('mandatoryInsuranceLimit')}</Label>
            <Select
              value={formData.fixedParticipation}
              onValueChange={(value) => onFormDataChange('fixedParticipation', value)}
            >
              <SelectTrigger className="rounded-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-md bg-white z-50">
                <SelectItem value="50mil">50 mil. Kč / 50 mil. Kč – legal minimum</SelectItem>
                <SelectItem value="70mil">70 mil. Kč / 70 mil. Kč – lower standard</SelectItem>
                <SelectItem value="100mil">100 mil. Kč / 100 mil. Kč – {t('recommendedStandard')}</SelectItem>
                <SelectItem value="250mil">250 mil. Kč / 250 mil. Kč – maximum protection</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Accident Insurance participation */}
        {formData.accidentInsurance && (
          <div className="space-y-4">
            <div>
              <Label className="mb-3 block">{t('accidentInsuranceParticipation')}</Label>
              <RadioGroup
                value={formData.participation}
                onValueChange={(value) => onFormDataChange('participation', value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fixed" id="fixed" />
                  <Label htmlFor="fixed">{t('fixedAmount')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="percentage" id="percentage" />
                  <Label htmlFor="percentage">{t('percentageAmount')}</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.participation === "fixed" && (
              <div>
                <Label>{t('fixedAmount')}</Label>
                <Select
                  value={formData.fixedParticipation}
                  onValueChange={(value) => onFormDataChange('fixedParticipation', value)}
                >
                  <SelectTrigger className="rounded-md">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-md bg-white z-50">
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                    <SelectItem value="200">200</SelectItem>
                    <SelectItem value="300">300</SelectItem>
                    <SelectItem value="500">500</SelectItem>
                    <SelectItem value="1000">1000</SelectItem>
                    <SelectItem value="max">{t('max')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {formData.participation === "percentage" && (
              <div>
                <Label>{t('percentageAmount')}</Label>
                <Select
                  value={formData.percentageParticipation}
                  onValueChange={(value) => onFormDataChange('percentageParticipation', value)}
                >
                  <SelectTrigger className="rounded-md">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-md bg-white z-50">
                    <SelectItem value="min">{t('min')}</SelectItem>
                    <SelectItem value="1%">1%</SelectItem>
                    <SelectItem value="2%">2%</SelectItem>
                    <SelectItem value="3%">3%</SelectItem>
                    <SelectItem value="5%">5%</SelectItem>
                    <SelectItem value="10%">10%</SelectItem>
                    <SelectItem value="15%">15%</SelectItem>
                    <SelectItem value="20%">20%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}

        {/* Windows Insurance Limit */}
        {formData.windowsInsurance !== "0" && (
          <div>
            <Label>{t('windowsInsuranceLimit')}</Label>
            <Select
              value={formData.windowsInsurance}
              onValueChange={(value) => onFormDataChange('windowsInsurance', value)}
            >
              <SelectTrigger className="rounded-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-md bg-white z-50">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
                <SelectItem value="no-limit">No Limit</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
};
