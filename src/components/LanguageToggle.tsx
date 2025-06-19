
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="h-8 w-8 p-0 hover:bg-gray-100"
    >
      {language === 'cs' ? (
        // Show English flag when Czech is active
        <span className="text-xl" title="Switch to English">🇬🇧</span>
      ) : (
        // Show Czech flag when English is active
        <span className="text-xl" title="Přepnout na češtinu">🇨🇿</span>
      )}
    </Button>
  );
};
