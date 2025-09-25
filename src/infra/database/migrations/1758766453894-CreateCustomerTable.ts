import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCustomerTable1758766453894 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "customer" (
                "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
                "user_id" UUID NOT NULL,
                "name" VARCHAR(100) NOT NULL,
                "document" VARCHAR(100) NOT NULL,
                "phone" VARCHAR(15),
                "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),

                CONSTRAINT "PK_customer" PRIMARY KEY ("id"),
                CONSTRAINT "UQ_customer_user_id" UNIQUE ("user_id"),
                CONSTRAINT "UQ_customer_document" UNIQUE ("document"),
                CONSTRAINT "FK_customer_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "customer"
        `);
  }
}
