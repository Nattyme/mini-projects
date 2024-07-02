-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: MySQL-5.7
-- Время создания: Июл 02 2024 г., 17:06
-- Версия сервера: 5.7.44
-- Версия PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `filmoteka`
--

-- --------------------------------------------------------

--
-- Структура таблицы `films`
--

CREATE TABLE `films` (
  `id` int(11) NOT NULL,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `genre` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `films`
--

INSERT INTO `films` (`id`, `title`, `genre`, `year`) VALUES
(1, 'Большая игра', 'драма', 2017),
(2, 'Ты водишь!', 'комедия', 2018),
(3, 'Красный воробей', 'боевик', 2018),
(4, 'Опасный бизнес', 'боевик', 2018),
(5, 'Опасная игра Слоун', 'драма, преступление', 2016),
(6, 'Короче ', 'фантастика, фэнтези, драма ', 2017),
(7, 'Дэдпул 2', 'фантастика, боевик, комедия, приключения', 2018),
(8, 'Афера доктора Нока ', 'драма ', 2017),
(9, 'Мстители: Война бесконечности ', 'фантастика, боевик, приключения ', 2018),
(10, 'Чёрная пантера', 'фантастика, боевик, приключения ', 2018),
(11, 'Рок-н-рольщик ', 'преступление, боевик, триллер ', 2008),
(12, 'Три билборда на границе Эббинга, Миссури ', 'драма, преступление ', 2017),
(13, ' Чужой ', ' ужасы ', 1979),
(14, ' Властелин колец: Братство Кольца ', ' фэнтези, приключения, драма, боевик ', 2001),
(15, ' Мачеха ', ' драма, комедия ', 1998),
(16, ' Сквозь горизонт ', ' ужасы, фантастика, триллер, детектив ', 1997),
(17, ' Пекло ', ' фантастика, триллер ', 2007),
(18, 'Знаки', 'фантастика, триллер, драма, детектив ', 2002),
(19, ' Чудо на Гудзоне ', ' драма, биография ', 2016),
(20, ' Бегущий по лезвию ', ' фантастика, драма, детектив, боевик ', 1982),
(21, ' Матрица ', ' фантастика, боевик ', 1999);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `films`
--
ALTER TABLE `films`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `films`
--
ALTER TABLE `films`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
