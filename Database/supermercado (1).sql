-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-07-2025 a las 03:26:07
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
-- Base de datos: `supermercado`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito_compras`
--

CREATE TABLE `carrito_compras` (
  `id_carrito` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha_creacion_carrito` timestamp NOT NULL DEFAULT current_timestamp(),
  `como_recibir` enum('Domicilio','Recoger en negocio') NOT NULL,
  `fecha_entrega` datetime DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `estado` enum('Activo','Inactivo') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrito_compras`
--

INSERT INTO `carrito_compras` (`id_carrito`, `id_usuario`, `fecha_creacion_carrito`, `como_recibir`, `fecha_entrega`, `observaciones`, `estado`) VALUES
(1, 8, '2025-04-28 05:00:00', 'Domicilio', NULL, 'sino hay coca cola, una sprite está bien', 'Activo'),
(2, 8, '2025-04-28 05:00:00', 'Recoger en negocio', '2025-04-30 00:00:00', 'Paso al medio dia, gracias :D', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(35) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre`, `descripcion`) VALUES
(1, 'Despensa', 'Productos Arroz, Harina, Maizena y similares');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datosempresa`
--

CREATE TABLE `datosempresa` (
  `nombre` varchar(30) NOT NULL,
  `logo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `datosempresa`
--

INSERT INTO `datosempresa` (`nombre`, `logo`) VALUES
('Super Tienda Llanera', '/img/tulogoaqui.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_carrito`
--

CREATE TABLE `detalle_carrito` (
  `id_detalle` int(11) NOT NULL,
  `id_carrito` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_carrito`
--

INSERT INTO `detalle_carrito` (`id_detalle`, `id_carrito`, `id_producto`, `cantidad`) VALUES
(1, 1, 1, 5),
(2, 2, 1, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_pedidos`
--

CREATE TABLE `historial_pedidos` (
  `id_historial` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_detalle` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial_pedidos`
--

INSERT INTO `historial_pedidos` (`id_historial`, `id_usuario`, `id_detalle`) VALUES
(1, 8, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `id_inventario` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodo_de_pago`
--

CREATE TABLE `metodo_de_pago` (
  `id_pago` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `tipo_pago` enum('Tarjeta','PSE','Efectivo') NOT NULL,
  `numero_tarjeta` int(11) DEFAULT NULL,
  `fecha_vencimiento` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `metodo_de_pago`
--

INSERT INTO `metodo_de_pago` (`id_pago`, `id_usuario`, `tipo_pago`, `numero_tarjeta`, `fecha_vencimiento`) VALUES
(2, 8, 'Tarjeta', 4222222, '2026-11-01'),
(3, 8, 'PSE', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado` varchar(50) DEFAULT 'Pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id_pedido`, `id_usuario`, `fecha`, `estado`) VALUES
(5, NULL, '2025-06-22 19:35:54', 'Pendiente'),
(6, NULL, '2025-06-22 19:39:37', 'Pendiente'),
(7, NULL, '2025-06-22 19:40:21', 'Pendiente'),
(8, 13, '2025-06-22 19:41:28', 'Pendiente'),
(9, 13, '2025-06-22 19:48:44', 'Pendiente'),
(10, 13, '2025-06-23 17:19:26', 'Pendiente'),
(11, 13, '2025-06-23 22:52:20', 'Pendiente'),
(12, 13, '2025-06-23 22:52:26', 'Pendiente'),
(13, 13, '2025-06-23 22:57:29', 'Pendiente'),
(14, 13, '2025-06-23 22:57:34', 'Pendiente'),
(15, 13, '2025-06-23 23:00:28', 'Pendiente'),
(16, 13, '2025-06-25 01:13:16', 'Pendiente'),
(17, 13, '2025-06-25 01:13:17', 'Pendiente'),
(18, 13, '2025-06-25 01:14:18', 'Pendiente'),
(19, 13, '2025-06-25 01:14:18', 'Pendiente'),
(20, 13, '2025-06-25 01:14:18', 'Pendiente'),
(21, 13, '2025-06-25 01:14:18', 'Pendiente'),
(22, 13, '2025-06-25 01:14:19', 'Pendiente'),
(23, 13, '2025-06-25 01:14:19', 'Pendiente'),
(24, 13, '2025-06-25 01:14:19', 'Pendiente'),
(25, 13, '2025-06-25 01:14:19', 'Pendiente'),
(26, 13, '2025-06-25 01:14:19', 'Pendiente'),
(27, 13, '2025-06-25 17:09:29', 'Pendiente'),
(28, 13, '2025-06-25 17:09:30', 'Pendiente'),
(29, 13, '2025-06-25 17:09:30', 'Pendiente'),
(30, 13, '2025-06-25 17:09:30', 'Pendiente'),
(31, 13, '2025-06-25 17:09:30', 'Pendiente'),
(32, 13, '2025-06-25 17:10:26', 'Pendiente'),
(33, 13, '2025-06-25 17:10:44', 'Pendiente'),
(34, 13, '2025-06-25 17:10:44', 'Pendiente'),
(35, 13, '2025-06-25 18:49:39', 'pendiente'),
(36, 13, '2025-06-25 20:29:20', 'pendiente'),
(37, 13, '2025-06-25 20:42:25', 'pendiente'),
(38, 13, '2025-06-25 23:24:38', 'pendiente'),
(39, 13, '2025-06-27 04:54:07', 'pendiente'),
(40, 13, '2025-07-03 15:27:42', 'pendiente'),
(41, 18, '2025-07-09 20:11:34', 'pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_detalle`
--

CREATE TABLE `pedido_detalle` (
  `id_detalle` int(11) NOT NULL,
  `id_pedido` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio_unitario` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedido_detalle`
--

INSERT INTO `pedido_detalle` (`id_detalle`, `id_pedido`, `id_producto`, `cantidad`, `precio_unitario`) VALUES
(1, 35, 1, 2, 2700.00),
(2, 35, 2, 3, 4700.00),
(3, 36, 1, 3, 2700.00),
(4, 36, 2, 2, 4700.00),
(5, 37, 1, 1, 2700.00),
(6, 38, 1, 5, 2700.00),
(7, 38, 2, 3, 4700.00),
(8, 39, 1, 1, 2700.00),
(9, 39, 2, 1, 4700.00),
(10, 40, 2, 1, 4700.00),
(11, 41, 1, 1, 2700.00),
(12, 41, 2, 1, 4700.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preferencias`
--

CREATE TABLE `preferencias` (
  `id_preferencia` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `notificaciones` enum('Sí','No') NOT NULL,
  `medio` enum('SMS','Correo','Whatsapp') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `preferencias`
--

INSERT INTO `preferencias` (`id_preferencia`, `id_usuario`, `notificaciones`, `medio`) VALUES
(1, 8, 'Sí', 'SMS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `id_proveedor` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(35) NOT NULL,
  `descripcion` text NOT NULL,
  `precio_compra` decimal(10,0) NOT NULL,
  `precio_publico` decimal(10,0) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado` enum('Activo','Inactivo') NOT NULL DEFAULT 'Activo',
  `disponibilidad` enum('Disponible','Bajo stock','Agotado') NOT NULL DEFAULT 'Disponible',
  `imagen_URL` varchar(225) NOT NULL,
  `cantidad` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `id_proveedor`, `id_categoria`, `nombre`, `descripcion`, `precio_compra`, `precio_publico`, `fecha_registro`, `estado`, `disponibilidad`, `imagen_URL`, `cantidad`) VALUES
(1, 1, 1, 'ARROZ DIANA PREMIUM', 'Aprox 500g/pqt\r\n$5.4/g', 1900, 2700, '2025-04-26 05:00:00', 'Activo', 'Disponible', 'assets/img/arrozblancodianapremiumx500gr.jpg', 45),
(2, 2, 1, 'FRIJOL DIANA BOLA ROJA', 'Aprox 500g/pqt\r\n$9.4/g', 3500, 4700, '2025-06-18 00:47:04', 'Activo', 'Disponible', 'assets/img/FrijolDIANAbolarojax500gr.jpg', 30),
(3, 1, 1, 'Alverja FRESCAMPO verde 1000gr', 'Alverja verde1000gr', 3800, 6570, '2025-07-11 00:31:17', 'Activo', 'Disponible', 'assets/img/AlverjaFRESCAMPOverde1000gr.jpg', 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id_proveedor` int(11) NOT NULL,
  `nombre` varchar(35) DEFAULT NULL,
  `empresa` varchar(35) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `correo` varchar(70) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `ciudad` varchar(35) DEFAULT NULL,
  `pais` varchar(35) DEFAULT NULL,
  `estado` enum('Activo','Inactivo') NOT NULL,
  `fecha_registro` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id_proveedor`, `nombre`, `empresa`, `telefono`, `correo`, `direccion`, `ciudad`, `pais`, `estado`, `fecha_registro`) VALUES
(1, 'Juan Pérez', 'Alimentos S.A.', '3001234567', 'juan@alimentos.com', 'Calle 10 #5-20', 'Bogotá', 'Colombia', 'Activo', '2025-04-26 05:00:00'),
(2, 'Juan  Gómez', 'Carnicos SA', '3159876543', 'jperez@carnicos.com', 'Calle 12 #5-22', 'Medellín', 'Colombia', 'Activo', '2025-04-26 05:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` enum('CLIENTE','OPERARIO','ADMINISTRADOR') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre_rol`) VALUES
(6, 'CLIENTE'),
(7, 'OPERARIO'),
(8, 'ADMINISTRADOR');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombres` varchar(70) NOT NULL,
  `apellidos` varchar(70) NOT NULL,
  `sexo` enum('M','F') NOT NULL,
  `tipo_documento` enum('C.C.','T.I.','PASAPORTE') NOT NULL,
  `numero_documento` varchar(11) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `correo` varchar(70) NOT NULL,
  `celular` varchar(20) NOT NULL,
  `direccion` varchar(30) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `hash_contraseña` varchar(225) NOT NULL,
  `fecha_creación` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado` enum('Activo','Inactivo') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombres`, `apellidos`, `sexo`, `tipo_documento`, `numero_documento`, `fecha_nacimiento`, `correo`, `celular`, `direccion`, `id_rol`, `hash_contraseña`, `fecha_creación`, `estado`) VALUES
(8, ' Pedro', ' Gómez', 'M', 'C.C.', '987654321', '1990-01-01', 'pedro@example.com', '3101234567', 'Calle 123 #45-67', 6, 'hashed_password_example', '2025-04-26 05:00:00', 'Activo'),
(9, ' Antonio', ' Ruiz', 'M', 'C.C.', '987654321', '1990-02-02', 'gomez@example.com', '3109876543', 'Carrera 45 #67-89', 6, 'new_hashed_password', '2025-04-26 05:00:00', 'Activo'),
(10, 'Pepito ', 'Perez', 'M', '', '5555555555', '2011-05-18', 'pepito@perez.com', '5555555555', 'casa de campo casa 5', 6, '555555555555555555555555555555555', '2025-05-25 22:46:10', 'Activo'),
(11, 'pepe', 'aguilar', 'M', '', '99999999', '2010-06-09', 'ejemplo123@gmail.com', '9999999999', 'hacienda napoles', 6, 'hacienda napoles', '2025-06-07 17:21:44', 'Activo'),
(12, 'pepe', 'aguilar mojica', 'F', 'PASAPORTE', '8888888', '2025-06-07', 'ejemplo1234@gmail.com', '9999999998', 'ronces valle', 6, 'ronces valle', '2025-06-07 17:51:42', 'Activo'),
(13, 'pepe jose', 'aguilar mojica', 'M', '', '8888888', '2025-06-16', 'ejemplo12345@gmail.com', '9999999978', 'tolima', 8, 'tolima', '2025-06-07 17:52:33', 'Activo'),
(14, 'Andrés Felipe', 'Lozano Arias', 'F', 'PASAPORTE', '1193554846', '2025-06-11', 'andresafla42@gmail.com', '3046676598', 'Calle 108 cra 4b', 7, 'Calle 108 cra 4b', '2025-06-07 23:48:15', 'Activo'),
(15, 'Andrés Felipe', 'Lozano Arias', 'M', '', '2293554846', '2025-06-17', 'andresafla42@gmail.com', '3046676598', 'Calle 108 cra 4b', 6, '123', '2025-06-17 00:42:32', 'Activo'),
(16, 'maria', 'Lozano Arias', 'F', '', '2293554886', '2000-06-07', 'ejemplo1@exa.com', '1111111', 'Calle 108 cra 4b', 6, '11111111111111111111111', '2025-06-17 02:02:04', 'Activo'),
(17, 'maria', 'Lozano Arias', 'F', '', '2293554886', '2000-06-07', 'andresafla42@gmail.com', '1111111', 'Calle 108 cra 4b', 6, '1111111', '2025-06-17 02:09:50', 'Activo'),
(18, 'ultimo', 'ultimo', 'M', 'PASAPORTE', '45687', '2000-06-07', 'ultimo@ultimo.com', '45687', '45687', 6, '45687', '2025-06-17 17:41:31', 'Activo'),
(19, 'cliente1', 'clein', 'F', '', '33333333333', '2000-06-07', 'cliente1@example.com', '333333', 'cliente1', 6, 'cliente1', '2025-07-09 20:20:29', 'Activo'),
(20, 'cliente1', 'clein', 'F', '', '33333333333', '2000-06-07', 'cliente1@example.com', '333333', 'cliente1', 6, 'cliente1', '2025-07-09 20:21:54', 'Activo'),
(21, 'cliente1', 'clein', 'F', '', '33333333333', '2000-06-07', 'cliente1@example.com', '333333', 'cliente1', 6, 'cliente1', '2025-07-09 20:21:57', 'Activo'),
(22, 'cliente2', 'klein', 'M', '', '44444444444', '2000-07-29', 'cliente2@example.com', '4444444444', 'cliente2', 6, 'cliente2', '2025-07-09 20:23:31', 'Activo'),
(23, 'cliente3', 'klaun', 'M', '', '555555555', '1999-07-06', 'cliente3@example.com', '555555555', 'cliente3', 6, 'cliente3', '2025-07-09 20:26:55', 'Activo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito_compras`
--
ALTER TABLE `carrito_compras`
  ADD PRIMARY KEY (`id_carrito`),
  ADD KEY `FK_usuario_carrito_idx` (`id_usuario`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `detalle_carrito`
--
ALTER TABLE `detalle_carrito`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `FK_carrito_detalle_idx` (`id_carrito`),
  ADD KEY `FK_producto_detalle_idx` (`id_producto`);

--
-- Indices de la tabla `historial_pedidos`
--
ALTER TABLE `historial_pedidos`
  ADD PRIMARY KEY (`id_historial`),
  ADD KEY `FK_usuario_historial_idx` (`id_usuario`),
  ADD KEY `FK_detalle_carrito_historial` (`id_detalle`);

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id_inventario`),
  ADD KEY `FK_producto_inventario_idx` (`id_producto`);

--
-- Indices de la tabla `metodo_de_pago`
--
ALTER TABLE `metodo_de_pago`
  ADD PRIMARY KEY (`id_pago`),
  ADD KEY `id_usuario_idx` (`id_usuario`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `pedido_detalle`
--
ALTER TABLE `pedido_detalle`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_pedido` (`id_pedido`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `preferencias`
--
ALTER TABLE `preferencias`
  ADD PRIMARY KEY (`id_preferencia`),
  ADD KEY `id_usuario_idx` (`id_usuario`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `FK_proveedor_productos_idx` (`id_proveedor`),
  ADD KEY `FK_categoria_productos_idx` (`id_categoria`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id_proveedor`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `id_rol_idx` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito_compras`
--
ALTER TABLE `carrito_compras`
  MODIFY `id_carrito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `detalle_carrito`
--
ALTER TABLE `detalle_carrito`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `historial_pedidos`
--
ALTER TABLE `historial_pedidos`
  MODIFY `id_historial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id_inventario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `metodo_de_pago`
--
ALTER TABLE `metodo_de_pago`
  MODIFY `id_pago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `pedido_detalle`
--
ALTER TABLE `pedido_detalle`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `preferencias`
--
ALTER TABLE `preferencias`
  MODIFY `id_preferencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id_proveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito_compras`
--
ALTER TABLE `carrito_compras`
  ADD CONSTRAINT `FK_usuario_carrito` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `detalle_carrito`
--
ALTER TABLE `detalle_carrito`
  ADD CONSTRAINT `FK_carrito_detalle` FOREIGN KEY (`id_carrito`) REFERENCES `carrito_compras` (`id_carrito`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_producto_detalle` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE;

--
-- Filtros para la tabla `historial_pedidos`
--
ALTER TABLE `historial_pedidos`
  ADD CONSTRAINT `FK_detalle_carrito_historial` FOREIGN KEY (`id_detalle`) REFERENCES `detalle_carrito` (`id_detalle`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_usuario_historial` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD CONSTRAINT `FK_producto_inventario` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE;

--
-- Filtros para la tabla `metodo_de_pago`
--
ALTER TABLE `metodo_de_pago`
  ADD CONSTRAINT `FK_usuario_MP` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `pedido_detalle`
--
ALTER TABLE `pedido_detalle`
  ADD CONSTRAINT `pedido_detalle_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`),
  ADD CONSTRAINT `pedido_detalle_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`);

--
-- Filtros para la tabla `preferencias`
--
ALTER TABLE `preferencias`
  ADD CONSTRAINT `FK_ipreferencia_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `FK_categoria_productos` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_proveedor_productos` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedores` (`id_proveedor`) ON DELETE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `id_rol` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
