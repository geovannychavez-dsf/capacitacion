import { Characters } from '../entity/characters';

export interface CharactersInterface {
  findAllCharacters(): Promise<Characters[]>;

  findByNameCharacter(name: string): Promise<Characters>;
  findByIdCharacter(id: number): Promise<Characters>;
  createCharacter(character: Partial<Characters>): Promise<Characters>;
  createManyCharacters(characters: Partial<Characters>[]): Promise<Characters[]>;
  updateCharacter(id: number, character: Partial<Characters>): Promise<Characters>;
  deleteCharacter(id: number): Promise<Characters[]>;
}

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface Location {
  name: string;
  url: string;
}

export interface Origin {
  name: string;
  url: string;
}

export interface Characterinterfaces {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface RickAndMortyResponse {
  info: Info;
  results: Characterinterfaces[];
}
