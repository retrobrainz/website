import { TranslationOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import xior from 'xior';
import { useAuth } from '../../contexts/auth/index.js';

export interface TranslateButtonProps {
  gameId?: number | string;
  onTranslate: () => void;
}

export default function TranslateButton({ gameId, onTranslate }: TranslateButtonProps) {
  const { isAuthenticated } = useAuth();

  const [submitLoading, setSubmitLoading] = useState(false);

  return (
    <Button
      icon={<TranslationOutlined />}
      loading={submitLoading}
      onClick={() => {
        if (isAuthenticated && gameId) {
          setSubmitLoading(true);
          xior
            .post('/translations', { gameId })
            .then(onTranslate)
            .finally(() => {
              setSubmitLoading(false);
            });
        }
      }}
    >
      Translate
    </Button>
  );
}
