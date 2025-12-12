'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

const HomeCTA: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-linear-to-bl from-violet-500 to-fuchsia-500 text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {t('cta.title')}
        </h2>
        <p className="text-xl max-w-3xl mx-auto mb-10">{t('cta.desc')}</p>
        <a
          href="#"
          className="bg-white text-primary px-8 py-4 rounded-lg font-medium inline-flex items-center hover:bg-opacity-90 transition"
        >
          <i className="fas fa-rocket mr-3" /> {t('cta.button')}
        </a>
      </div>
    </section>
  );
};

export default HomeCTA;
