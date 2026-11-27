import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`productos\` ADD \`destacado\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`inicio\` ADD \`foto_accesorios_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`inicio\` ADD \`foto_deportes_id\` integer REFERENCES media(id);`)
  await db.run(
    sql`CREATE INDEX \`inicio_foto_accesorios_idx\` ON \`inicio\` (\`foto_accesorios_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`inicio_foto_deportes_idx\` ON \`inicio\` (\`foto_deportes_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_inicio\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_inicio\`("id", "updated_at", "created_at") SELECT "id", "updated_at", "created_at" FROM \`inicio\`;`,
  )
  await db.run(sql`DROP TABLE \`inicio\`;`)
  await db.run(sql`ALTER TABLE \`__new_inicio\` RENAME TO \`inicio\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`ALTER TABLE \`productos\` DROP COLUMN \`destacado\`;`)
}
