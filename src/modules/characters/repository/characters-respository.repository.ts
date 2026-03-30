import { Injectable } from '@nestjs/common';

import { CharactersInterface } from '../interfaces/caharacter-repository.interface';
import { Characters } from '../entity/characters.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class CharactersRepository implements CharactersInterface {
  constructor(private readonly characterRepo: Repository<Characters>) {}
  async createCharacter(character: Partial<Characters>): Promise<Characters> {
    return await this.characterRepo.save(character);
  }
  async findByNameCharacter(name: string): Promise<Characters> {
    return await this.characterRepo.findOne({
      where: { name },
    });
  }
  async findAllCharacters(): Promise<Characters[]> {
    return await this.characterRepo.find({
      select: ['id', 'name', 'status', 'species', 'gender', 'type', 'image'],
    });
  }
  async findByIdCharacter(id: number): Promise<Characters> {
    return await this.characterRepo.findOne({
      where: { id },
      select: ['id', 'name', 'status', 'species', 'gender', 'type', 'image'],
    });
  }
  async createManyCharacters(characters: Partial<Characters>[]): Promise<Characters[]> {
    const charactersDatabase = await this.characterRepo.find({
      select: ['id', 'name', 'status', 'species', 'gender', 'type', 'image'],
    });
    const charactersData: DeepPartial<Characters>[] = characters.map((character) => ({
      name: character.name,
      status: character.status,
      species: character.species,
      gender: character.gender,
      type: character.type,
      image: character.image,
    }));
    const charactersToSave = charactersData.filter(
      (character) =>
        !charactersDatabase.some((charactersdb) => charactersdb.name === character.name),
    );
    const savedCharacters = await this.characterRepo.save(charactersToSave);
    return [...charactersDatabase, ...savedCharacters];
  }
  async updateCharacter(id: number, character: Partial<Characters>): Promise<Characters> {
    return await this.characterRepo
      .update({ id }, character)
      .then(() => this.findByIdCharacter(id));
  }
  async deleteCharacter(id: number): Promise<Characters[]> {
    return await this.characterRepo.delete({ id }).then(() => this.characterRepo.find());
  }
}
