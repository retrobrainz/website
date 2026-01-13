import { Button, Form, Modal } from 'antd';
import { useState } from 'react';

export default function Login() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Login
      </Button>

      <Modal title="Login" open={open} onCancel={() => setOpen(false)} footer={null}>
        <Form>TODO</Form>
      </Modal>
    </>
  );
}
