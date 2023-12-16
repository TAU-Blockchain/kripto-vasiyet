CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_lastname` varchar(45) NOT NULL,
  `tc_no` int NOT NULL,
  `isAlive` tinyint(1) NOT NULL DEFAULT '1',
  `isRegistered` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `tc_no_UNIQUE` (`tc_no`)
) ENGINE=InnoDB AUTO_INCREMENT=1325 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
