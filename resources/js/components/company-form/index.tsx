import { Button, DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Company from '../../types/Company';
import CompanySelect from '../company-select';

export interface CompanyFormProps {
  company?: Company;
  onSubmit: (values: any) => Promise<void>;
  submitText: string;
}

export default function CompanyForm({ company, onSubmit, submitText }: CompanyFormProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (company) {
      form.setFieldsValue({
        ...company,
        foundingDate: company.foundingDate ? dayjs(company.foundingDate) : null,
        defunctDate: company.defunctDate ? dayjs(company.defunctDate) : null,
      });
    }
  }, [company, form]);

  const handleSubmit = async (values: any) => {
    await onSubmit({
      ...values,
      foundingDate: values.foundingDate ? values.foundingDate.format('YYYY-MM-DD') : null,
      defunctDate: values.defunctDate ? values.defunctDate.format('YYYY-MM-DD') : null,
    });
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item label={t('name')} name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label={t('abbr')} name="abbr">
        <Input maxLength={64} />
      </Form.Item>

      <Form.Item label={t('wikipedia')} name="wikipedia">
        <Input type="url" />
      </Form.Item>

      <Form.Item label={t('founding-date')} name="foundingDate">
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label={t('defunct-date')} name="defunctDate">
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label={t('parent-company')} name="parentId">
        <CompanySelect allowClear excludeCompanyId={company?.id} />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        {submitText}
      </Button>
    </Form>
  );
}
