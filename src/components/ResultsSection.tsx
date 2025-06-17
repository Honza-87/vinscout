
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileJson } from "lucide-react";
import { toast } from "sonner";

interface ResultsSectionProps {
  vehicles: any[];
  onVehiclesChange: (vehicles: any[]) => void;
  formData: any;
}

export const ResultsSection = ({ vehicles, onVehiclesChange, formData }: ResultsSectionProps) => {
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
          <CardTitle>Vehicle Results</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Vehicle List */}
          {vehicles.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No vehicles decoded yet. Extract VINs from documents and click "Decode" to see results here.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id} className="border-2 border-gray-300 rounded-lg shadow-sm">
                  <CardContent className="p-4 space-y-4">
                    {/* Vehicle Identity */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>VIN</Label>
                        <Input
                          value={vehicle.vin}
                          onChange={(e) => updateVehicle(vehicle.id, 'vin', e.target.value)}
                          placeholder="17-character VIN"
                          maxLength={17}
                          className="rounded-md"
                        />
                      </div>
                      <div>
                        <Label>License Plate</Label>
                        <Input
                          value={vehicle.licensePlate}
                          onChange={(e) => updateVehicle(vehicle.id, 'licensePlate', e.target.value)}
                          placeholder="XXX-XXXX"
                          className="rounded-md"
                        />
                      </div>
                    </div>

                    {/* Vehicle Data Display */}
                    {vehicle.cebia && (
                      <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-3">Vehicle Data</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div><span className="font-medium text-green-700">Type:</span> <span className="text-green-600">{vehicle.cebia.type}</span></div>
                          <div><span className="font-medium text-green-700">Manufacturer:</span> <span className="text-green-600">{vehicle.cebia.manufacturer}</span></div>
                          <div><span className="font-medium text-green-700">Model:</span> <span className="text-green-600">{vehicle.cebia.model}</span></div>
                          <div><span className="font-medium text-green-700">Year:</span> <span className="text-green-600">{vehicle.cebia.year}</span></div>
                          <div><span className="font-medium text-green-700">Engine:</span> <span className="text-green-600">{vehicle.cebia.engineDisplacement}</span></div>
                          <div><span className="font-medium text-green-700">Power:</span> <span className="text-green-600">{vehicle.cebia.enginePower}</span></div>
                          <div><span className="font-medium text-green-700">Max Weight:</span> <span className="text-green-600">{vehicle.cebia.maxWeight}</span></div>
                          <div><span className="font-medium text-green-700">Seats:</span> <span className="text-green-600">{vehicle.cebia.seats}</span></div>
                        </div>
                      </div>
                    )}

                    {/* Vehicle Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Mileage</Label>
                        <Input
                          value={vehicle.mileage}
                          onChange={(e) => updateVehicle(vehicle.id, 'mileage', e.target.value)}
                          placeholder="Enter mileage"
                          className="rounded-md"
                        />
                      </div>
                      <div>
                        <Label>Vehicle Value</Label>
                        <Input
                          value={vehicle.vehicleValue}
                          onChange={(e) => updateVehicle(vehicle.id, 'vehicleValue', e.target.value)}
                          placeholder="Enter vehicle value"
                          className="rounded-md"
                        />
                      </div>
                    </div>

                    {/* Insurance Options */}
                    <div className="space-y-3">
                      <h4 className="font-medium">Insurance Coverage</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`mandatory-${vehicle.id}`}
                            checked={vehicle.mandatoryInsurance}
                            onCheckedChange={(checked) => updateVehicle(vehicle.id, 'mandatoryInsurance', checked)}
                          />
                          <Label htmlFor={`mandatory-${vehicle.id}`}>Mandatory Insurance</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`accident-${vehicle.id}`}
                            checked={vehicle.accidentInsurance}
                            onCheckedChange={(checked) => updateVehicle(vehicle.id, 'accidentInsurance', checked)}
                          />
                          <Label htmlFor={`accident-${vehicle.id}`}>Accident Insurance</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`injury-${vehicle.id}`}
                            checked={vehicle.injuryInsurance}
                            onCheckedChange={(checked) => updateVehicle(vehicle.id, 'injuryInsurance', checked)}
                          />
                          <Label htmlFor={`injury-${vehicle.id}`}>Injury Insurance</Label>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Windows Insurance</Label>
                          <Select
                            value={vehicle.windowsInsurance}
                            onValueChange={(value) => updateVehicle(vehicle.id, 'windowsInsurance', value)}
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

                        {!formData.ownerSameAsInsurer && (
                          <div>
                            <Label>Owner TIN</Label>
                            <Input
                              value={vehicle.ownerTin}
                              onChange={(e) => updateVehicle(vehicle.id, 'ownerTin', e.target.value)}
                              placeholder="Enter owner TIN"
                              className="rounded-md"
                            />
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
                Export JSON
              </Button>
              <Button onClick={downloadForm} variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50 rounded-md">
                <Download className="h-4 w-4 mr-2" />
                Download Form
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
