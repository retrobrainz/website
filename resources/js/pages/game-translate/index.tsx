import { Breadcrumb, Button, Col, Flex, Form, Input, Row, Select, Typography, message } from 'antd';
import { Container } from 'antd-moe';
import { useEffect, useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'wouter';
import xior from 'xior';
import { languages } from '../../config/i18n';
import Game from '../../types/Game';

export default function GameTranslatePage() {
  const { t, i18n } = useTranslation();
  const { gameId } = useParams<{ gameId: string }>();
  const [locale, setLocale] = useState(i18n.language === 'en' ? 'zh' : i18n.language);

  const { data: game, reload } = useFetch<Game>(`/games/${gameId}`, {
    params: { locale },
  });

  const translation = game?.translations?.find((tr: any) => tr.locale === locale);

  const handleSave = async (values: any) => {
    try {
      if (translation) {
        await xior.put(`/games/${gameId}/translations/${translation.id}`, {
          ...values,
          locale,
        });
      } else {
        await xior.post(`/games/${gameId}/translations`, {
          ...values,
          locale,
        });
      }
      message.success(t('saved'));
      await reload();
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        message.error(e.response.data.message);
      } else {
        message.error(t('error-saving'));
      }
    }
  };

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: translation ? translation.name : '',
    });
  }, [translation, form]);

  return (
    <Container maxWidth="lg" style={{ paddingTop: 24 }}>
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
          {
            title: (
              <Link href={`/platforms/${game?.platform?.id}`}>{game?.platform?.name || '...'}</Link>
            ),
          },
          {
            title: (
              <Link href={`/platforms/${game?.platform?.id}/games/${game?.id}`}>
                {translation?.name || game?.name || '...'}
              </Link>
            ),
          },
          { title: t('translate') },
        ]}
        style={{ marginBottom: 16 }}
      />

      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Typography.Title level={1} style={{ margin: 0 }}>
          {t('translate')}: {translation?.name || game?.name || '...'}
        </Typography.Title>
        <Select
          value={locale}
          onChange={setLocale}
          options={languages
            .filter((l) => l.code !== 'en')
            .map((l) => ({ value: l.code, label: l.name }))}
          style={{ width: 100 }}
        />
      </Flex>

      <Form form={form} layout="vertical" onFinish={handleSave}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label={t('name')}>
              <Input value={game?.name} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('name')} name="name" rules={[{ required: true }]}>
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
