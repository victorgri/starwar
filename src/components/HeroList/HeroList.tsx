
import React, { useState, useEffect } from 'react';
import { fetchHeroes } from '../../api';
import type { HeroDetails } from '../../types';


interface HeroListProps {
  onSelectHero: (heroUrl: string) => void;
}

const HeroList: React.FC<HeroListProps> = ({ onSelectHero }) => {
  const [heroes, setHeroes] = useState<HeroDetails[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getHeroes = async () => {
      const newHeroes = await fetchHeroes(page);
      setHeroes((prevHeroes) => [...prevHeroes, ...newHeroes]);
    };

    getHeroes();
  }, [page]);

  return (
    <div className='hero-list'>

        {heroes.map((hero) => (
          <a 
            href={hero.name} 
            key={hero.url} 
            onClick={(e) => {e.preventDefault(); onSelectHero(hero.url)}} 
            className='hero-list__item'
          >
            {hero.name}
          </a>
        ))}

      <button onClick={() => setPage((prevPage) => prevPage + 1)}>Load More</button>
    </div>
  );
};

export default HeroList;
