
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
    useFixedAmount?: boolean;
    usePercentageAmount?: boolean;
  };
  onFormDataChange: (field: string, value: string | boolean) => void;
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
                <SelectItem value="50mil">{t('limit50mil')}</SelectItem>
                <SelectItem value="70mil">{t('limit70mil')}</SelectItem>
                <SelectItem value="100mil">{t('limit100mil')}</SelectItem>
                <SelectItem value="250mil">{t('limit250mil')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Accident Insurance participation */}
        {formData.accidentInsurance && (
          <div className="space-y-4">
            <Label className="mb-3 block">{t('accidentInsuranceParticipation')}</Label>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="useFixedAmount"
                  checked={formData.useFixedAmount || false}
                  onCheckedChange={(checked) => onFormDataChange('useFixedAmount', checked)}
                />
                <Label htmlFor="useFixedAmount">{t('fixedAmount')}</Label>
              </div>

              {formData.useFixedAmount && (
                <div>
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

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="usePercentageAmount"
                  checked={formData.usePercentageAmount || false}
                  onCheckedChange={(checked) => onFormDataChange('usePercentageAmount', checked)}
                />
                <Label htmlFor="usePercentageAmount">{t('percentageAmount')}</Label>
              </div>

              {formData.usePercentageAmount && (
                <div>
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
