# Notas de versión de InciTrack

## v1.1.0

### Nueva funcionalidad

- Se incorporó un selector para filtrar el listado de incidencias por estado.
- Se permite consultar todas las incidencias, las abiertas y las que están en proceso.
- Se actualizó la identificación visible de la aplicación a `v1.1.0`.

### Validación

- Se agregaron pruebas automatizadas para la consulta completa y para los filtros **Abierta** y **En proceso**.
- Se amplió la validación de estructura para comprobar la presencia del selector.

### Problema conocido

- El filtro **Resuelta** no muestra las incidencias resueltas. El comportamiento queda documentado para corregirse en `v1.1.1` mediante el proceso de mejora continua.
