import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, FileJson } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface ResultsSectionProps {
  vehicles: any[];
  onVehiclesChange: (vehicles: any[]) => void;
  formData: any;
}

export const ResultsSection = ({ vehicles, onVehiclesChange, formData }: ResultsSectionProps) => {
  const { t } = useLanguage();
  
  const updateVehicle = (id: number, field: string, value: any) => {
    const updatedVehicles = vehicles.map(vehicle =>
      vehicle.id === id ? { ...vehicle, [field]: value } : vehicle
    );
    onVehiclesChange(updatedVehicles);
  };

  const exportJSON = () => {
    const exportData = {
      formData,
      vehicles,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vinscout-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Data exported to JSON");
  };

  const downloadForm = () => {
    // Mock Excel export - in real implementation would use a library like SheetJS
    toast.success("Excel form download would be implemented here");
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-200 shadow-lg rounded-lg">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-t-lg">
          <CardTitle>{t('vehicleResults')}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Vehicle List */}
          {vehicles.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>{t('noVehicles')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id} className="border-2 border-gray-400 rounded-lg shadow-sm">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Left side - User inputs */}
                      <div className="space-y-4">
                        {/* Vehicle Identity */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <Label className="text-sm">{t('vin')}</Label>
                            <Input
                              value={vehicle.vin}
                              onChange={(e) => updateVehicle(vehicle.id, 'vin', e.target.value)}
                              placeholder={t('vinPlaceholder')}
                              maxLength={17}
                              className="rounded-md h-9"
                            />
                          </div>
                          <div>
                            <Label className="text-sm">{t('licensePlate')}</Label>
                            <Input
                              value={vehicle.licensePlate}
                              onChange={(e) => updateVehicle(vehicle.id, 'licensePlate', e.target.value)}
                              placeholder={t('platePlaceholder')}
                              className="rounded-md h-9"
                            />
                          </div>
                        </div>

                        {/* Vehicle Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <Label className="text-sm">{t('mileage')}</Label>
                            <Input
                              value={vehicle.mileage}
                              onChange={(e) => updateVehicle(vehicle.id, 'mileage', e.target.value)}
                              placeholder={t('enterMileage')}
                              className="rounded-md h-9"
                            />
                          </div>
                          <div>
                            <Label className="text-sm">{t('vehicleValue')}</Label>
                            <Input
                              value={vehicle.vehicleValue}
                              onChange={(e) => updateVehicle(vehicle.id, 'vehicleValue', e.target.value)}
                              placeholder={t('enterVehicleValue')}
                              className="rounded-md h-9"
                            />
                          </div>
                        </div>

                        {/* Owner and Operator Information */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm">{t('ownerOperatorInfo')}</h4>
                          
                          <div className="grid grid-cols-2 gap-3 items-center">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`ownerSameAsInsurer-${vehicle.id}`}
                                checked={vehicle.ownerSameAsInsurer !== false}
                                onCheckedChange={(checked) => updateVehicle(vehicle.id, 'ownerSameAsInsurer', checked)}
                              />
                              <Label htmlFor={`ownerSameAsInsurer-${vehicle.id}`} className="text-sm">{t('ownerSameAsInsurer')}</Label>
                            </div>
                            {vehicle.ownerSameAsInsurer === false && (
                              <div>
                                <Input
                                  value={vehicle.ownerTin || ""}
                                  onChange={(e) => updateVehicle(vehicle.id, 'ownerTin', e.target.value)}
                                  placeholder={t('enterOwnerTin')}
                                  className="rounded-md h-9"
                                />
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-3 items-center">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`operatorSameAsInsurer-${vehicle.id}`}
                                checked={vehicle.operatorSameAsInsurer !== false}
                                onCheckedChange={(checked) => updateVehicle(vehicle.id, 'operatorSameAsInsurer', checked)}
                              />
                              <Label htmlFor={`operatorSameAsInsurer-${vehicle.id}`} className="text-sm">{t('operatorSameAsInsurer')}</Label>
                            </div>
                            {vehicle.operatorSameAsInsurer === false && (
                              <div>
                                <Input
                                  value={vehicle.operatorTin || ""}
                                  onChange={(e) => updateVehicle(vehicle.id, 'operatorTin', e.target.value)}
                                  placeholder={t('enterOperatorTin')}
                                  className="rounded-md h-9"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right side - Vehicle Data */}
                      <div>
                        {vehicle.cebia && (
                          <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg h-full">
                            <h4 className="font-medium text-green-800 mb-3">{t('vehicleData')}</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="font-medium text-green-700">{t('type')}:</span>
                                <span className="text-green-600">{vehicle.cebia.type}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-green-700">{t('manufacturer')}:</span>
                                <span className="text-green-600">{vehicle.cebia.manufacturer}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-green-700">{t('model')}:</span>
                                <span className="text-green-600">{vehicle.cebia.model}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-green-700">{t('year')}:</span>
                                <span className="text-green-600">{vehicle.cebia.year}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-green-700">{t('engine')}:</span>
                                <span className="text-green-600">{vehicle.cebia.engineDisplacement}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-green-700">{t('power')}:</span>
                                <span className="text-green-600">{vehicle.cebia.enginePower}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-green-700">{t('maxWeight')}:</span>
                                <span className="text-green-600">{vehicle.cebia.maxWeight}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-green-700">{t('seats')}:</span>
                                <span className="text-green-600">{vehicle.cebia.seats}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Export Buttons */}
          {vehicles.length > 0 && (
            <div className="flex gap-4 mt-6 pt-4 border-t border-gray-200">
              <Button onClick={exportJSON} className="bg-orange-500 hover:bg-orange-600 rounded-md">
                <FileJson className="h-4 w-4 mr-2" />
                {t('exportJson')}
              </Button>
              <Button onClick={downloadForm} variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50 rounded-md">
                <Download className="h-4 w-4 mr-2" />
                {t('downloadForm')}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
