
import React from 'react';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

export const AppHeader = () => {
  const { t } = useLanguage();

  return (
    <header className="text-center mb-8 relative">
      <div className="absolute left-0 top-0">
        <img 
          src="/lovable-uploads/fe5d5630-7728-44c7-8b57-8cc5139a93e7.png" 
          alt="Petrisk Logo" 
          className="h-12 w-auto"
        />
      </div>
      <div className="absolute right-0 top-0">
        <LanguageToggle />
      </div>
      <h1 className="text-4xl font-bold text-purple-800 mb-2">
        {t('title')}
      </h1>
      <p className="text-lg text-gray-600">
        {t('subtitle')}
      </p>
    </header>
  );
};
