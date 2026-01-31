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
        return `/games/${entityId}/favorites`;
      case 'emulator':
        return `/emulators/${entityId}/favorites`;
      case 'frontend':
        return `/frontends/${entityId}/favorites`;
    }
  };

  // Determine the fetch params based on entity type
  const getFetchParams = () => {
    switch (entityType) {
      case 'game':
      case 'emulator':
      case 'frontend':
        return { userId: user?.id };
    }
  };

  // Helper function to get the delete URL based on entity type
  const getDeleteUrl = (favoriteId: number) => {
    switch (entityType) {
      case 'game':
        return `/games/${entityId}/favorites/${favoriteId}`;
      case 'emulator':
        return `/emulators/${entityId}/favorites/${favoriteId}`;
      case 'frontend':
        return `/frontends/${entityId}/favorites/${favoriteId}`;
    }
  };

  // Helper function to get the post URL and data based on entity type
  const getPostUrlAndData = () => {
    switch (entityType) {
      case 'game':
        return { url: `/games/${entityId}/favorites`, data: {} };
      case 'emulator':
        return { url: `/emulators/${entityId}/favorites`, data: {} };
      case 'frontend':
        return { url: `/frontends/${entityId}/favorites`, data: {} };
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
      const deleteUrl = getDeleteUrl(favorite.id);

      xior
        .delete(deleteUrl)
        .then(reload)
        .then(onToggle)
        .finally(() => {
          setSubmitLoading(false);
        });
    } else {
      // Create favorite
      const { url: postUrl, data: postData } = getPostUrlAndData();

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
