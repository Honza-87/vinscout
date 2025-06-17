
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Download, FileJson } from "lucide-react";
import { toast } from "sonner";

interface ResultsSectionProps {
  vehicles: any[];
  onVehiclesChange: (vehicles: any[]) => void;
  formData: any;
}

export const ResultsSection = ({ vehicles, onVehiclesChange, formData }: ResultsSectionProps) => {
  const [manualInput, setManualInput] = useState("");

  const addVehicle = (vehicleData?: any) => {
    const newVehicle = {
      id: Date.now(),
      vin: vehicleData?.vin || "",
      licensePlate: vehicleData?.licensePlate || "",
      mileage: "",
      vehicleValue: "",
      mandatoryInsurance: false,
      accidentInsurance: false,
      injuryInsurance: false,
      windowsInsurance: "10",
      ownerTin: formData.ownerSameAsInsurer ? "" : "",
      cebia: vehicleData?.cebia || null,
      ...vehicleData
    };
    onVehiclesChange([...vehicles, newVehicle]);
  };

  const updateVehicle = (id: number, field: string, value: any) => {
    const updatedVehicles = vehicles.map(vehicle =>
      vehicle.id === id ? { ...vehicle, [field]: value } : vehicle
    );
    onVehiclesChange(updatedVehicles);
  };

  const handleManualAdd = () => {
    if (!manualInput.trim()) {
      toast.error("Please enter a VIN or license plate");
      return;
    }

    const cleanInput = manualInput.trim().toUpperCase();
    let vehicleData: any = {};

    if (cleanInput.length === 17) {
      // Assume it's a VIN
      vehicleData.vin = cleanInput;
      toast.success("VIN detected and added");
    } else if (cleanInput.length === 7 || (cleanInput.length === 8 && cleanInput.includes('-'))) {
      // Assume it's a license plate
      vehicleData.licensePlate = cleanInput;
      toast.success("License plate detected and added");
    } else {
      toast.error("Invalid format. Enter a 17-character VIN or 7-character license plate");
      return;
    }

    addVehicle(vehicleData);
    setManualInput("");
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
    link.download = `fleeto-export-${new Date().toISOString().split('T')[0]}.json`;
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
      <Card className="border-2 border-purple-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-orange-500 text-white">
          <CardTitle>Vehicle Results</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Manual Vehicle Addition */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Enter VIN (17 chars) or License Plate (7 chars)"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleManualAdd} className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Vehicle
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              Auto-detects VIN (17 characters) or License Plate (7 characters)
            </p>
          </div>

          {/* Vehicle List */}
          {vehicles.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No vehicles added yet. Upload documents or manually add vehicles above.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id} className="border border-gray-200">
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
                        />
                      </div>
                      <div>
                        <Label>License Plate</Label>
                        <Input
                          value={vehicle.licensePlate}
                          onChange={(e) => updateVehicle(vehicle.id, 'licensePlate', e.target.value)}
                          placeholder="XXX-XXXX"
                        />
                      </div>
                    </div>

                    {/* CEBIA Data Display */}
                    {vehicle.cebia && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">CEBIA Vehicle Data</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                          <div><span className="font-medium">Type:</span> {vehicle.cebia.type}</div>
                          <div><span className="font-medium">Manufacturer:</span> {vehicle.cebia.manufacturer}</div>
                          <div><span className="font-medium">Model:</span> {vehicle.cebia.model}</div>
                          <div><span className="font-medium">Year:</span> {vehicle.cebia.year}</div>
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
                        />
                      </div>
                      <div>
                        <Label>Vehicle Value</Label>
                        <Input
                          value={vehicle.vehicleValue}
                          onChange={(e) => updateVehicle(vehicle.id, 'vehicleValue', e.target.value)}
                          placeholder="Enter vehicle value"
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
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
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
              <Button onClick={exportJSON} className="bg-orange-500 hover:bg-orange-600">
                <FileJson className="h-4 w-4 mr-2" />
                Export JSON
              </Button>
              <Button onClick={downloadForm} variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
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
