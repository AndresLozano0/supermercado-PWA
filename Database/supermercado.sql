-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-08-2025 a las 06:41:07
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

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
  `direccion` varchar(255) DEFAULT NULL,
  `como_recibir` enum('Domicilio','Recoger en negocio') NOT NULL,
  `fecha_entrega` datetime DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `estado` enum('Activo','Inactivo') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrito_compras`
--

INSERT INTO `carrito_compras` (`id_carrito`, `id_usuario`, `fecha_creacion_carrito`, `direccion`, `como_recibir`, `fecha_entrega`, `observaciones`, `estado`) VALUES
(3, 13, '2025-08-03 23:14:58', NULL, '', NULL, NULL, 'Activo'),
(4, 13, '2025-08-12 04:26:20', 'calle 82b sur # 81-19', 'Domicilio', NULL, NULL, 'Activo'),
(5, 13, '2025-08-12 04:28:33', 'calle 82b sur # 81-19', 'Domicilio', NULL, NULL, 'Activo');

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
(1, 'proteinas', 'carnes pollo pescado'),
(2, 'lacteos refrigerados', 'mercado'),
(3, 'despensa', 'mercado'),
(4, 'frutas y verduras', 'mercado'),
(5, 'cuidado personal', 'belleza'),
(6, 'aseo', 'aseo');

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
('Super Tienda Llanera', '/img/tulogoaqui.png'),
('Super Tienda Llanera', '/img/tulogoaqui.png'),
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_pedidos`
--

CREATE TABLE `historial_pedidos` (
  `id_historial` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_detalle` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(4, 13, '', NULL, NULL),
(5, 13, '', NULL, NULL),
(6, 13, '', NULL, NULL),
(7, 13, '', NULL, NULL),
(8, 13, '', NULL, NULL),
(9, 13, '', NULL, NULL),
(10, 13, 'Efectivo', NULL, NULL),
(11, 13, 'Efectivo', NULL, NULL),
(12, 13, 'Efectivo', NULL, NULL),
(13, 13, 'Efectivo', NULL, NULL),
(14, 13, 'Efectivo', NULL, NULL),
(15, 13, 'Efectivo', NULL, NULL),
(16, 13, '', NULL, NULL),
(17, 13, '', NULL, NULL),
(18, 13, '', NULL, NULL),
(19, 13, 'Efectivo', NULL, NULL),
(20, 13, '', NULL, NULL),
(21, 13, 'Efectivo', NULL, NULL),
(22, 13, '', NULL, NULL),
(23, 13, '', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado` varchar(50) DEFAULT 'Pendiente',
  `id_metodo_pago` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id_pedido`, `id_usuario`, `fecha`, `estado`, `id_metodo_pago`) VALUES
(55, 13, '2025-07-30 03:53:45', 'pendiente', NULL),
(56, 13, '2025-07-30 03:54:00', 'pendiente', NULL),
(57, 13, '2025-07-30 03:54:15', 'pendiente', NULL),
(58, 13, '2025-07-30 03:55:46', 'pendiente', NULL),
(59, 13, '2025-07-30 04:01:48', 'pendiente', NULL),
(60, 13, '2025-07-30 04:27:59', 'pendiente', NULL),
(61, 13, '2025-08-03 06:09:20', 'pendiente', NULL),
(62, 13, '2025-08-03 06:09:46', 'pendiente', NULL),
(63, 13, '2025-08-03 06:11:41', 'pendiente', NULL),
(64, 13, '2025-08-03 06:50:47', 'pendiente', NULL),
(65, 13, '2025-08-03 06:54:27', 'pendiente', NULL),
(66, 13, '2025-08-03 06:56:51', 'pendiente', NULL),
(67, 13, '2025-08-03 17:27:34', 'pendiente', NULL),
(68, 13, '2025-08-03 17:37:38', 'pendiente', NULL),
(69, 13, '2025-08-03 17:38:10', 'pendiente', NULL),
(70, 13, '2025-08-03 23:11:19', 'pendiente', NULL),
(71, 13, '2025-08-03 23:12:36', 'pendiente', NULL),
(72, 13, '2025-08-03 23:14:58', 'pendiente', NULL),
(73, 13, '2025-08-12 04:26:20', 'pendiente', NULL),
(74, 13, '2025-08-12 04:28:33', 'pendiente', NULL);

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
(35, 61, 1, 1, 2700.00),
(36, 62, 1, 1, 2700.00),
(37, 63, 1, 1, 2700.00),
(38, 64, 1, 1, 2700.00),
(39, 65, 1, 1, 2700.00),
(40, 66, 1, 1, 2700.00),
(41, 67, 1, 2, 2700.00),
(42, 68, 1, 2, 2700.00),
(43, 69, 1, 2, 2700.00),
(44, 70, 1, 1, 2700.00),
(45, 71, 1, 1, 2700.00),
(46, 72, 1, 2, 2700.00),
(47, 73, 23, 1, 12000.00),
(48, 74, 24, 5, 14000.00);

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
  `disponibilidad` enum('Disponible','Bajo stock','Agotado') NOT NULL,
  `imagen_URL` varchar(225) NOT NULL,
  `cantidad` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `id_proveedor`, `id_categoria`, `nombre`, `descripcion`, `precio_compra`, `precio_publico`, `fecha_registro`, `estado`, `disponibilidad`, `imagen_URL`, `cantidad`) VALUES
(1, 1, 1, 'ARROZ DIANA PREMIUM', 'Aprox 500g/pqt\r\n$5.4/g', 1900, 2700, '2025-04-26 05:00:00', 'Activo', 'Disponible', 'assets/img/arrozblancodianapremiumx500gr.jpg', 30),
(2, 2, 1, 'FRIJOL DIANA BOLA ROJA', 'Aprox 500g/pqt\r\n$9.4/g', 3500, 4700, '2025-06-18 00:47:04', 'Activo', 'Disponible', 'assets/img/FrijolDIANAbolarojax500gr.jpg', 23),
(23, 1, 1, 'Pollo Entero', 'Pollo fresco entero', 9000, 12000, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/pollo_entero.png', 19),
(24, 1, 1, 'Carne Molida', 'Carne molida de res', 11000, 14000, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/carne_molida.jpeg', 10),
(25, 1, 1, 'Filete de Pescado', 'Filete fresco de pescado', 10000, 13000, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/filete_pescado.jpg', 10),
(26, 1, 1, 'Pechuga de Pollo', 'Pechuga sin piel', 9500, 12500, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/pechuga.jpg', 18),
(27, 1, 1, 'Costilla de Cerdo', 'Costilla carnuda de cerdo', 10500, 13500, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/chuleta_cerdo.jpg', 12),
(28, 1, 2, 'Leche Entera', 'Leche entera pasteurizada', 2500, 3000, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/leche_entera.jpg', 25),
(29, 1, 2, 'Queso Doble Crema', 'Queso fresco doble crema', 6000, 7500, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/queso_campesino.jpeg', 15),
(30, 1, 2, 'Yogurt Natural', 'Yogurt sin azúcar', 3500, 4500, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/yogurt.png', 20),
(31, 1, 2, 'Mantequilla', 'Mantequilla con sal', 4000, 5000, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/mantequilla.jpg', 18),
(32, 1, 2, 'Crema de Leche', 'Crema de leche espesa', 3700, 4700, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/crema_leche.jpg', 12),
(33, 1, 3, 'Arroz Blanco', 'Arroz blanco tipo 1kg', 2000, 2500, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/arroz.jpeg', 30),
(34, 1, 3, 'Aceite Vegetal', 'Aceite vegetal 1L', 4500, 5500, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/aceite.jpg', 20),
(35, 1, 3, 'Sal Refinada', 'Sal fina para cocina', 1000, 1300, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/sal.jpg', 40),
(36, 1, 3, 'Azúcar Blanca', 'Azúcar refinada 1kg', 2200, 2700, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/azucar.jpg', 25),
(37, 1, 3, 'Fríjoles', 'Fríjol rojo bolita 500g', 3000, 3600, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/frijoles.jpg', 22),
(38, 1, 4, 'Manzana Roja', 'Manzana importada roja', 1500, 2000, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/manzanas.jpg', 40),
(39, 1, 4, 'Plátano Maduro', 'Plátano maduro para freír', 800, 1200, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/platano_maduro.jpg', 35),
(40, 1, 4, 'Tomate Chonto', 'Tomate chonto fresco', 1800, 2300, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/tomate.jpg', 30),
(41, 1, 4, 'Papa Pastusa', 'Papa pastusa lavada', 1200, 1600, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/papa.jpg', 50),
(42, 1, 4, 'Cebolla Cabezona', 'Cebolla cabezona blanca', 1300, 1700, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/cebolla.jpg', 28),
(43, 1, 5, 'Shampoo', 'Shampoo con keratina 400ml', 7000, 8500, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/shampoo.png', 20),
(44, 1, 5, 'Jabón Corporal', 'Jabón en barra neutro', 2000, 2500, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/jabon_bano.jpeg', 25),
(45, 1, 5, 'Crema Dental', 'Crema dental 90g', 2500, 3200, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/crema_dental.jpg', 30),
(46, 1, 5, 'Desodorante', 'Desodorante roll-on', 3000, 3700, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/desodorante.png', 18),
(47, 1, 5, 'Cepillo de Dientes', 'Cepillo dental suave', 1500, 2000, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/cepillo_dientes.jpg', 22),
(48, 1, 6, 'Jabón Líquido', 'Jabón líquido para ropa', 4500, 5200, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/jabon_loza.jpg', 20),
(49, 1, 6, 'Detergente en Polvo', 'Detergente multiusos 1kg', 4000, 4800, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/detergente.jpg', 25),
(50, 1, 6, 'Cloro', 'Cloro desinfectante 1L', 2500, 3000, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/cloro.jpeg', 30),
(51, 1, 6, 'Trapeador', 'Trapeador absorbente', 6000, 7500, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/trapeador.jpg', 10),
(52, 1, 6, 'Escoba', 'Escoba de cerdas duras', 5000, 6200, '2025-08-08 05:00:00', 'Activo', 'Disponible', 'assets/img/escoba.jpg', 12);

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
(13, 'pepe jose', 'aguilar mojica', 'M', '', '8888888', '2025-06-16', 'ejemplo12345@gmail.com', '9999999978', 'tolima', 7, 'tolima', '2025-06-07 17:52:33', 'Activo'),
(19, 'andres ', 'rivera', 'M', '', '80895236', '1985-05-05', 'punkss88@hotmail.com', '3192672416', 'calle 82 b sur # 19-31', 6, 'holamama', '2025-07-24 04:38:49', 'Activo');

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
  MODIFY `id_carrito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
  MODIFY `id_pago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT de la tabla `pedido_detalle`
--
ALTER TABLE `pedido_detalle`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `preferencias`
--
ALTER TABLE `preferencias`
  MODIFY `id_preferencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

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
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

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
