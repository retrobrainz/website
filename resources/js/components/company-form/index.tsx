import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import Company from '../../types/Company.js';

export interface CompanyFormProps {
  company?: Company;
  onSubmit: (values: any) => Promise<void>;
  submitText: string;
}

export default function CompanyForm({ company, onSubmit, submitText }: CompanyFormProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        name: company?.name || '',
      }}
      onFinish={onSubmit}
    >
      <Form.Item label={t('name')} name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        {submitText}
      </Button>
    </Form>
  );
}
