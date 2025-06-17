
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
    ownerSameAsInsurer: boolean;
    ownerTin: string;
    startOfInsurance: string;
    participation: string;
    fixedParticipation: string;
    percentageParticipation: string;
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

  return (
    <Card className="border-2 border-purple-200 shadow-lg rounded-lg">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Insurance Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
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

        <div className="flex items-center space-x-2">
          <Checkbox
            id="ownerSameAsInsurer"
            checked={formData.ownerSameAsInsurer}
            onCheckedChange={(checked) => updateFormData('ownerSameAsInsurer', checked)}
          />
          <Label htmlFor="ownerSameAsInsurer">Owner same as insurer</Label>
        </div>

        {!formData.ownerSameAsInsurer && (
          <div>
            <Label htmlFor="ownerTin">Owner TIN</Label>
            <Input
              id="ownerTin"
              value={formData.ownerTin}
              onChange={(e) => updateFormData('ownerTin', e.target.value)}
              placeholder="Enter owner TIN"
              className="rounded-md"
            />
          </div>
        )}

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

        <div className="space-y-4">
          <Label>Participation</Label>
          <RadioGroup
            value={formData.participation}
            onValueChange={(value) => updateFormData('participation', value)}
            className="flex gap-6"
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

          <div className="flex gap-4">
            {formData.participation === "fixed" && (
              <div className="flex-1">
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
              <div className="flex-1">
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
        </div>
      </CardContent>
    </Card>
  );
};
