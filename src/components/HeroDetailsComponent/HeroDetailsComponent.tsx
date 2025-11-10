import React, { useEffect, useState } from 'react';
import { fetchHeroDetails } from '../../api';
import GraphVisualization from '../GraphVisualization/GraphVisualization';
import type { Film, HeroDetails, Starship } from '../../types';

interface HeroDetailsProps {
  heroUrl: string;
  setSelectedHeroUrl: React.Dispatch<React.SetStateAction<string | null>>
}

const HeroDetailsComponent: React.FC<HeroDetailsProps> = ({ heroUrl, setSelectedHeroUrl }) => {
  const [loading, setLoading] = useState(true);
  const [heroDetails, setHeroDetails] = useState<HeroDetails | null>(null);
  const [films, setFilms] = useState<Film[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);

  useEffect(() => {
    let isMounted = true; // Для скасування оновлення стану після розмонтування

    const getHeroDetails = async () => {
      setLoading(true);
      try {
        const details = await fetchHeroDetails(heroUrl);

        if (!isMounted) return;

        // Паралельно підвантажуємо фільми та кораблі
        const filmsPromises = details.films.map(async (filmId: string) => {
          const res = await fetch(`https://sw-api.starnavi.io/films/${filmId}/`);
          return res.json();
        });

        const starshipsPromises = details.starships.map(async (starshipId: string) => {
          const res = await fetch(`https://sw-api.starnavi.io/starships/${starshipId}/`);
          return res.json();
        });

        const [filmsData, starshipsData] = await Promise.all([
          Promise.all(filmsPromises),
          Promise.all(starshipsPromises),
        ]);

        if (!isMounted) return;

        // Оновлюємо стани одночасно, щоб мінімізувати ререндер
        setHeroDetails(details);
        setFilms(filmsData);
        setStarships(starshipsData);
      } catch (error) {
        console.error('Error fetching hero details:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getHeroDetails();

    return () => {
      isMounted = false; // скасовуємо оновлення після розмонтування компонента
    };
  }, [heroUrl]);

  if (loading) return <p>Loading...</p>;
  if (!heroDetails) return <p>Hero details not found!</p>;

  return (
    <div>
      <h2>{heroDetails.name}</h2>
      <GraphVisualization films={films} starships={starships} name={heroDetails.name} />
      <button onClick={() => setSelectedHeroUrl(null)}>BACK</button>
    </div>
  );
};

export default HeroDetailsComponent;
