-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Teacher`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Teacher` (
  `emailTeacher` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`emailTeacher`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Student` (
  `emailStudent` VARCHAR(45) NOT NULL,
  `suspended` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`emailStudent`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Teacher_has_Student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Teacher_has_Student` (
  `Teacher_emailTeacher` VARCHAR(40) NOT NULL,
  `Student_emailStudent` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Teacher_emailTeacher`, `Student_emailStudent`),
  INDEX `fk_Teacher_has_Student_Student1_idx` (`Student_emailStudent` ASC) VISIBLE,
  INDEX `fk_Teacher_has_Student_Teacher1_idx` (`Teacher_emailTeacher` ASC) VISIBLE,
  CONSTRAINT `fk_Teacher_has_Student_Teacher1`
    FOREIGN KEY (`Teacher_emailTeacher`)
    REFERENCES `mydb`.`Teacher` (`emailTeacher`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Teacher_has_Student_Student1`
    FOREIGN KEY (`Student_emailStudent`)
    REFERENCES `mydb`.`Student` (`emailStudent`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
