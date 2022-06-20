import {MigrationInterface, QueryRunner} from "typeorm";

export class createTable1655693173531 implements MigrationInterface {
    name = 'createTable1655693173531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cloundinary" ("public_id" character varying NOT NULL, "asset_id" character varying, "version" integer, "version_id" character varying, "signature" character varying, "width" integer, "height" integer, "format" character varying, "resource_type" character varying NOT NULL, "created_at" TIMESTAMP, "bytes" integer, "type" character varying, "etag" character varying, "url" text NOT NULL DEFAULT '', "secure_url" text NOT NULL DEFAULT '', "original_filename" character varying, "original_extension" character varying, "api_key" character varying, CONSTRAINT "PK_40b7f78db8f5b5bb00d738bd65a" PRIMARY KEY ("public_id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "username" character varying NOT NULL, "email" character varying, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'USER', "confirmedEmail" boolean NOT NULL DEFAULT false, "phone" character varying, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "cloundinary"`);
    }

}
