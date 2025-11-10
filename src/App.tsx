// App.tsx
import React, { useState } from 'react';

import HeroDetailsComponent from './components/HeroDetailsComponent/HeroDetailsComponent';
import HeroList from './components/HeroList/HeroList';

const App: React.FC = () => {
  const [selectedHeroUrl, setSelectedHeroUrl] = useState<string | null>(null); // Стежимо за вибраним героєм

  // Повертаємо HeroList, якщо герой не вибраний, або HeroDetailsComponent, якщо вибраний
  return (
    <>
      {!selectedHeroUrl ? (
        <HeroList onSelectHero={setSelectedHeroUrl} /> // Передаємо функцію onSelectHero в HeroList
      ) : (
        <HeroDetailsComponent heroUrl={selectedHeroUrl} setSelectedHeroUrl={setSelectedHeroUrl} /> // Передаємо URL героя в HeroDetailsComponent
      )}
    </>
  );
};

export default App;
