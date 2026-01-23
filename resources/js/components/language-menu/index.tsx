import { GlobalOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'ja', name: '日本語' },
  { code: 'zh', name: '中文' },
];

export default function LanguageMenu() {
  const { i18n } = useTranslation();

  const items: MenuProps['items'] = languages.map((lang) => ({
    key: lang.code,
    label: lang.name,
    onClick: () => {
      i18n.changeLanguage(lang.code);
    },
  }));

  // Extract language code without region (e.g., 'en' from 'en-US')
  const currentLangCode = i18n.language.split('-')[0];
  const currentLanguage = languages.find((lang) => lang.code === currentLangCode);

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Button icon={<GlobalOutlined />}>{currentLanguage?.name || 'English'}</Button>
    </Dropdown>
  );
}
