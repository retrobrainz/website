import { App, Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import xior from 'xior';
import { useAuth } from '../../contexts/auth/index.js';

export default function Login() {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const { setIsAuthenticated, setUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  return (
    <>
      <Button onClick={() => setOpen(true)}>{t('login')}</Button>

      <Modal
        title={t('login')}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => {
          form.validateFields().then((values) => {
            xior
              .post('/login', values)
              .then((res) => {
                if (res.status === 200) {
                  localStorage.setItem('authToken', res.data.token.token);
                  xior.defaults.headers.Authorization = `Bearer ${res.data.token.token}`;
                  setIsAuthenticated(true);
                  setUser(res.data.user);
                  message.success(t('login-success'));
                  setOpen(false);
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
          });
        }}
      >
        <Form form={form}>
          <Form.Item label={t('email')} name="email" rules={[{ required: true }]}>
            <Input type="email" />
          </Form.Item>
          <Form.Item label={t('password')} name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
