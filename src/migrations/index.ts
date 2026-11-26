import * as migration_20260918_151419_initial from './20260918_151419_initial'
import * as migration_20261126_234854_modelo_datos from './20261126_234854_modelo_datos'

export const migrations = [
  {
    up: migration_20260918_151419_initial.up,
    down: migration_20260918_151419_initial.down,
    name: '20260918_151419_initial',
  },
  {
    up: migration_20261126_234854_modelo_datos.up,
    down: migration_20261126_234854_modelo_datos.down,
    name: '20261126_234854_modelo_datos',
  },
]
