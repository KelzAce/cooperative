import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1726661607576 implements MigrationInterface {
    name = 'Initial1726661607576'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('pending', 'verified')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "otp" character varying, "isEmailVerified" boolean NOT NULL DEFAULT false, "bvn" character varying, "bankAccountNumber" character varying, "photoUrl" character varying, "role" "public"."user_role_enum" NOT NULL DEFAULT 'member', "status" "public"."user_status_enum" NOT NULL DEFAULT 'pending', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
    }

}
