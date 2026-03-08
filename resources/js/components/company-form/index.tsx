import { Button, Form, Input } from 'antd';
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
      form.setFieldsValue(company);
    }
  }, [company, form]);

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <Form.Item label={t('name')} name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Wikipedia" name="wikipedia">
        <Input type="url" />
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
