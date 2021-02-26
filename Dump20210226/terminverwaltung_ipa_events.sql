CREATE DATABASE  IF NOT EXISTS `terminverwaltung_ipa` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `terminverwaltung_ipa`;
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: terminverwaltung_ipa
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `eventname` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `teacher` varchar(255) DEFAULT NULL,
  `class` varchar(255) NOT NULL,
  `groupsize` varchar(255) NOT NULL,
  `timespan` varchar(45) DEFAULT NULL,
  `student1` varchar(45) NOT NULL,
  `student2` varchar(45) DEFAULT NULL,
  `student3` varchar(45) DEFAULT NULL,
  `student4` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1572 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1565,'jhh','2021-03-03','Heimberg Matthias','inf18','2','3','adshay','maria',NULL,NULL),(1566,'jhh','2021-03-10','Heimberg Matthias','inf18','2','3','masato','hezekiah',NULL,NULL),(1567,'jhh','2021-03-17','Heimberg Matthias','inf18','2','3','erik','maria',NULL,NULL),(1568,'jhh','2021-03-30','Heimberg Matthias','inf18','2','3','klara','niroj',NULL,NULL),(1569,'jhh','2021-04-27','Heimberg Matthias','inf18','2','3','kavindu',NULL,NULL,NULL),(1570,'jhh','2021-05-11','Heimberg Matthias','inf18','2','3','sandro','yannis',NULL,NULL),(1571,'jhh','2021-05-18','Heimberg Matthias','inf18','2','3','andrin',NULL,NULL,NULL);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-26 13:17:28
