import { Breadcrumb } from 'antd';
import { useFetch } from 'react-fast-fetch';
import { Link, useParams } from 'wouter';

export default function GamePage() {
  const { gameId, platformId } = useParams();

  const { data: platform } = useFetch<any>(`/api/platforms/${platformId}`);

  const { data: game } = useFetch<any>(`/api/games/${gameId}`);

  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link href="/">Home</Link> },
          {
            title: (
              <Link
                href={`/platforms/${platformId}`}
              >{`${platform?.company?.name} - ${platform?.name}`}</Link>
            ),
          },
          {
            title: game?.name,
          },
        ]}
        style={{ marginBottom: 16 }}
      />

      <h1>{game?.name}</h1>

      <p>Details about the game will go here.</p>
    </div>
  );
}
