# gh600-lab

Repo compañero del **LAB del apunte 6** del cuaderno [GH-600: GitHub Agentic AI](https://matiasbeltramone.com/apuntes/github-agentic-ai/lab-setup-base-copilot-coding-agent) en [matiasbeltramone.com](https://matiasbeltramone.com).

## ¿Qué pasó acá?

Este repo materializa el Dominio 1 de la cert GH-600 paso a paso:

- Scaffold con `tsconfig.json` y `vitest` configurados.
- Issue template estructurado (`.github/ISSUE_TEMPLATE/agent-task.yml`) con campos obligatorios de contexto, inputs, outputs y DoD.
- Custom instructions para los dos agentes posibles: `.github/copilot-instructions.md` y `CLAUDE.md`.
- Branch protection en `main` con `enforce_admins: true` y review requerido.
- Workflow de `claude-code-action` en agent mode (`.github/workflows/claude.yml`) que dispara con `@claude` y crea el draft PR automáticamente.

## ¿Cómo se usa?

Abrís un issue desde el template "Agent task" llenando los cuatro campos. Si querés que dispare Claude, incluí `@claude` en el body o título. El agente implementa, testea, y abre un draft PR contra `main`. Vos revisás, aprobás, mergeás. Branch protection bloquea cualquier intento de saltarse el review.

El paso a paso completo y el reasoning detrás de cada decisión están en el apunte.

## Stack

- Node 22+, TypeScript estricto, ESM.
- vitest para tests.
- GitHub Actions + `claude-code-action` para el agente cloud.

## Notas del equipo

Resumen generado a partir del MCP server `notes` (solo notas no-secretas):

- **Setup repo** — Crear el repo con `gh repo create` y armar el `.gitignore` antes de cualquier commit; no commitear `node_modules`.
- **Branch protection** — Activar branch protection en `main` vía `gh api PUT branches/main/protection` exigiendo al menos un review aprobado (`required_approving_review_count=1`).
