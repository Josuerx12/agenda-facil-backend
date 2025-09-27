import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNotificationsTable1758990651997
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE notifications (
                id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                tenant_id uuid NOT NULL,
                appointment_id uuid REFERENCES appointments(id),
                type text NOT NULL, -- reminder, confirmation, cancellation
                channel text NOT NULL, -- email/sms/push
                payload jsonb,
                scheduled_at timestamptz,
                sent_at timestamptz,
                status text DEFAULT 'pending',
                created_at timestamptz DEFAULT now()
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "notifications"
        `);
  }
}
