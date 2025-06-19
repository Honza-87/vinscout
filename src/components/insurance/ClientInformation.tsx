
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";

interface ClientInformationProps {
  formData: {
    insurerTin: string;
    email: string;
    phone: string;
    startOfInsurance: string;
  };
  onFormDataChange: (field: string, value: string) => void;
}

export const ClientInformation = ({ formData, onFormDataChange }: ClientInformationProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg text-purple-800">{t('clientInformation')}</h3>
      
      <div>
        <Label htmlFor="insurerTin">{t('insurerTin')}</Label>
        <Input
          id="insurerTin"
          value={formData.insurerTin}
          onChange={(e) => onFormDataChange('insurerTin', e.target.value)}
          placeholder={t('enterInsurerTin')}
          className="rounded-md"
        />
      </div>

      <div>
        <Label htmlFor="email">{t('email')}</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onFormDataChange('email', e.target.value)}
          placeholder={t('enterEmail')}
          className="rounded-md"
        />
      </div>

      <div>
        <Label htmlFor="phone">{t('phone')}</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => onFormDataChange('phone', e.target.value)}
          placeholder={t('enterPhone')}
          className="rounded-md"
        />
      </div>

      <div>
        <Label htmlFor="startOfInsurance">{t('startOfInsurance')}</Label>
        <Input
          id="startOfInsurance"
          type="date"
          value={formData.startOfInsurance}
          onChange={(e) => onFormDataChange('startOfInsurance', e.target.value)}
          className="rounded-md"
        />
      </div>
    </div>
  );
};
