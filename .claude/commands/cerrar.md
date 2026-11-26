---
description: Cerrar la sesión dejando la bitácora al día
---

Cerrá la sesión dejando todo listo para que otra sesión retome:

1. Corré lint, typecheck y los tests de lo que se tocó. Si algo falla, anotalo.
2. En `docs/BITACORA.md`:
   - Agregá una entrada arriba de todo en "Sesiones" con la fecha de hoy, el issue, qué se hizo, qué quedó pendiente, problemas encontrados y supuestos que tomaste.
   - Reescribí "Estado actual" y "Próximos pasos" para que reflejen la realidad.
   - Actualizá "Pendientes de joaco" si hay algo nuevo que necesites de mí.
3. Si se tomó alguna decisión de fondo y no está en `docs/DECISIONES.md`, agregala.
4. Si cambió algún comando, regla o convención, actualizá `CLAUDE.md` (mantenelo corto).
5. Hacé commit de todo (`docs(bitacora): cierre de sesión <fecha>` si es solo la bitácora), pusheá la rama y abrí o actualizá el PR con `Closes #n` si la tarea está completa.
6. Decime en 3 líneas qué quedó hecho, qué sigue y qué necesitás de mí.

$ARGUMENTS
