import { App, Breadcrumb, Card, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'wouter';
import xior from 'xior';
import CompanyForm from '../../components/company-form/index.js';
import Company from '../../types/Company.js';

export default function CompanyEditPage() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const { companyId } = useParams<{ companyId: string }>();
  const [, setLocation] = useLocation();
  const { data: company } = useFetch<Company>(`/companies/${companyId}`);

  const handleSubmit = async (values: any) => {
    await xior.put(`/companies/${companyId}`, values);
    message.success(t('update-success'));
    setLocation(`/companies/${companyId}`);
  };

  return (
    <Container maxWidth="md">
      <Breadcrumb
        items={[
          { title: <Link href="/">{t('home')}</Link> },
          { title: <Link href="/companies">{t('companies')}</Link> },
          { title: <Link href={`/companies/${companyId}`}>{company?.name || '...'}</Link> },
          { title: t('edit') },
        ]}
        style={{ marginTop: 32 }}
      />
      <Typography.Title level={1}>
        {t('edit')}: {company?.name}
      </Typography.Title>

      <Card>
        <CompanyForm company={company} onSubmit={handleSubmit} submitText={t('save')} />
      </Card>
    </Container>
  );
}
