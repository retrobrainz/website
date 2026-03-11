import { Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './index.css';

export interface WikipediaExcerptProps {
  url?: string | null;
}

export default function WikipediaExcerpt({ url }: WikipediaExcerptProps) {
  const { t } = useTranslation();
  const [extract, setExtract] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) {
      setExtract(null);
      return;
    }

    const controller = new AbortController();

    try {
      const parsedUrl = new URL(url);
      const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}`;
      // Use substring to precisely strip the leading '/wiki/' prefix
      const articleTitle = parsedUrl.pathname.startsWith('/wiki/')
        ? decodeURIComponent(parsedUrl.pathname.substring(6))
        : decodeURIComponent(parsedUrl.pathname.slice(1));
      const apiUrl = `${baseUrl}/w/api.php?action=query&titles=${encodeURIComponent(articleTitle)}&prop=extracts&exintro=true&format=json&origin=*`;

      setLoading(true);

      fetch(apiUrl, { signal: controller.signal })
        .then((res) => res.json())
        .then((data) => {
          const pages = data?.query?.pages;
          if (pages) {
            const page = Object.values(pages)[0] as { extract?: string };
            setExtract(page?.extract || null);
          }
        })
        .catch((err) => {
          if (err?.name !== 'AbortError') {
            setExtract(null);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch {
      setExtract(null);
      setLoading(false);
    }

    return () => {
      controller.abort();
    };
  }, [url]);

  if (!url || (!loading && !extract)) return null;

  return (
    <div>
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          {/* The MediaWiki Action API sanitizes extract HTML through its own parser,
              stripping scripts and other dangerous elements before returning it. */}
          {/* eslint-disable-next-line react/no-danger */}
          <div className="wikipedia-excerpt" dangerouslySetInnerHTML={{ __html: extract || '' }} />
          <a href={url} target="_blank" rel="noopener noreferrer">
            {t('view-more-on-wikipedia')}
          </a>
        </>
      )}
    </div>
  );
}
