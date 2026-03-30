import path from 'node:path';

const KEBAB = '[a-z0-9]+(?:-[a-z0-9]+)*';

/**
 * Genera una regla ESLint que valida que el nombre del archivo sea:
 * kebab-case.<suffix>.ts  (o index.ts como barrel)
 *
 * @param {string} suffix  Sin puntos: "controller" | "service" | "module" | etc.
 * @param {string} description
 */
function createNestFilenameRule(suffix, description) {
  const pattern = new RegExp(`^(?:index\\.ts|${KEBAB}\\.${suffix}\\.ts)$`);
  return {
    meta: {
      type: 'suggestion',
      docs: { description },
      schema: [],
      messages: {
        invalid:
          'El archivo "{{filename}}" debe ser kebab-case y terminar en ".{{suffix}}.ts" (excepto barrels "index.ts").',
      },
    },
    create(context) {
      return {
        Program(node) {
          const filePath = context.getFilename();
          if (filePath === '<text>' || filePath.endsWith('.md')) return;
          const base = path.basename(filePath);
          if (!pattern.test(base)) {
            context.report({ node, messageId: 'invalid', data: { filename: base, suffix } });
          }
        },
      };
    },
  };
}

const nestFilenameConventions = {
  'controller-filename': createNestFilenameRule('controller', 'En NestJS: kebab-case.controller.ts'),
  'service-filename': createNestFilenameRule('service', 'En NestJS: kebab-case.service.ts'),
  'module-filename': createNestFilenameRule('module', 'En NestJS: kebab-case.module.ts'),
  'guard-filename': createNestFilenameRule('guard', 'En NestJS: kebab-case.guard.ts'),
  'interceptor-filename': createNestFilenameRule('interceptor', 'En NestJS: kebab-case.interceptor.ts'),
  'filter-filename': createNestFilenameRule('filter', 'En NestJS: kebab-case.filter.ts'),
  'decorator-filename': createNestFilenameRule('decorator', 'En NestJS: kebab-case.decorator.ts'),
  'dto-filename': createNestFilenameRule('dto', 'En NestJS: kebab-case.dto.ts'),
  'entity-filename': createNestFilenameRule('entity', 'En NestJS: kebab-case.entity.ts'),
  'interface-filename': createNestFilenameRule('interface', 'En NestJS: kebab-case.interface.ts'),
  'adapter-filename': createNestFilenameRule('adapter', 'En NestJS: kebab-case.adapter.ts'),
  'repository-filename': createNestFilenameRule('repository', 'En NestJS: kebab-case.repository.ts'),
  'provider-filename': createNestFilenameRule('provider', 'En NestJS: kebab-case.provider.ts'),
  'middleware-filename': createNestFilenameRule('middleware', 'En NestJS: kebab-case.middleware.ts'),
};

export default nestFilenameConventions;
