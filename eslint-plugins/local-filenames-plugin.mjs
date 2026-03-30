import nestFilenameConventions from './nest-filename-conventions.mjs';

/**
 * Plugin ESLint local para el proyecto NestJS.
 * Agrupa las reglas de convenciones de nombres de archivo por tipo de artefacto.
 */
const localFilenamesPlugin = {
  rules: {
    ...nestFilenameConventions,
  },
};

export default localFilenamesPlugin;
