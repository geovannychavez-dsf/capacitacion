import { Injectable } from '@nestjs/common';

import { ICharactersInterface } from '../interfaces/caharacter-repository.interface';
import { Characters } from '../entity/characters';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class CharactersRepository implements ICharactersInterface {
  constructor(private readonly characterRepo: Repository<Characters>) { }
  async createCharacter(character: Partial<Characters>): Promise<Characters> {
    return await this.characterRepo.save(character);
  }
  async findByNameCharacter(name: string): Promise<Characters> {
    return await this.characterRepo.findOne({
      where: { name },
    });
  }
  async findAllCharacters(): Promise<Characters[]> {
    return await this.characterRepo.find();
  }
  async findByIdCharacter(id: number): Promise<Characters> {
    return await this.characterRepo.findOne({ where: { id } });
  }
  async createManyCharacters(characters: Partial<Characters>[]): Promise<Characters[]> {
    const charactersDb = await this.characterRepo.find();
    const charactersData: DeepPartial<Characters>[] = characters.map((c) => ({
      name: c.name,
      status: c.status,
      species: c.species,
      gender: c.gender,
      type: c.type,
      image: c.image,
    }));
    const charactersToSave = charactersData.filter(
      (c) => !charactersDb.some((db) => db.name === c.name),
    );
    const savedCharacters = await this.characterRepo.save(charactersToSave);
    return [...charactersDb, ...savedCharacters];
  }
  async updateCharacter(id: number, character: Partial<Characters>): Promise<Characters> {
    return await this.characterRepo.update({ id }, character).then(() => this.findByIdCharacter(id));
  }
  async deleteCharacter(id: number): Promise<Characters[]> {
    return await this.characterRepo.delete({ id }).then(() => this.findAllCharacters());
  }
}
