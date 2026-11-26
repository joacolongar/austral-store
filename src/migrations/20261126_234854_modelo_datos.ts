import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`productos_piedras\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`piedra_id\` integer,
  	\`x\` numeric,
  	\`y\` numeric,
  	FOREIGN KEY (\`piedra_id\`) REFERENCES \`piedras\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`productos\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`productos_piedras_order_idx\` ON \`productos_piedras\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`productos_piedras_parent_id_idx\` ON \`productos_piedras\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`productos_piedras_piedra_idx\` ON \`productos_piedras\` (\`piedra_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`productos\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`nombre\` text NOT NULL,
  	\`slug\` text,
  	\`mundo\` text DEFAULT 'bijouterie' NOT NULL,
  	\`tipo\` text NOT NULL,
  	\`precio\` numeric NOT NULL,
  	\`stock\` numeric DEFAULT 1 NOT NULL,
  	\`estado\` text DEFAULT 'borrador' NOT NULL,
  	\`descripcion\` text,
  	\`materiales\` text,
  	\`medidas\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`productos_slug_idx\` ON \`productos\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`productos_updated_at_idx\` ON \`productos\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`productos_created_at_idx\` ON \`productos\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`productos_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`productos\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`productos_rels_order_idx\` ON \`productos_rels\` (\`order\`);`)
  await db.run(
    sql`CREATE INDEX \`productos_rels_parent_idx\` ON \`productos_rels\` (\`parent_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`productos_rels_path_idx\` ON \`productos_rels\` (\`path\`);`)
  await db.run(
    sql`CREATE INDEX \`productos_rels_media_id_idx\` ON \`productos_rels\` (\`media_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`piedras\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`nombre\` text NOT NULL,
  	\`slug\` text,
  	\`color\` text DEFAULT '#9b6fc4' NOT NULL,
  	\`significado\` text NOT NULL,
  	\`propiedades\` text,
  	\`foto_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`foto_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`piedras_slug_idx\` ON \`piedras\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`piedras_foto_idx\` ON \`piedras\` (\`foto_id\`);`)
  await db.run(sql`CREATE INDEX \`piedras_updated_at_idx\` ON \`piedras\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`piedras_created_at_idx\` ON \`piedras\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`nombre\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`rol\` text DEFAULT 'editora' NOT NULL;`)
  // Los usuarios que ya existían (joaco) pasan a ser admin.
  await db.run(sql`UPDATE \`users\` SET \`rol\` = 'admin';`)
  await db.run(
    sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`productos_id\` integer REFERENCES productos(id);`,
  )
  await db.run(
    sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`piedras_id\` integer REFERENCES piedras(id);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_productos_id_idx\` ON \`payload_locked_documents_rels\` (\`productos_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_piedras_id_idx\` ON \`payload_locked_documents_rels\` (\`piedras_id\`);`,
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`productos_piedras\`;`)
  await db.run(sql`DROP TABLE \`productos\`;`)
  await db.run(sql`DROP TABLE \`productos_rels\`;`)
  await db.run(sql`DROP TABLE \`piedras\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`,
  )
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`,
  )
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`,
  )
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`nombre\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`rol\`;`)
}
