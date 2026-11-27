import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`inicio_anuncios\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`texto\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`inicio\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`inicio_anuncios_order_idx\` ON \`inicio_anuncios\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`inicio_anuncios_parent_id_idx\` ON \`inicio_anuncios\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`inicio\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`inicio_anuncios\`;`)
  await db.run(sql`DROP TABLE \`inicio\`;`)
}
