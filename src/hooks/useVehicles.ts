
import { useState, useCallback } from 'react';
import { Vehicle, CebiaData } from '@/types';

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const addVehicles = useCallback((vins: string[]) => {
    const newVehicles = vins.map((vinOrPlate, index) => {
      const isVin = vinOrPlate.length === 17;
      return {
        id: Date.now() + index,
        vin: isVin ? vinOrPlate : "",
        licensePlate: isVin ? "" : vinOrPlate,
        mileage: "",
        vehicleValue: "",
        mandatoryInsurance: false,
        accidentInsurance: false,
        injuryInsurance: false,
        windowsInsurance: "10",
        ownerSameAsInsurer: true,
        operatorSameAsInsurer: true,
        ownerTin: "",
        operatorTin: "",
        cebia: {
          type: "Passenger Car",
          manufacturer: "BMW",
          model: "320d",
          engineDisplacement: "1995 cm³",
          enginePower: "140 kW",
          maxWeight: "1850 kg",
          year: "2020",
          seats: "5",
          fuelType: "Diesel"
        } as CebiaData
      } as Vehicle;
    });

    setVehicles(newVehicles);
  }, []);

  const updateVehicle = useCallback((vehicleId: number, updates: Partial<Vehicle>) => {
    setVehicles(prev => prev.map(vehicle => 
      vehicle.id === vehicleId ? { ...vehicle, ...updates } : vehicle
    ));
  }, []);

  const toggleIndividualCoverage = useCallback((vehicleId: number, globalFormData: any) => {
    setVehicles(prev => prev.map(vehicle => {
      if (vehicle.id === vehicleId) {
        const hasIndividualCoverage = !vehicle.hasIndividualCoverage;
        const updatedVehicle = { ...vehicle, hasIndividualCoverage };
        
        if (hasIndividualCoverage) {
          updatedVehicle.individualInsurance = {
            mandatoryInsurance: globalFormData.mandatoryInsurance,
            accidentInsurance: globalFormData.accidentInsurance,
            injuryInsurance: globalFormData.injuryInsurance,
            windowsInsurance: globalFormData.windowsInsurance,
            animalCollisions: globalFormData.animalCollisions,
            luggage: globalFormData.luggage,
            assistanceServices: globalFormData.assistanceServices,
            vandalism: globalFormData.vandalism,
            participation: globalFormData.participation,
            mandatoryInsuranceLimit: globalFormData.mandatoryInsuranceLimit,
            accidentInsuranceFixed: globalFormData.accidentInsuranceFixed,
            percentageParticipation: globalFormData.percentageParticipation,
            useFixedAmount: globalFormData.useFixedAmount,
            usePercentageAmount: globalFormData.usePercentageAmount,
          };
        }
        
        return updatedVehicle;
      }
      return vehicle;
    }));
  }, []);

  const updateVehicleInsurance = useCallback((vehicleId: number, field: string, value: any) => {
    setVehicles(prev => prev.map(vehicle => {
      if (vehicle.id === vehicleId) {
        return {
          ...vehicle,
          individualInsurance: {
            ...vehicle.individualInsurance!,
            [field]: value
          }
        };
      }
      return vehicle;
    }));
  }, []);

  return {
    vehicles,
    addVehicles,
    updateVehicle,
    toggleIndividualCoverage,
    updateVehicleInsurance,
    setVehicles
  };
};
