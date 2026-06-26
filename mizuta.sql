-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-06-2026 a las 04:41:35
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mizuta`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` varchar(50) NOT NULL,
  `active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `image`, `category`, `active`) VALUES
(1, 'The Last of Us Part I', 4999.99, 'https://m.media-amazon.com/images/I/51G+PW49HpL._AC_UF1000,1000_QL80_.jpg', 'videojuegos', 1),
(2, 'God of War: Ragnarök', 5999.99, 'https://w0.peakpx.com/wallpaper/629/747/HD-wallpaper-god-of-war-ragnarok.jpg', 'videojuegos', 1),
(3, 'Elden Ring', 4499.99, 'https://i.pinimg.com/736x/56/2e/31/562e311c3db929a33e6919832120b6c7.jpg', 'videojuegos', 1),
(4, 'Hogwarts Legacy', 3999.99, 'https://static.promodescuentos.com/threads/raw/RSuCi/1154882_1/re/1024x1024/qt/60/1154882_1.jpg', 'videojuegos', 1),
(5, 'Joystick Ps5', 65000.00, 'https://www.dateks.lv/images/pic/1200/1200/399/1976.jpg', 'accesorios', 1),
(6, 'Auriculares Razor', 35000.00, 'https://katech.com.ar/wp-content/uploads/2025/11/Sin-nombre.jpg', 'accesorios', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
