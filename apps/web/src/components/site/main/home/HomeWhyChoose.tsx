'use client';

import {
  ChartLine,
  MapPin,
  Receipt,
  Route,
  Smartphone,
  UserRoundCog,
} from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const icons = [MapPin, Route, UserRoundCog, Receipt, ChartLine, Smartphone];

const HomeWhyChoose: React.FC = () => {
  const { t } = useTranslation();
  const features = t('features.list', { returnObjects: true }) as {
    title: string;
    description: string;
  }[];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-600">{t('features.desc')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ title, description }, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-8 text-center transition-all hover:transform hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-6">
                  <Icon />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {title}
                </h3>
                <p className="text-gray-600">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeWhyChoose;
