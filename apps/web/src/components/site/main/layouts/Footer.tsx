'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/select';
import { Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();

  const quickLinks = t('footer.quickLinks', { returnObjects: true }) as {
    label: string;
    href: string;
  }[];

  const contacts = t('footer.contactItems', { returnObjects: true }) as {
    icon: 'MapPin' | 'Phone' | 'Mail';
    text: string;
  }[];

  const iconMap = { MapPin, Phone, Mail };

  return (
    <footer className="bg-linear-to-t from-sky-500 to-indigo-500 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-6 relative pb-3 after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-primary">
              {t('footer.aboutTitle')}
            </h3>
            <p className="text-gray-300">{t('footer.aboutDesc')}</p>

            <div className="mt-6">
              <Select
                onValueChange={(value: string) =>
                  i18n.changeLanguage(value as 'en' | 'bn')
                }
                defaultValue="en"
              >
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="bn">বাংলা</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 relative pb-3 after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-primary">
              {t('footer.quickLinksTitle')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-6 relative pb-3 after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-primary">
              {t('footer.contactTitle')}
            </h3>
            <ul className="space-y-3">
              {contacts.map(({ icon, text }, i) => {
                const Icon = iconMap[icon];
                return (
                  <li key={i} className="flex items-start">
                    <Icon className="mt-1 mr-3 text-gray-300" size={18} />
                    <span className="text-gray-300">{text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
