'use client';
import { buttonVariants } from '@repo/ui/components/button';
import { cn } from '@repo/ui/lib/utils';
import Link from 'next/link.js';
import { useTranslation } from 'react-i18next';
import '../../../locales/i18n.ts';
import MainLogo from '../../ui/main-logo';

const Header = () => {
  const { t } = useTranslation();
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 py-4">
      <div className="container">
        <div className="grid gap-4 grid-cols-12 items-center">
          <div className="col-span-3 justify-self-start">
            <MainLogo />
          </div>
          <nav className="col-span-6 justify-self-center">
            <ul className="flex flex-wrap justify-center gap-8">
              {[
                { name: t('header.home'), href: '#' },
                { name: t('header.services'), href: '#' },
                { name: t('header.pricing'), href: '#' },
                { name: t('header.aboutUs'), href: '#' },
                { name: t('header.contact'), href: '#' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-medium transition-all hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="col-span-3 justify-self-end">
            <div className="flex gap-4">
              <Link href="/sign-in" className={cn(buttonVariants())}>
                {t('header.login')}
              </Link>
              <Link
                href="/sign-in"
                className={cn(buttonVariants({ variant: 'outline' }))}
              >
                {t('header.register')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
