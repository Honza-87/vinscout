
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { IndividualInsuranceData, InsuranceFormData } from "@/types";

interface VehicleInsuranceCoverageProps {
  vehicleId: number;
  hasIndividualCoverage: boolean;
  insuranceData: IndividualInsuranceData;
  globalInsuranceData: InsuranceFormData;
  onToggleIndividualCoverage: (vehicleId: number) => void;
  onUpdateInsurance: (vehicleId: number, field: string, value: any) => void;
}

export const VehicleInsuranceCoverage = ({
  vehicleId,
  hasIndividualCoverage,
  insuranceData,
  globalInsuranceData,
  onToggleIndividualCoverage,
  onUpdateInsurance
}: VehicleInsuranceCoverageProps) => {
  const { t } = useLanguage();

  const showParticipation = insuranceData.mandatoryInsurance || 
    insuranceData.accidentInsurance || 
    insuranceData.windowsInsurance !== "0" || 
    insuranceData.injuryInsurance || 
    insuranceData.animalCollisions || 
    insuranceData.luggage || 
    insuranceData.assistanceServices || 
    insuranceData.vandalism;

  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <Button
        onClick={() => onToggleIndividualCoverage(vehicleId)}
        variant="outline"
        size="sm"
        className="mb-4 bg-purple-200 hover:bg-purple-300 text-purple-800 border-purple-400"
      >
        {hasIndividualCoverage ? t('keepSameCoverage') : t('individualInsuranceCoverageAdaptation')}
      </Button>

      {hasIndividualCoverage && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          {/* Insurance Coverage */}
          <div className="space-y-4">
            <h4 className="font-medium text-blue-800">{t('insuranceCoverage')}</h4>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`mandatoryInsurance-${vehicleId}`}
                  checked={insuranceData.mandatoryInsurance}
                  onCheckedChange={(checked) => onUpdateInsurance(vehicleId, 'mandatoryInsurance', checked)}
                />
                <Label htmlFor={`mandatoryInsurance-${vehicleId}`} className="text-sm">{t('mandatoryInsurance')}</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`accidentInsurance-${vehicleId}`}
                  checked={insuranceData.accidentInsurance}
                  onCheckedChange={(checked) => onUpdateInsurance(vehicleId, 'accidentInsurance', checked)}
                />
                <Label htmlFor={`accidentInsurance-${vehicleId}`} className="text-sm">{t('accidentInsurance')}</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`windowsInsurance-${vehicleId}`}
                  checked={insuranceData.windowsInsurance !== "0"}
                  onCheckedChange={(checked) => onUpdateInsurance(vehicleId, 'windowsInsurance', checked ? "10" : "0")}
                />
                <Label htmlFor={`windowsInsurance-${vehicleId}`} className="text-sm">{t('windowsInsurance')}</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`injuryInsurance-${vehicleId}`}
                  checked={insuranceData.injuryInsurance}
                  onCheckedChange={(checked) => onUpdateInsurance(vehicleId, 'injuryInsurance', checked)}
                />
                <Label htmlFor={`injuryInsurance-${vehicleId}`} className="text-sm">{t('injuryInsurance')}</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`animalCollisions-${vehicleId}`}
                  checked={insuranceData.animalCollisions}
                  onCheckedChange={(checked) => onUpdateInsurance(vehicleId, 'animalCollisions', checked)}
                />
                <Label htmlFor={`animalCollisions-${vehicleId}`} className="text-sm">{t('animalCollisions')}</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`luggage-${vehicleId}`}
                  checked={insuranceData.luggage}
                  onCheckedChange={(checked) => onUpdateInsurance(vehicleId, 'luggage', checked)}
                />
                <Label htmlFor={`luggage-${vehicleId}`} className="text-sm">{t('luggage')}</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`assistanceServices-${vehicleId}`}
                  checked={insuranceData.assistanceServices}
                  onCheckedChange={(checked) => onUpdateInsurance(vehicleId, 'assistanceServices', checked)}
                />
                <Label htmlFor={`assistanceServices-${vehicleId}`} className="text-sm">{t('assistanceServices')}</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`vandalism-${vehicleId}`}
                  checked={insuranceData.vandalism}
                  onCheckedChange={(checked) => onUpdateInsurance(vehicleId, 'vandalism', checked)}
                />
                <Label htmlFor={`vandalism-${vehicleId}`} className="text-sm">{t('vandalism')}</Label>
              </div>
            </div>
          </div>

          {/* Participation Settings */}
          {showParticipation && (
            <div className="space-y-4">
              <h4 className="font-medium text-blue-800">{t('participation')}</h4>
              
              <div className="space-y-4">
                {/* Mandatory Insurance participation */}
                {insuranceData.mandatoryInsurance && (
                  <div>
                    <Label className="text-sm">{t('mandatoryInsuranceLimit')}</Label>
                    <Select
                      value={insuranceData.mandatoryInsuranceLimit || "100mil"}
                      onValueChange={(value) => onUpdateInsurance(vehicleId, 'mandatoryInsuranceLimit', value)}
                    >
                      <SelectTrigger className="rounded-md h-9">
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
                {insuranceData.accidentInsurance && (
                  <div className="space-y-3">
                    <Label className="text-sm">{t('accidentInsuranceParticipation')}</Label>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`useFixedAmount-${vehicleId}`}
                          checked={insuranceData.useFixedAmount || false}
                          onCheckedChange={(checked) => onUpdateInsurance(vehicleId, 'useFixedAmount', checked)}
                        />
                        <Label htmlFor={`useFixedAmount-${vehicleId}`} className="text-sm">{t('fixedAmount')}</Label>
                      </div>

                      {insuranceData.useFixedAmount && (
                        <div>
                          <Select
                            value={insuranceData.accidentInsuranceFixed || "100"}
                            onValueChange={(value) => onUpdateInsurance(vehicleId, 'accidentInsuranceFixed', value)}
                          >
                            <SelectTrigger className="rounded-md h-9">
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
                          id={`usePercentageAmount-${vehicleId}`}
                          checked={insuranceData.usePercentageAmount || false}
                          onCheckedChange={(checked) => onUpdateInsurance(vehicleId, 'usePercentageAmount', checked)}
                        />
                        <Label htmlFor={`usePercentageAmount-${vehicleId}`} className="text-sm">{t('percentageAmount')}</Label>
                      </div>

                      {insuranceData.usePercentageAmount && (
                        <div>
                          <Select
                            value={insuranceData.percentageParticipation || "min"}
                            onValueChange={(value) => onUpdateInsurance(vehicleId, 'percentageParticipation', value)}
                          >
                            <SelectTrigger className="rounded-md h-9">
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
                {insuranceData.windowsInsurance !== "0" && (
                  <div>
                    <Label className="text-sm">{t('windowsInsuranceLimit')}</Label>
                    <Select
                      value={insuranceData.windowsInsurance}
                      onValueChange={(value) => onUpdateInsurance(vehicleId, 'windowsInsurance', value)}
                    >
                      <SelectTrigger className="rounded-md h-9">
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
          )}
        </div>
      )}
    </div>
  );
};
