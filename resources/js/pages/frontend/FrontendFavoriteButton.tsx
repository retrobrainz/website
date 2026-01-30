import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import xior from 'xior';
import { useAuth } from '../../contexts/auth/index.js';
import FrontendFavorite from '../../types/FrontendFavorite.js';

export interface FrontendFavoriteButtonProps {
  frontendId?: number | string;
  favoritesCount?: number;
  onToggle: () => void;
}

export default function FrontendFavoriteButton({
  frontendId,
  favoritesCount,
  onToggle,
}: FrontendFavoriteButtonProps) {
  const { isAuthenticated, user } = useAuth();

  const { data, reload } = useFetch<{ data: FrontendFavorite[] }>(
    `/frontends/${frontendId}/favorites`,
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
        if (isAuthenticated && frontendId) {
          setSubmitLoading(true);
          if (favorite) {
            xior
              .delete(`/frontends/${frontendId}/favorites/${favorite.id}`)
              .then(reload)
              .then(onToggle)
              .finally(() => {
                setSubmitLoading(false);
              });
          } else {
            xior
              .post(`/frontends/${frontendId}/favorites`, { frontendId })
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
