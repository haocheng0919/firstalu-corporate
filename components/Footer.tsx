'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/logo/firstalu_logo.webp" 
                alt="First Aluminum Technology" 
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-bold">First Aluminum Technology</span>
            </div>
            <p className="text-secondary-300 mb-4 max-w-md">
              {t('footer.description')}
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.company')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-secondary-300 hover:text-white transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-secondary-300 hover:text-white transition-colors">
                  {t('nav.news')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.support')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-secondary-300 hover:text-white transition-colors">
                  {t('nav.faq')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-secondary-300 hover:text-white transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-700 mt-8 pt-8">
          <p className="text-secondary-300">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;