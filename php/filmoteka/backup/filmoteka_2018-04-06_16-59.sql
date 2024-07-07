#SKD101|filmoteka|1|2018.04.06 16:59:55|5|5

DROP TABLE IF EXISTS `films`;
CREATE TABLE `films` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `genre` text NOT NULL,
  `year` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 /*!40101 DEFAULT CHARSET=utf8 */;

INSERT INTO `films` VALUES
(1, 'Облачный атлас', 'драма', 2012),
(2, 'Такси 2\r\n', 'комедия', 2000),
(3, 'Аватар', 'драма', 2010),
(4, 'Элизиум', 'фантастика', 2016),
(6, 'Стрингер', 'драма', 2010);

