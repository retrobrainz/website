import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useLocation } from 'wouter';
import xior from 'xior';
import { useAuth } from '../../contexts/auth/index.js';
import EmulatorFavorite from '../../types/EmulatorFavorite.js';
import FrontendFavorite from '../../types/FrontendFavorite.js';
import GameFavorite from '../../types/GameFavorite.js';

type FavoriteType = GameFavorite | EmulatorFavorite | FrontendFavorite;

export interface FavoriteButtonProps {
  entityType: 'game' | 'emulator' | 'frontend';
  entityId?: number | string;
  favoritesCount?: number;
  onToggle: () => void;
}

export default function FavoriteButton({
  entityType,
  entityId,
  favoritesCount,
  onToggle,
}: FavoriteButtonProps) {
  const { isAuthenticated, user } = useAuth();
  const [, navigate] = useLocation();

  // Determine the API endpoint based on entity type
  const getFetchUrl = () => {
    switch (entityType) {
      case 'game':
        return '/favorites';
      case 'emulator':
        return `/emulators/${entityId}/favorites`;
      case 'frontend':
        return `/frontends/${entityId}/favorites`;
      default:
        return '';
    }
  };

  // Determine the fetch params based on entity type
  const getFetchParams = () => {
    switch (entityType) {
      case 'game':
        return { gameId: entityId, userId: user?.id };
      case 'emulator':
      case 'frontend':
        return { userId: user?.id };
      default:
        return {};
    }
  };

  const { data, reload } = useFetch<{ data: FavoriteType[] }>(getFetchUrl(), {
    params: getFetchParams(),
    disabled: !isAuthenticated,
  });

  const favorite = data?.data[0] || null;

  const [submitLoading, setSubmitLoading] = useState(false);

  const handleClick = () => {
    // If not authenticated, redirect to login page
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // If entityId is not provided, do nothing
    if (!entityId) {
      return;
    }

    setSubmitLoading(true);

    if (favorite) {
      // Delete favorite
      const deleteUrl =
        entityType === 'game'
          ? `/favorites/${favorite.id}`
          : `/${entityType}s/${entityId}/favorites/${favorite.id}`;

      xior
        .delete(deleteUrl)
        .then(reload)
        .then(onToggle)
        .finally(() => {
          setSubmitLoading(false);
        });
    } else {
      // Create favorite
      const postUrl =
        entityType === 'game' ? '/favorites' : `/${entityType}s/${entityId}/favorites`;
      const postData = entityType === 'game' ? { gameId: entityId } : {};

      xior
        .post(postUrl, postData)
        .then(reload)
        .then(onToggle)
        .finally(() => {
          setSubmitLoading(false);
        });
    }
  };

  return (
    <Button
      icon={favorite ? <HeartFilled style={{ color: 'var(--ant-red)' }} /> : <HeartOutlined />}
      loading={submitLoading}
      onClick={handleClick}
    >
      {favoritesCount}
    </Button>
  );
}
