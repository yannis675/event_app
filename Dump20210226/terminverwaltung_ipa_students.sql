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
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `class` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'INF18','yannis','anderegg'),(2,'INF18','kavindu','pathiranage'),(3,'INF18','usman','hashmi'),(4,'INF18','erik','mosegaart'),(5,'INF18','noah','ferrari'),(6,'INF18','niroj','sivananthan'),(7,'INF18','adshay','puspanathan'),(8,'INF18','masato','mumenthaler'),(18,'INF18','hezekiah','johnson'),(19,'INF18','samis','moser'),(20,'INF18','liam','benedetti'),(21,'INF18','sandro','volery'),(23,'INF18','klara','duricova'),(24,'INF18','vinujhan','vivilanathan'),(25,'INF18','andrin','schranz'),(26,'INF18','maria','makic'),(27,'INF19','haris','alilovsky'),(28,'INF19','ermias','bohn'),(29,'INF19','janic','deuble'),(30,'INF19','jonas','dietrich'),(31,'INF19','vinzent','fankhauser'),(32,'INF19','david','gloor'),(33,'INF19','keith','hager'),(34,'INF19','alec','jovicic'),(35,'INF19','michael','schmid'),(36,'INF19','levin','sigrist'),(37,'INF19','elio','thalmann'),(38,'INF19','emmanuel','walter'),(39,'INF19','yoarjun','yogarajah'),(40,'INF19','agon','zeka'),(41,'INF20','ziyam','alphonsus'),(42,'INF20','efe','avci'),(43,'INF20','nao','davesne'),(44,'INF20','cenk','eren'),(45,'INF20','sven','hayoz'),(46,'INF20','louis','holzer'),(47,'INF20','samuel','kabbani'),(48,'INF20','nicholas','krebs'),(49,'INF20','dhruv','kumar'),(50,'INF20','anhtan','le'),(51,'INF20','diego','leuenberger'),(52,'INF20','hoang','meyer'),(53,'INF20','riki','mischon'),(54,'INF20','leon','neiger'),(55,'INF20','danilo','pizurica'),(56,'INF20','detjon','ramadani'),(57,'INF20','linus','schaub'),(58,'INF20','mael','tobler'),(59,'INF20','mathis','tomio');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
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
