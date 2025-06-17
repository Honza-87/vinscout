
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface InsuranceFormProps {
  formData: any;
  onFormDataChange: (data: any) => void;
}

export const InsuranceForm = ({ formData, onFormDataChange }: InsuranceFormProps) => {
  const updateFormData = (key: string, value: any) => {
    onFormDataChange({ ...formData, [key]: value });
  };

  return (
    <Card className="border-2 border-orange-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-purple-600 text-white">
        <CardTitle>Insurance Details</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Insurer TIN */}
        <div className="space-y-2">
          <Label htmlFor="insurer-tin">Insurer TIN</Label>
          <Input
            id="insurer-tin"
            value={formData.insurerTin}
            onChange={(e) => updateFormData('insurerTin', e.target.value)}
            placeholder="Enter insurer TIN"
            className="border-purple-200 focus:border-purple-400"
          />
        </div>

        {/* Owner same as Insurer */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="owner-same"
            checked={formData.ownerSameAsInsurer}
            onCheckedChange={(checked) => updateFormData('ownerSameAsInsurer', checked)}
          />
          <Label htmlFor="owner-same">Owner same as Insurer</Label>
        </div>

        {/* Owner TIN (conditional) */}
        {!formData.ownerSameAsInsurer && (
          <div className="space-y-2">
            <Label htmlFor="owner-tin">Owner TIN</Label>
            <Input
              id="owner-tin"
              value={formData.ownerTin}
              onChange={(e) => updateFormData('ownerTin', e.target.value)}
              placeholder="Enter owner TIN"
              className="border-purple-200 focus:border-purple-400"
            />
          </div>
        )}

        {/* Start of Insurance */}
        <div className="space-y-2">
          <Label>Start of Insurance</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-purple-200",
                  !formData.startOfInsurance && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.startOfInsurance ? (
                  format(new Date(formData.startOfInsurance), "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="p-3">
                <Input
                  type="date"
                  value={formData.startOfInsurance}
                  onChange={(e) => updateFormData('startOfInsurance', e.target.value)}
                  className="border-purple-200"
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Participation */}
        <div className="space-y-4">
          <Label>Participation</Label>
          <RadioGroup
            value={formData.participation}
            onValueChange={(value) => updateFormData('participation', value)}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fixed" id="fixed" />
              <Label htmlFor="fixed">Fixed</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="percentage" id="percentage" />
              <Label htmlFor="percentage">Percentage</Label>
            </div>
          </RadioGroup>

          {/* Fixed Participation Options */}
          {formData.participation === 'fixed' && (
            <div className="space-y-2">
              <Label>Fixed Amount</Label>
              <Select
                value={formData.fixedParticipation}
                onValueChange={(value) => updateFormData('fixedParticipation', value)}
              >
                <SelectTrigger className="border-purple-200">
                  <SelectValue placeholder="Select fixed amount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Percentage Participation Options */}
          {formData.participation === 'percentage' && (
            <div className="space-y-2">
              <Label>Percentage Amount</Label>
              <Select
                value={formData.percentageParticipation}
                onValueChange={(value) => updateFormData('percentageParticipation', value)}
              >
                <SelectTrigger className="border-purple-200">
                  <SelectValue placeholder="Select percentage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3%">3%</SelectItem>
                  <SelectItem value="5%">5%</SelectItem>
                  <SelectItem value="10%">10%</SelectItem>
                  <SelectItem value="15%">15%</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
