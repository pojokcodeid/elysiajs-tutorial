/*
  Warnings:

  - The primary key for the `todo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `todo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `userId` on the `todo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `todo` DROP FOREIGN KEY `Todo_userId_fkey`;

-- DropIndex
DROP INDEX `Todo_userId_fkey` ON `todo`;

-- AlterTable
ALTER TABLE `todo` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
