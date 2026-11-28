import * as migration_20260918_151419_initial from './20260918_151419_initial'
import * as migration_20261126_234854_modelo_datos from './20261126_234854_modelo_datos'
import * as migration_20261127_181034_cinta_anuncios from './20261127_181034_cinta_anuncios'
import * as migration_20261127_182440_home from './20261127_182440_home'
import * as migration_20261127_183000_frases_cinta from './20261127_183000_frases_cinta'

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
  {
    up: migration_20261127_181034_cinta_anuncios.up,
    down: migration_20261127_181034_cinta_anuncios.down,
    name: '20261127_181034_cinta_anuncios',
  },
  {
    up: migration_20261127_182440_home.up,
    down: migration_20261127_182440_home.down,
    name: '20261127_182440_home',
  },
  ,
  {
    up: migration_20261127_183000_frases_cinta.up,
    down: migration_20261127_183000_frases_cinta.down,
    name: '20261127_183000_frases_cinta',
  },
]
