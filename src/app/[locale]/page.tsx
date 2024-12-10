import {useTranslations} from 'next-intl';
// import {Link} from '@/i18n/routing';
export default function Home() {
  const t = useTranslations();
  return (
    <div className="flex items-center justify-center">
      <div>321</div>
      <h1>{t('home')}</h1>
      213
      {/* <Link href="/about">{t('about')}</Link> */}
    </div>
  );
}
