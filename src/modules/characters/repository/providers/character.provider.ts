import { TOKENSORM } from "src/common/types/type-orm";
import { DataSource, Repository } from "typeorm";
import { Characters } from "../../entity/characters";
import { CharactersRepository } from "../characters.respository";

export const characterProviders = [

    {
        provide: TOKENSORM.CHARACTER_SERVICE_REPOSITORY,
        useFactory: (dataSource: DataSource): Repository<Characters> =>
            dataSource.getRepository(Characters),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: TOKENSORM.CHARACTER_REPOSITORY,
        useFactory: (characterRepo: Repository<Characters>): CharactersRepository =>
            new CharactersRepository(characterRepo),
        inject: [TOKENSORM.CHARACTER_SERVICE_REPOSITORY],
    }

];