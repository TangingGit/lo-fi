CREATE DATABASE `robinhood` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

-- robinhood.card definition

CREATE TABLE `card` (
  `card_id` int NOT NULL AUTO_INCREMENT,
  `card_title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `card_desc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `card_create_date` timestamp NOT NULL,
  `card_status` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `card_active` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`card_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- robinhood.card_history definition

CREATE TABLE `card_history` (
  `card_id` int DEFAULT NULL,
  `card_history_date` datetime DEFAULT NULL,
  `card_history_desc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `card_history_title` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_history_status` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `card_history_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`card_history_id`),
  KEY `card_history_card_id_IDX` (`card_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- robinhood.comment definition

CREATE TABLE `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `card_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment_text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment_date` datetime DEFAULT NULL,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- robinhood.`user` definition

CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO robinhood.card (card_title,card_desc,card_create_date,card_status,card_active,user_id) VALUES
	 ('นัดสัมภาษณ์ 1','นัดสัมภาษณ์ 1','2023-03-14 17:04:45','Processing','0',1),
	 ('test 2','desc','2023-03-14 17:04:45','To Do','1',1);

INSERT INTO robinhood.card_history (card_id,card_history_date,card_history_desc,card_history_title,card_history_status,user_id) VALUES
	 (1,'2024-02-11 12:09:28','tang','tang','Processing',1),
	 (1,'2024-02-11 12:09:59','tang','tang','Processing',1),
	 (1,'2024-02-11 12:10:10','test','tang','Processing',1),
	 (1,'2024-02-12 11:58:42','test2','tang','Processing',1),
	 (1,'2024-02-12 11:59:26','test2','tang','Processing',1);

INSERT INTO robinhood.comment (user_id,card_id,comment_text,comment_date) VALUES
	 ('2','1','comment 2','2024-02-07 20:38:06'),
	 ('2','1','comment 3','2024-02-07 20:38:06');

INSERT INTO robinhood.`user` (user_name,user_password) VALUES
	 ('tang','1234'),
	 ('test','1234');
