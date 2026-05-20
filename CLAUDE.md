# CLAUDE.md

Este archivo es leído por Claude Code (el CLI de Anthropic) cuando trabaja en este repo.
Coexiste con `.github/copilot-instructions.md`, que es el equivalente para GitHub Copilot.

## Comandos

```bash
npm test          # Correr tests con vitest
npm run typecheck # tsc --noEmit (debe pasar antes de abrir PR)
```

## Estructura del proyecto

```
src/
  index.ts          # Entry point, usa ESM imports
  routes/
    index.ts        # Router stub — acá va GET /health
tests/
  *.spec.ts         # Tests con vitest, paralelos a src/
.github/
  ISSUE_TEMPLATE/
    agent-task.yml  # Template para issues asignables al agente
  copilot-instructions.md  # Instrucciones para GitHub Copilot
```

## Convenciones de código

- TypeScript estricto. `tsc --noEmit` debe pasar.
- ESM modules (`type: "module"` en package.json).
- Archivos en `src/` exportan por nombre, nunca `default`.
- Tests en `tests/<area>.spec.ts`, paralelos a la estructura de `src/`.
- **vitest** para tests. No agregar otras librerías de testing.

## Convenciones de PR

- Siempre abrir el PR como **draft** con `gh pr create --draft`.
- No mergear sin que un humano revise. Branch protection lo bloquea, pero
  además es el contrato del LAB: humano siempre aprueba.
- Si los tests fallan después de 2 intentos, dejá el PR como está y
  comentá qué falló para que el humano decida.

## Cosas que NO hacer

- Modificar archivos en `.github/` (workflows, instructions, templates).
- Cambiar dependencias de `package.json` sin que esté en el issue.
- Tocar `tsconfig.json` o configuraciones de build.

## Contexto del LAB

Este repo es el compañero del apunte 6 del cuaderno GH-600 (GitHub Agentic AI).
El primer issue real que va a entrar es implementar `GET /health` en `src/routes/index.ts`.
La función `handleHealth()` ya existe como stub que devuelve `{ status: "not-implemented" }`.
