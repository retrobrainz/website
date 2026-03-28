import { Breadcrumb, Button, Col, Flex, Form, Input, Row, Select, Typography, message } from 'antd';
import { Container } from 'antd-moe';
import { useEffect, useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'wouter';
import xior from 'xior';
import AskGoogle from '../../components/ask-google';
import { languages } from '../../config/i18n';
import type Language from '../../types/Language';

export default function AdminLanguageTranslatePage() {
  const { t, i18n } = useTranslation();
  const { languageId } = useParams<{ languageId: string }>();
  const [locale, setLocale] = useState(i18n.language === 'en' ? 'zh-CN' : i18n.language);
  const [form] = Form.useForm();

  const { data: language, reload } = useFetch<Language>(`/admin/languages/${languageId}`, {
    params: { locale },
  });

  const translation = language?.translations?.find((item) => item.locale === locale);
  const displayName =
    translation?.name || language?.translations?.[0]?.name || language?.name || '...';

  const handleSave = async (values: { name: string }) => {
    try {
      if (translation) {
        await xior.put(`/admin/languages/${languageId}/translations/${translation.id}`, {
          ...values,
          locale,
        });
      } else {
        await xior.post(`/admin/languages/${languageId}/translations`, {
          ...values,
          locale,
        });
      }

      message.success(t('saved'));
      await reload();
    } catch (error: any) {
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error(t('error-saving'));
      }
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      name: translation?.name || '',
    });
  }, [form, translation]);

  return (
    <Container maxWidth="lg" style={{ paddingTop: 24 }}>
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
          { title: <Link href="/settings">{t('settings')}</Link> },
          { title: <Link href="/admin/languages">{t('languages')}</Link> },
          {
            title: <Link href={`/admin/languages/${languageId}/edit`}>{displayName}</Link>,
          },
          { title: t('translate') },
        ]}
        style={{ marginBottom: 16 }}
      />

      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Typography.Title level={1} style={{ margin: 0 }}>
          {t('translate')}: {displayName}
        </Typography.Title>

        <Select
          value={locale}
          onChange={setLocale}
          options={languages
            .filter((entry) => entry.code !== 'en')
            .map((entry) => ({ value: entry.code, label: entry.name }))}
          style={{ width: 100 }}
        />
      </Flex>

      <Form form={form} layout="vertical" onFinish={handleSave}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label={t('name')}>
              <Input value={language?.name} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('name')}
              name="name"
              rules={[{ required: true }]}
              extra={
                <AskGoogle query={`translate language name "${language?.name}" into ${locale}`} />
              }
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Flex justify="center">
          <Button type="primary" htmlType="submit">
            {t('save')}
          </Button>
        </Flex>
      </Form>
    </Container>
  );
}
