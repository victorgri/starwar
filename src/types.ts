export interface HeroDetails {
  birth_year: string; // Рік народження
  eye_color: string; // Колір очей
  films: number[]; // Масив ID фільмів, в яких персонаж з'являється
  gender: string; // Стать
  hair_color: string; // Колір волосся
  height: string; // Зріст
  homeworld: number; // ID планети, де народився персонаж
  mass: string; // Маса персонажа
  name: string; // Ім'я персонажа
  skin_color: string; // Колір шкіри
  created: string; // Дата створення персонажа
  edited: string; // Дата останнього редагування
  species: number[]; // Масив ID видів
  starships: number[]; // Масив ID космічних кораблів, на яких персонаж подорожував
  url: string; // URL для доступу до персонажа
  vehicles: number[]; // Масив ID транспортних засобів, якими користувався персонаж
}


export interface Starship {
  MGLT: string
  cargo_capacity: string
  consumables: string
  cost_in_credits: string
  created: string
  crew: string
  edited: string
  hyperdrive_rating: string
  length: string
  manufacturer: string
  max_atmosphering_speed: string
  model: string
  name: string
  passengers: string
  films: number[]
  pilots: any[]
  starship_class: string
  url: string
}

export interface Film {
  characters: number[]; // Масив ID персонажів
  created: string; // Дата створення
  director: string; // Режисер
  edited: string; // Дата редагування
  episode_id: number; // Номер епізоду
  opening_crawl: string; // Опис початку фільму
  planets: number[]; // Масив ID планет
  producer: string; // Продюсери
  release_date: string; // Дата релізу
  species: number[]; // Масив ID видів
  starships: number[]; // Масив ID космічних кораблів
  title: string; // Назва фільму
  url: string; // URL для доступу до фільму
  vehicles: number[]; // Масив ID транспортних засобів
}
