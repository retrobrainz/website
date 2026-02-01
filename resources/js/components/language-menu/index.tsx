import { GlobalOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import { languages } from '../../config/i18n.js';

export default function LanguageMenu() {
  const { i18n } = useTranslation();

  const items: MenuProps['items'] = languages.map((lang) => ({
    key: lang.code,
    label: lang.name,
    onClick: () => {
      i18n.changeLanguage(lang.code);
    },
  }));

  const currentLanguage = languages.find((lang) => lang.code === i18n.language);

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Button type="text" icon={<GlobalOutlined />}>
        {currentLanguage?.name || 'English'}
      </Button>
    </Dropdown>
  );
}
