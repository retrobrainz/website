import { App, Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import xior from 'xior';
import { useAuth } from '../../contexts/auth/index.js';

export default function Register() {
  const { message } = App.useApp();
  const { setIsAuthenticated, setUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Register
      </Button>

      <Modal
        title="Register"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => {
          form.validateFields().then((values) => {
            xior
              .post('/register', values)
              .then((res) => {
                if (res.status === 200) {
                  localStorage.setItem('authToken', res.data.token.token);
                  xior.defaults.headers.Authorization = `Bearer ${res.data.token.token}`;
                  setIsAuthenticated(true);
                  setUser(res.data.user);
                  message.success('Registration succeeded');
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
          <Form.Item label="Username" name="username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
