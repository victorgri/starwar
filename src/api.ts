export const fetchHeroes = async (page: number) => {
  const response = await fetch(`https://sw-api.starnavi.io/people?page=${page}`);
  const data = await response.json();
  return data.results;
};

export const fetchHeroDetails = async (heroUrl: string) => {
  const response = await fetch(heroUrl);
  const data = await response.json();
  return data;
};
