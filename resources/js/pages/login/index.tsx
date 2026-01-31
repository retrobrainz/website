import { App, Breadcrumb, Button, Card, Form, Input, Typography } from 'antd';
import { Container } from 'antd-moe';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'wouter';
import xior from 'xior';
import { useAuth } from '../../contexts/auth/index.js';

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const { setIsAuthenticated, setUser } = useAuth();
  const [, navigate] = useLocation();
  const [form] = Form.useForm();

  const handleSubmit = (values: LoginFormValues) => {
    xior
      .post('/login', values)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem('authToken', res.data.token.token);
          xior.defaults.headers.Authorization = `Bearer ${res.data.token.token}`;
          setIsAuthenticated(true);
          setUser(res.data.user);
          message.success(t('login-success'));
          navigate('/');
        } else {
          res.data?.errors?.forEach((err: any) => {
            message.error(err.message);
          });
        }
      })
      .catch((error) => {
        if (error.response?.data?.errors) {
          error.response.data.errors.forEach((err: any) => {
            message.error(err.message);
          });
        } else {
          message.error(error.response?.data?.message || error.message);
        }
      });
  };

  return (
    <Container maxWidth="sm">
      <Breadcrumb
        items={[{ title: <Link href="/">{t('home')}</Link> }, { title: t('login') }]}
        style={{ marginTop: 32 }}
      />
      <Typography.Title level={1}>{t('login')}</Typography.Title>

      <Card>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label={t('email')} name="email" rules={[{ required: true }]}>
            <Input type="email" />
          </Form.Item>
          <Form.Item label={t('password')} name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {t('login')}
            </Button>
          </Form.Item>
        </Form>
        <Typography.Paragraph style={{ textAlign: 'center', marginTop: 16 }}>
          {t('dont-have-account')} <Link href="/register">{t('register')}</Link>
        </Typography.Paragraph>
      </Card>
    </Container>
  );
}
