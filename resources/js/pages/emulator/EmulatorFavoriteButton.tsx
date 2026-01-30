import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import xior from 'xior';
import { useAuth } from '../../contexts/auth/index.js';
import EmulatorFavorite from '../../types/EmulatorFavorite.js';

export interface EmulatorFavoriteButtonProps {
  emulatorId?: number | string;
  favoritesCount?: number;
  onToggle: () => void;
}

export default function EmulatorFavoriteButton({
  emulatorId,
  favoritesCount,
  onToggle,
}: EmulatorFavoriteButtonProps) {
  const { isAuthenticated, user } = useAuth();

  const { data, reload } = useFetch<{ data: EmulatorFavorite[] }>(
    `/emulators/${emulatorId}/favorites`,
    {
      params: { userId: user?.id },
      disabled: !isAuthenticated,
    },
  );

  const favorite = data?.data[0] || null;

  const [submitLoading, setSubmitLoading] = useState(false);

  return (
    <Button
      icon={favorite ? <HeartFilled style={{ color: 'var(--ant-red)' }} /> : <HeartOutlined />}
      loading={submitLoading}
      onClick={() => {
        if (isAuthenticated && emulatorId) {
          setSubmitLoading(true);
          if (favorite) {
            xior
              .delete(`/emulators/${emulatorId}/favorites/${favorite.id}`)
              .then(reload)
              .then(onToggle)
              .finally(() => {
                setSubmitLoading(false);
              });
          } else {
            xior
              .post(`/emulators/${emulatorId}/favorites`, { emulatorId })
              .then(reload)
              .then(onToggle)
              .finally(() => {
                setSubmitLoading(false);
              });
          }
        }
      }}
    >
      {favoritesCount}
    </Button>
  );
}
