
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
    
    // Admin Panel
    systemSettings: "Nastavení Systému",
    ocrConfidenceThreshold: "Práh spolehlivosti OCR",
    ocrConfidenceDesc: "Minimální úroveň spolehlivosti pro výsledky OCR (0-10)",
    maxFileSize: "Max. velikost souboru (MB)",
    maxFileSizeDesc: "Maximální povolená velikost souboru pro nahrání",
    tesseractDataPath: "Cesta k datům Tesseract",
    tesseractDataDesc: "Cesta k souborům jazykových dat Tesseract OCR",
    saveSettings: "Uložit nastavení",
    systemLogs: "Systémové logy",
    downloadLogs: "Stáhnout logy",
    viewDetails: "Zobrazit podrobnosti",
    INFO: "INFO",
    WARN: "VAROVÁNÍ",
    SUCCESS: "ÚSPĚCH",
    ERROR: "CHYBA",
    
    // Insurance Form
    insuranceDetails: "Pojistné Údaje",
    clientInformation: "Informace o pojistníkovi",
    insuranceContractDetails: "Detaily pojistné smlouvy",
    insuranceCoverage: "Pojistné krytí",
    participation: "Spoluúčast",
    policyholderIco: "IČO pojistníka",
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
    
    // Mandatory insurance limits
    limit50mil: "50 mil. Kč / 50 mil. Kč – zákonné minimum",
    limit70mil: "70 mil. Kč / 70 mil. Kč – nižší standard",
    limit100mil: "100 mil. Kč / 100 mil. Kč – doporučený standard",
    limit250mil: "250 mil. Kč / 250 mil. Kč – maximální ochrana",
    
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
    ownerSameAsPolicyholder: "Vlastník shodný s pojistníkem",
    operatorSameAsPolicyholder: "Provozovatel shodný s pojistníkem",
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
    changeIndividualCoverage: "Změnit individuální pojistné krytí",
    keepSameCoverage: "Zachovat pojistné krytí stejné jako zbytek flotily",
    
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
    enterOwnerIco: "Zadejte IČO vlastníka",
    enterOperatorIco: "Zadejte IČO provozovatele",
    vinPlaceholder: "17-znakový VIN",
    platePlaceholder: "XXX-XXXX",
    enterPolicyholderIco: "Zadejte IČO pojistníka",
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
    
    // Admin Panel
    systemSettings: "System Settings",
    ocrConfidenceThreshold: "OCR Confidence Threshold",
    ocrConfidenceDesc: "Minimum confidence level for OCR results (0-10)",
    maxFileSize: "Max File Size (MB)",
    maxFileSizeDesc: "Maximum allowed file size for uploads",
    tesseractDataPath: "Tesseract Data Path",
    tesseractDataDesc: "Path to Tesseract OCR language data files",
    saveSettings: "Save Settings",
    systemLogs: "System Logs",
    downloadLogs: "Download Logs",
    viewDetails: "View Details",
    INFO: "INFO",
    WARN: "WARN",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
    
    // Insurance Form
    insuranceDetails: "Insurance Details",
    clientInformation: "Policyholder Information",
    insuranceContractDetails: "Insurance Contract Details",
    insuranceCoverage: "Insurance Coverage",
    participation: "Participation",
    policyholderIco: "Policyholder ICO",
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
    
    // Mandatory insurance limits
    limit50mil: "50 mil. CZK / 50 mil. CZK – legal minimum",
    limit70mil: "70 mil. CZK / 70 mil. CZK – lower standard",
    limit100mil: "100 mil. CZK / 100 mil. CZK – recommended standard",
    limit250mil: "250 mil. CZK / 250 mil. CZK – maximum protection",
    
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
    ownerSameAsPolicyholder: "Owner same as policyholder",
    operatorSameAsPolicyholder: "Operator same as policyholder",
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
    changeIndividualCoverage: "Change individual insurance coverage",
    keepSameCoverage: "Keep insurance coverage same as the rest of the fleet",
    
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
    enterOwnerIco: "Enter owner ICO",
    enterOperatorIco: "Enter operator ICO",
    vinPlaceholder: "17-character VIN",
    platePlaceholder: "XXX-XXXX",
    enterPolicyholderIco: "Enter policyholder ICO",
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
