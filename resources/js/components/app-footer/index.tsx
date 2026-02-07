import { Flex } from 'antd';
import { useTranslation } from 'react-i18next';

export default function AppFooter() {
  const { t } = useTranslation();

  return (
    <Flex gap={16}>
      <span>{t('copyright', { year: new Date().getFullYear() })}</span>
      <span style={{ flex: 1 }} />
      <a href="https://github.com/retrobrainz/website">{t('github')}</a>
      <a href="https://t.me/retrobrainz">{t('telegram')}</a>
    </Flex>
  );
}
