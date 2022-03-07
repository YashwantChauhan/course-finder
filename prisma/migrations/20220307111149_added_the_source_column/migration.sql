-- AlterTable
ALTER TABLE `Course` ADD COLUMN `source` ENUM('coursera', 'udemy', 'edx', 'youtube') NOT NULL DEFAULT 'coursera';
