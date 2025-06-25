
export interface Vehicle {
  id: number;
  vin: string;
  licensePlate: string;
  mileage: string;
  vehicleValue: string;
  mandatoryInsurance: boolean;
  accidentInsurance: boolean;
  injuryInsurance: boolean;
  windowsInsurance: string;
  ownerSameAsInsurer: boolean;
  operatorSameAsInsurer: boolean;
  ownerTin: string;
  operatorTin: string;
  hasIndividualCoverage?: boolean;
  individualInsurance?: IndividualInsuranceData;
  cebia: CebiaData;
}

export interface CebiaData {
  type: string;
  manufacturer: string;
  model: string;
  engineDisplacement: string;
  enginePower: string;
  maxWeight: string;
  year: string;
  seats: string;
  fuelType: string;
}

export interface IndividualInsuranceData {
  mandatoryInsurance: boolean;
  accidentInsurance: boolean;
  injuryInsurance: boolean;
  windowsInsurance: string;
  animalCollisions: boolean;
  luggage: boolean;
  assistanceServices: boolean;
  vandalism: boolean;
  participation: string;
  mandatoryInsuranceLimit: string;
  accidentInsuranceFixed: string;
  percentageParticipation: string;
  useFixedAmount: boolean;
  usePercentageAmount: boolean;
}

export interface InsuranceFormData {
  policyholderIco: string;
  email: string;
  phone: string;
  startOfInsurance: string;
  participation: string;
  mandatoryInsuranceLimit: string;
  accidentInsuranceFixed: string;
  percentageParticipation: string;
  mandatoryInsurance: boolean;
  accidentInsurance: boolean;
  injuryInsurance: boolean;
  windowsInsurance: string;
  animalCollisions: boolean;
  luggage: boolean;
  assistanceServices: boolean;
  vandalism: boolean;
  useFixedAmount?: boolean;
  usePercentageAmount?: boolean;
}

export interface ExtractedFile {
  file: File;
  status: 'processing' | 'success' | 'error';
  progress: number;
  extractedVins: string[];
}

export type FileProcessingStatus = 'idle' | 'uploading' | 'extracting' | 'decoding' | 'complete' | 'error';

export interface AppState {
  uploadedFiles: File[];
  extractedFiles: ExtractedFile[];
  vehicles: Vehicle[];
  formData: InsuranceFormData;
  hasExtracted: boolean;
  isExtracting: boolean;
  isDecoding: boolean;
  decodingProgress: number;
  showUnextractedDialog: boolean;
}
