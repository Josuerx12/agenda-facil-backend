import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuditLogsTable1758990581007 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE audit_logs (
                id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                tenant_id uuid,
                user_id uuid,
                action text NOT NULL,
                resource text,
                resource_id uuid,
                details jsonb,
                created_at timestamptz DEFAULT now()
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE audit_logs
        `);
  }
}
