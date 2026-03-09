import { App, Button, DatePicker, Form, Input, Select } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import type Company from '../../types/Company';
import type Game from '../../types/Game';
import type Language from '../../types/Language';
import type Platform from '../../types/Platform';
import type Region from '../../types/Region';
import type Title from '../../types/Title';
import ImageUpload from '../image-upload';

interface GameFormProps {
  game?: Game;
  initialPlatformId?: number;
  onSubmit: (values: any) => Promise<void>;
  submitText: string;
}

export default function GameForm({ game, initialPlatformId, onSubmit, submitText }: GameFormProps) {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [titleSearch, setTitleSearch] = useState('');
  const [debouncedTitleSearch, setDebouncedTitleSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTitleSearch(titleSearch.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [titleSearch]);

  const selectedTitleId = Form.useWatch('titleId', form);

  const { data: platforms } = useFetch<Platform[]>('/platforms');
  const { data: regions } = useFetch<Region[]>('/regions');
  const { data: languages } = useFetch<Language[]>('/languages');
  const { data: companiesData } = useFetch<{ data: Company[] }>('/companies', {
    params: { pageSize: 200 },
  });

  const { data: titlesData, loading: loadingTitles } = useFetch<{ data: Title[] }>('/titles', {
    params: {
      pageSize: 20,
      search: debouncedTitleSearch || undefined,
    },
  });

  const shouldFetchSelectedTitle =
    typeof selectedTitleId === 'number' &&
    !debouncedTitleSearch &&
    !titlesData?.data?.some((title) => title.id === selectedTitleId);

  const { data: selectedTitle } = useFetch<Title>(`/titles/${selectedTitleId}`, {
    disabled: !shouldFetchSelectedTitle,
  });

  const titleOptions = useMemo(() => {
    const options =
      titlesData?.data?.map((title) => ({
        value: title.id,
        label: title.translations?.[0]?.name || title.name,
      })) || [];

    if (!selectedTitle || options.some((option) => option.value === selectedTitle.id)) {
      return options;
    }

    return [
      {
        value: selectedTitle.id,
        label: selectedTitle.translations?.[0]?.name || selectedTitle.name,
      },
      ...options,
    ];
  }, [selectedTitle, titlesData?.data]);

  useEffect(() => {
    if (game) {
      form.setFieldsValue({
        platformId: game.platformId,
        titleId: game.titleId,
        name: game.name,
        releaseDate: game.releaseDate ? dayjs(game.releaseDate) : null,
        esrbRating: game.esrbRating,
        pegiRating: game.pegiRating,
        developerIds: game.developers?.map((developer) => developer.id) || [],
        publisherIds: game.publishers?.map((publisher) => publisher.id) || [],
        regionIds: game.regions?.map((region) => region.id) || [],
        languageIds: game.languages?.map((language) => language.id) || [],
        boxart: game.boxart || null,
        logo: game.logo || null,
        screenshot: game.screenshot || null,
        titlescreen: game.titlescreen || null,
      });
      return;
    }

    if (initialPlatformId) {
      form.setFieldValue('platformId', initialPlatformId);
    }
  }, [form, game, initialPlatformId]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        releaseDate: values.releaseDate ? values.releaseDate.format('YYYY-MM-DD') : null,
        boxartId: values.boxart?.id || null,
        logoId: values.logo?.id || null,
        screenshotId: values.screenshot?.id || null,
        titlescreenId: values.titlescreen?.id || null,
      };

      delete payload.boxart;
      delete payload.logo;
      delete payload.screenshot;
      delete payload.titlescreen;

      await onSubmit(payload);
    } catch (error: any) {
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err: any) => {
          message.error(err.message);
        });
      } else {
        message.error(error.response?.data?.message || error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const companyOptions =
    companiesData?.data?.map((company) => ({
      value: company.id,
      label: company.name,
    })) || [];

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item label={t('name')} name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label={t('platform')} name="platformId" rules={[{ required: true }]}>
        <Select
          options={
            platforms?.map((platform) => ({ value: platform.id, label: platform.name })) || []
          }
          placeholder={t('select')}
          showSearch
          optionFilterProp="label"
        />
      </Form.Item>

      <Form.Item label={t('title')} name="titleId">
        <Select
          allowClear
          showSearch
          filterOption={false}
          onSearch={setTitleSearch}
          options={titleOptions}
          loading={loadingTitles}
          placeholder={t('select')}
        />
      </Form.Item>

      <Form.Item label={t('release-date')} name="releaseDate">
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label={t('esrb-rating')} name="esrbRating">
        <Input maxLength={4} />
      </Form.Item>

      <Form.Item label={t('pegi-rating')} name="pegiRating">
        <Input maxLength={2} />
      </Form.Item>

      <Form.Item label={t('developers')} name="developerIds">
        <Select mode="multiple" options={companyOptions} placeholder={t('select')} showSearch />
      </Form.Item>

      <Form.Item label={t('publishers')} name="publisherIds">
        <Select mode="multiple" options={companyOptions} placeholder={t('select')} showSearch />
      </Form.Item>

      <Form.Item label={t('regions')} name="regionIds">
        <Select
          mode="multiple"
          options={regions?.map((region) => ({ value: region.id, label: region.name })) || []}
          placeholder={t('select')}
          showSearch
          optionFilterProp="label"
        />
      </Form.Item>

      <Form.Item label={t('languages')} name="languageIds">
        <Select
          mode="multiple"
          options={
            languages?.map((language) => ({ value: language.id, label: language.name })) || []
          }
          placeholder={t('select')}
          showSearch
          optionFilterProp="label"
        />
      </Form.Item>

      <Form.Item label={t('boxart')} name="boxart">
        <ImageUpload width="1024" height="1024" fit="inside" />
      </Form.Item>

      <Form.Item label={t('logo')} name="logo">
        <ImageUpload width="1024" height="1024" fit="inside" />
      </Form.Item>

      <Form.Item label={t('screenshot')} name="screenshot">
        <ImageUpload width="1280" height="720" fit="inside" />
      </Form.Item>

      <Form.Item label={t('titlescreen')} name="titlescreen">
        <ImageUpload width="1280" height="720" fit="inside" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
}
