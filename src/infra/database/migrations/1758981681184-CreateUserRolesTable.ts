import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserRolesTable1758981681184 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE user_roles (
                id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
                role_id uuid NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
                created_at timestamptz DEFAULT now(),
                UNIQUE (user_id, tenant_id, role_id)
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "user_roles"
        `);
  }
}
