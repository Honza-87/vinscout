
import React, { createContext, useContext, useState } from 'react';

type Language = 'cs' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  cs: {
    // Header
    title: "VinScout Procesor Dokumentů",
    subtitle: "Profesionální zpracování automobilových dokumentů pro extrakci VIN a SPZ",
    
    // Tabs
    documentProcessing: "Zpracování Dokumentů",
    adminPanel: "Administrátorský Panel",
    
    // Insurance Form
    insuranceDetails: "Pojistné Údaje",
    clientInformation: "Informace o klientovi",
    insuranceContractDetails: "Detaily pojistné smlouvy",
    insuranceCoverage: "Pojistné krytí",
    participation: "Spoluúčast",
    insurerTin: "DIČ pojišťovny",
    email: "E-mail",
    phone: "Telefon",
    startOfInsurance: "Začátek pojištění",
    fixed: "Pevná",
    percentage: "Procentní",
    min: "Min",
    max: "Max",
    mandatoryInsurance: "Povinné ručení",
    accidentInsurance: "Havarijní pojištění",
    injuryInsurance: "Úrazové pojištění",
    windowsInsurance: "Pojištění skel",
    animalCollisions: "Střety se zvěří",
    luggage: "Zavazadla",
    assistanceServices: "Asistenční služby",
    vandalism: "Vandalismus",
    mandatoryInsuranceLimit: "Limit povinného ručení",
    recommendedStandard: "Doporučený standard",
    accidentInsuranceParticipation: "Spoluúčast havarijního pojištění",
    fixedAmount: "Pevná částka",
    percentageAmount: "Procentní částka",
    windowsInsuranceLimit: "Limit pojištění skel",
    
    // File Upload
    documentUpload: "Nahrání Dokumentů",
    documentUploadAndExtraction: "Nahrání dokumentů a extrakce VIN",
    dropFiles: "Přetáhněte dokumenty sem nebo klikněte pro výběr",
    supportedFormats: "Podporuje PDF, Excel (.xls, .xlsx), Word (.doc, .docx)",
    uploadedFiles: "Nahrané soubory:",
    extractVins: "Extrahovat VIN",
    extracting: "Extrakce...",
    extractionResults: "Výsledky extrakce:",
    manualVehicleAddition: "Ruční přidání vozidla",
    enterVinOrPlate: "Zadejte VIN nebo SPZ",
    manualEntries: "Ruční záznamy:",
    
    // Results Section
    vehicleResults: "Výsledky Vozidel",
    noVehicles: "Zatím žádná vozidla dekódována. Extrahujte VIN z dokumentů a klikněte na \"Dekódovat\" pro zobrazení výsledků.",
    vin: "VIN",
    licensePlate: "SPZ",
    mileage: "Nájezd",
    vehicleValue: "Hodnota vozidla",
    ownerOperatorInfo: "Informace o vlastníkovi a provozovateli",
    ownerSameAsInsurer: "Vlastník shodný s pojistníkem",
    operatorSameAsInsurer: "Provozovatel shodný s pojistníkem",
    vehicleData: "Údaje o vozidle",
    type: "Typ",
    manufacturer: "Výrobce",
    model: "Model",
    year: "Rok",
    engine: "Motor",
    power: "Výkon",
    maxWeight: "Max. hmotnost",
    seats: "Sedadla",
    exportJson: "Exportovat JSON",
    downloadForm: "Stáhnout formulář",
    
    // Buttons
    decode: "Dekódovat",
    decoding: "Dekódování...",
    
    // Dialog
    unextractedFiles: "Neextrahované soubory",
    unextractedFilesDesc: "Jsou zde soubory, které ještě nebyly extrahovány. Co chcete udělat?",
    extract: "Extrahovat",
    
    // File statuses
    processing: "Zpracování...",
    success: "Úspěch",
    error: "Chyba",
    
    // Placeholders
    enterMileage: "Zadejte nájezd",
    enterVehicleValue: "Zadejte hodnotu vozidla",
    enterOwnerTin: "Zadejte DIČ vlastníka",
    enterOperatorTin: "Zadejte DIČ provozovatele",
    vinPlaceholder: "17-znakový VIN",
    platePlaceholder: "XXX-XXXX",
    enterInsurerTin: "Zadejte DIČ pojišťovny",
    enterEmail: "Zadejte e-mailovou adresu",
    enterPhone: "Zadejte telefonní číslo",
    
    // Validation messages
    vinsFound: "VIN nalezeno",
    noVinsFound: "Žádné VIN nenalezeno"
  },
  en: {
    // Header
    title: "VinScout Document Processor",
    subtitle: "Professional automotive document processing for VIN and license plate extraction",
    
    // Tabs
    documentProcessing: "Document Processing",
    adminPanel: "Admin Panel",
    
    // Insurance Form
    insuranceDetails: "Insurance Details",
    clientInformation: "Client Information",
    insuranceContractDetails: "Insurance Contract Details",
    insuranceCoverage: "Insurance Coverage",
    participation: "Participation",
    insurerTin: "Insurer TIN",
    email: "Email",
    phone: "Phone",
    startOfInsurance: "Start of Insurance",
    fixed: "Fixed",
    percentage: "Percentage",
    min: "Min",
    max: "Max",
    mandatoryInsurance: "Mandatory Insurance",
    accidentInsurance: "Accident Insurance",
    injuryInsurance: "Injury Insurance",
    windowsInsurance: "Windows Insurance",
    animalCollisions: "Animal Collisions",
    luggage: "Luggage",
    assistanceServices: "Assistance Services",
    vandalism: "Vandalism",
    mandatoryInsuranceLimit: "Mandatory Insurance Limit",
    recommendedStandard: "Recommended Standard",
    accidentInsuranceParticipation: "Accident Insurance Participation",
    fixedAmount: "Fixed Amount",
    percentageAmount: "Percentage Amount",
    windowsInsuranceLimit: "Windows Insurance Limit",
    
    // File Upload
    documentUpload: "Document Upload",
    documentUploadAndExtraction: "Document Upload & VIN Extraction",
    dropFiles: "Drag & drop documents here, or click to select",
    supportedFormats: "Supports PDF, Excel (.xls, .xlsx), Word (.doc, .docx)",
    uploadedFiles: "Uploaded Files:",
    extractVins: "Extract VINs",
    extracting: "Extracting...",
    extractionResults: "Extraction Results:",
    manualVehicleAddition: "Manual Vehicle Addition",
    enterVinOrPlate: "Enter VIN or License Plate",
    manualEntries: "Manual Entries:",
    
    // Results Section
    vehicleResults: "Vehicle Results",
    noVehicles: "No vehicles decoded yet. Extract VINs from documents and click \"Decode\" to see results here.",
    vin: "VIN",
    licensePlate: "License Plate",
    mileage: "Mileage",
    vehicleValue: "Vehicle Value",
    ownerOperatorInfo: "Owner & Operator Information",
    ownerSameAsInsurer: "Owner same as insurer",
    operatorSameAsInsurer: "Operator same as insurer",
    vehicleData: "Vehicle Data",
    type: "Type",
    manufacturer: "Manufacturer",
    model: "Model",
    year: "Year",
    engine: "Engine",
    power: "Power",
    maxWeight: "Max Weight",
    seats: "Seats",
    exportJson: "Export JSON",
    downloadForm: "Download Form",
    
    // Buttons
    decode: "Decode",
    decoding: "Decoding...",
    
    // Dialog
    unextractedFiles: "Unextracted Files",
    unextractedFilesDesc: "There are files that haven't been extracted yet. What would you like to do?",
    extract: "Extract",
    
    // File statuses
    processing: "Processing...",
    success: "Success",
    error: "Error",
    
    // Placeholders
    enterMileage: "Enter mileage",
    enterVehicleValue: "Enter vehicle value",
    enterOwnerTin: "Enter owner TIN",
    enterOperatorTin: "Enter operator TIN",
    vinPlaceholder: "17-character VIN",
    platePlaceholder: "XXX-XXXX",
    enterInsurerTin: "Enter insurer TIN",
    enterEmail: "Enter email address",
    enterPhone: "Enter phone number",
    
    // Validation messages
    vinsFound: "VIN(s) found",
    noVinsFound: "No VINs found"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('cs'); // Czech as default

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'cs' ? 'en' : 'cs');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['cs']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
