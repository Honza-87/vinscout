
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText } from "lucide-react";

interface InsuranceFormProps {
  formData: {
    insurerTin: string;
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
  const updateFormData = (field: string, value: any) => {
    onFormDataChange({
      ...formData,
      [field]: value
    });
  };

  // Check if any insurance coverage is selected to show participation column
  const showParticipation = formData.mandatoryInsurance || formData.accidentInsurance || formData.injuryInsurance || formData.animalCollisions || formData.luggage || formData.assistanceServices || formData.vandalism;

  return (
    <Card className="border-2 border-purple-200 shadow-lg rounded-lg">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Insurance Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className={`grid gap-6 ${showParticipation ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1 lg:grid-cols-2'}`}>
          {/* Left Column - Client Information */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg text-purple-800">Client Information</h3>
            
            <div>
              <Label htmlFor="insurerTin">Insurer TIN</Label>
              <Input
                id="insurerTin"
                value={formData.insurerTin}
                onChange={(e) => updateFormData('insurerTin', e.target.value)}
                placeholder="Enter insurer TIN"
                className="rounded-md"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="Enter email address"
                className="rounded-md"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="Enter phone number"
                className="rounded-md"
              />
            </div>

            <div>
              <Label htmlFor="startOfInsurance">Start of Insurance</Label>
              <Input
                id="startOfInsurance"
                type="date"
                value={formData.startOfInsurance}
                onChange={(e) => updateFormData('startOfInsurance', e.target.value)}
                className="rounded-md"
              />
            </div>
          </div>

          {/* Middle Column - Insurance Coverage */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg text-purple-800">Insurance Coverage</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="mandatoryInsurance"
                  checked={formData.mandatoryInsurance}
                  onCheckedChange={(checked) => updateFormData('mandatoryInsurance', checked)}
                />
                <Label htmlFor="mandatoryInsurance">Mandatory Insurance</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="accidentInsurance"
                  checked={formData.accidentInsurance}
                  onCheckedChange={(checked) => updateFormData('accidentInsurance', checked)}
                />
                <Label htmlFor="accidentInsurance">Accident Insurance</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="injuryInsurance"
                  checked={formData.injuryInsurance}
                  onCheckedChange={(checked) => updateFormData('injuryInsurance', checked)}
                />
                <Label htmlFor="injuryInsurance">Injury Insurance</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="windowsInsurance"
                  checked={formData.windowsInsurance !== "0"}
                  onCheckedChange={(checked) => updateFormData('windowsInsurance', checked ? "10" : "0")}
                />
                <Label htmlFor="windowsInsurance">Windows Insurance</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="animalCollisions"
                  checked={formData.animalCollisions}
                  onCheckedChange={(checked) => updateFormData('animalCollisions', checked)}
                />
                <Label htmlFor="animalCollisions">Animal Collisions Insurance</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="luggage"
                  checked={formData.luggage}
                  onCheckedChange={(checked) => updateFormData('luggage', checked)}
                />
                <Label htmlFor="luggage">Luggage Insurance</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="assistanceServices"
                  checked={formData.assistanceServices}
                  onCheckedChange={(checked) => updateFormData('assistanceServices', checked)}
                />
                <Label htmlFor="assistanceServices">Assistance Services</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="vandalism"
                  checked={formData.vandalism}
                  onCheckedChange={(checked) => updateFormData('vandalism', checked)}
                />
                <Label htmlFor="vandalism">Vandalism Insurance</Label>
              </div>
            </div>
          </div>

          {/* Right Column - Participation (conditional) */}
          {showParticipation && (
            <div className="space-y-6">
              <h3 className="font-semibold text-lg text-purple-800">Participation</h3>
              
              <div className="space-y-4">
                {/* Mandatory Insurance participation */}
                {formData.mandatoryInsurance && (
                  <div>
                    <Label>Mandatory Insurance Limit</Label>
                    <Select
                      value={formData.fixedParticipation}
                      onValueChange={(value) => updateFormData('fixedParticipation', value)}
                    >
                      <SelectTrigger className="rounded-md">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-md">
                        <SelectItem value="50mil">50 mil. Kč / 50 mil. Kč – legal minimum</SelectItem>
                        <SelectItem value="70mil">70 mil. Kč / 70 mil. Kč – lower standard</SelectItem>
                        <SelectItem value="100mil">100 mil. Kč / 100 mil. Kč – recommended standard</SelectItem>
                        <SelectItem value="250mil">250 mil. Kč / 250 mil. Kč – maximum protection</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Accident Insurance participation */}
                {formData.accidentInsurance && (
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-3 block">Accident Insurance Participation</Label>
                      <RadioGroup
                        value={formData.participation}
                        onValueChange={(value) => updateFormData('participation', value)}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="fixed" id="fixed" />
                          <Label htmlFor="fixed">Fixed amount</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="percentage" id="percentage" />
                          <Label htmlFor="percentage">Percentage amount</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {formData.participation === "fixed" && (
                      <div>
                        <Label>Fixed Amount</Label>
                        <Select
                          value={formData.fixedParticipation}
                          onValueChange={(value) => updateFormData('fixedParticipation', value)}
                        >
                          <SelectTrigger className="rounded-md">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-md">
                            <SelectItem value="0">0</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                            <SelectItem value="200">200</SelectItem>
                            <SelectItem value="300">300</SelectItem>
                            <SelectItem value="500">500</SelectItem>
                            <SelectItem value="1000">1000</SelectItem>
                            <SelectItem value="max">Max</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {formData.participation === "percentage" && (
                      <div>
                        <Label>Percentage Amount</Label>
                        <Select
                          value={formData.percentageParticipation}
                          onValueChange={(value) => updateFormData('percentageParticipation', value)}
                        >
                          <SelectTrigger className="rounded-md">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-md">
                            <SelectItem value="min">Min</SelectItem>
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
                    <Label>Windows Insurance Limit</Label>
                    <Select
                      value={formData.windowsInsurance}
                      onValueChange={(value) => updateFormData('windowsInsurance', value)}
                    >
                      <SelectTrigger className="rounded-md">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-md">
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
      </CardContent>
    </Card>
  );
};
