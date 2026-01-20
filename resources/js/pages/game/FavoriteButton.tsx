import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import xior from 'xior';
import { useAuth } from '../../contexts/auth/index.js';
import Favorite from '../../types/Favorite.js';

export interface FavoriteButtonProps {
  gameId?: number | string;
  favoritesCount?: number;
  onToggle: () => void;
}

export default function FavoriteButton({ gameId, favoritesCount, onToggle }: FavoriteButtonProps) {
  const { isAuthenticated, user } = useAuth();

  const { data, reload } = useFetch<{ data: Favorite[] }>('/favorites', {
    params: { gameId, userId: user?.id },
    disabled: !isAuthenticated,
  });

  const favorite = data?.data[0] || null;

  const [submitLoading, setSubmitLoading] = useState(false);

  return (
    <Button
      icon={favorite ? <HeartFilled style={{ color: 'var(--ant-red)' }} /> : <HeartOutlined />}
      loading={submitLoading}
      onClick={() => {
        if (isAuthenticated && gameId) {
          setSubmitLoading(true);
          if (favorite) {
            xior
              .delete(`/favorites/${favorite.id}`)
              .then(reload)
              .then(onToggle)
              .finally(() => {
                setSubmitLoading(false);
              });
          } else {
            xior
              .post('/favorites', { gameId })
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
