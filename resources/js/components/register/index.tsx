import { App, Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import xior from 'xior';

export default function Register() {
  const { message } = App.useApp();
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
              .post('/api/register', values)
              .then((res) => {
                console.log(res.data);
                setOpen(false);
                message.success('Registration succeeded');
              })
              .catch((error) => {
                message.error(error.response?.data?.message || error.message);
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
