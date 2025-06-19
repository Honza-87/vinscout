
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ExtractedFile {
  file: File;
  status: 'processing' | 'success' | 'error';
  progress: number;
  extractedVins: string[];
}

interface ManualVehicleEntryProps {
  extractedFiles: ExtractedFile[];
  onAddManualVehicle: (vin: string) => void;
  onRemoveManualVehicle: (vin: string) => void;
}

export const ManualVehicleEntry = ({ extractedFiles, onAddManualVehicle, onRemoveManualVehicle }: ManualVehicleEntryProps) => {
  const { t } = useLanguage();
  const [newVin, setNewVin] = useState("");

  // Validate if input is a valid VIN or license plate
  const isValidInput = (input: string) => {
    const trimmed = input.trim();
    return trimmed.length === 17 || trimmed.length === 7 || trimmed.length === 8;
  };

  const handleAddManualVehicle = () => {
    if (newVin.trim() && isValidInput(newVin)) {
      onAddManualVehicle(newVin.trim());
      setNewVin("");
    }
  };

  const manualEntryFile = extractedFiles.find(f => f.file.name === 'Manual Entry');

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-medium text-gray-700">{t('manualVehicleAddition')}</h4>
        <div className="flex gap-2">
          <Input
            placeholder={t('enterVinOrPlate')}
            value={newVin}
            onChange={(e) => setNewVin(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && isValidInput(newVin) && handleAddManualVehicle()}
            className="flex-1"
          />
          <Button 
            onClick={handleAddManualVehicle}
            disabled={!newVin.trim() || !isValidInput(newVin)}
            className={`${
              isValidInput(newVin) && newVin.trim()
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-green-300 cursor-not-allowed'
            }`}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Manual entries display */}
      {manualEntryFile && manualEntryFile.extractedVins.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700">{t('manualEntries')}</h4>
          <div className="space-y-2">
            {manualEntryFile.extractedVins.map((vin, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <code className="bg-white px-2 py-1 rounded text-sm flex-1">{vin}</code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onRemoveManualVehicle(vin)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
