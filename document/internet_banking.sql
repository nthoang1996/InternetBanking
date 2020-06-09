-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 09, 2020 lúc 04:13 PM
-- Phiên bản máy phục vụ: 10.4.8-MariaDB
-- Phiên bản PHP: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `internet_banking`
--
CREATE DATABASE IF NOT EXISTS `internet_banking` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `internet_banking`;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tblbank`
--
-- Tạo: Th5 25, 2020 lúc 07:26 AM
--

DROP TABLE IF EXISTS `tblbank`;
CREATE TABLE IF NOT EXISTS `tblbank` (
  `id` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `public_key` text NOT NULL,
  `secret_key` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `tblbank`
--

INSERT INTO `tblbank` (`id`, `name`, `public_key`, `secret_key`) VALUES
('hFKsgwJyJXUpNxNwZM', 'ngân hàng C', 'ngan hang c', NULL),
('jpS38Zwq37hIQf0jkO', 'ngân hàng B', 'ngan hang b', NULL),
('pawGDX1Ddu', 'ngân hàng của Đạt', '-----BEGIN PGP PUBLIC KEY BLOCK----- Version: OpenPGP.js v4.10.4 Comment: https://openpgpjs.org  xjMEXtkj0hYJKwYBBAHaRw8BAQdA222zQl/WuYUuf0BenMqKEpEaXZINk0tm pUCfK8HY8krNHkRhdCA8Tmd1eWVuVGhhbmhEYXRAZ21haWwuY29tPsJ4BBAW CgAgBQJe2SPSBgsJBwgDAgQVCAoCBBYCAQACGQECGwMCHgEACgkQPFS1GX66 gXMrrQEAhSIlb8Bg2cLBZuKtVRyJb8EuxWCjVrNSEy5krl0r5fYBAN+i3Jhw wA71qq/nB9qzVIlquDrL42CEA0sqUkwyc3cGzjgEXtkj0hIKKwYBBAGXVQEF AQEHQAug89gxXob35tI36w6q2C3BqP/yPc5fxswwPmgeByZJAwEIB8JhBBgW CAAJBQJe2SPSAhsMAAoJEDxUtRl+uoFzBV4BAKLaN9wDG0I+YyJUQFF11cNd cyzhRjOfihrzYu4c3S26AP9slEkHs14lzjbLibvxPy6nCQU3ZEQsXlr7Dchb HBUKAQ== =NGs0 -----END PGP PUBLIC KEY BLOCK-----', 'ThisKeyForHash'),
('TnyjhGBTwMthNgYZkq', 'ngân hàng A', 'ngan hang a', NULL),
('TttwVLKHvXRujyllDq', 'HoangBank', '-----BEGIN PUBLIC KEY-----\r\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCTrlHb3adQstaRWJlqtsrIeFo5\r\n7lSpE5FemvbIiBn0gGVMl+SveVm8Zj1JnpLfJngkfnsUgyJp1fLodhgtN581o7Ad\r\nYGUQlx70kWw75WhSMbDAzH5qjpFNSlNNjC8rT5XyCE/YFJ6DuEloJgXoJvRnNXPx\r\nPWj4IelLJ84ZfAWI5QIDAQAB\r\n-----END PUBLIC KEY-----', 'hPZno63KBfZeIcvYLDwx');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbldebtreminder`
--
-- Tạo: Th5 08, 2020 lúc 01:07 PM
--

DROP TABLE IF EXISTS `tbldebtreminder`;
CREATE TABLE IF NOT EXISTS `tbldebtreminder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source_id` int(11) NOT NULL,
  `des_id` int(11) NOT NULL,
  `value` text NOT NULL,
  `message` text NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tblhistorytransaction`
--
-- Tạo: Th5 08, 2020 lúc 04:00 PM
--

DROP TABLE IF EXISTS `tblhistorytransaction`;
CREATE TABLE IF NOT EXISTS `tblhistorytransaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL,
  `source_id` int(11) NOT NULL,
  `bank_company_id` int(11) NOT NULL,
  `des_id` int(11) NOT NULL,
  `value` text NOT NULL,
  `message` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `tblhistorytransaction`
--

INSERT INTO `tblhistorytransaction` (`id`, `type`, `source_id`, `bank_company_id`, `des_id`, `value`, `message`) VALUES
(2, 1, 101, 100, 4, '500000', ''),
(3, 1, 102, 100, 5, '500000', ''),
(4, 1, 102, 100, 6, '50000', ''),
(5, 1, 103, 100, 6, '50000', ''),
(6, 1, 104, 100, 6, '50000', ''),
(7, 1, 113, 100, 10, '50000000', ''),
(8, 1, 113, 100, 10, '50000000', ''),
(9, 1, 113, 0, 10, '50000000', ''),
(10, 1, 113, 0, 10, '50000000', ''),
(11, 1, 113, 0, 10, '50000000', ''),
(12, 1, 113, 0, 10, '50000000', ''),
(13, 1, 113, 0, 10, '50000000', ''),
(14, 1, 113, 0, 10, '50000000', ''),
(15, 1, 113, 0, 10, '50000000', ''),
(16, 1, 113, 0, 10, '50000000', ''),
(17, 1, 113, 0, 10, '50000000', ''),
(18, 1, 113, 0, 10, '50000000', ''),
(19, 1, 113, 0, 10, '50000000', ''),
(20, 1, 113, 0, 10, '50000000', ''),
(21, 1, 113, 0, 10, '50000000', ''),
(22, 1, 113, 0, 10, '50000000', ''),
(23, 1, 113, 0, 10, '50000000', ''),
(24, 1, 113, 0, 10, '50000000', ''),
(25, 1, 113, 0, 10, '50000000', ''),
(26, 1, 113, 0, 10, '50000000', ''),
(27, 1, 113, 0, 10, '50000000', ''),
(28, 1, 113, 0, 10, '50000000', ''),
(29, 1, 113, 0, 10, '50000000', ''),
(30, 1, 113, 0, 10, '50000000', ''),
(31, 1, 113, 0, 10, '50000000', ''),
(32, 1, 113, 0, 10, '50000000', ''),
(33, 1, 113, 0, 10, '50000000', ''),
(34, 1, 113, 0, 10, '50000000', ''),
(35, 1, 113, 0, 10, '50000000', ''),
(36, 1, 113, 0, 10, '50000000', ''),
(37, 1, 4, -1, 12, '60000000', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tblreceivercontact`
--
-- Tạo: Th5 26, 2020 lúc 01:40 PM
--

DROP TABLE IF EXISTS `tblreceivercontact`;
CREATE TABLE IF NOT EXISTS `tblreceivercontact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bank_company_id` varchar(20) NOT NULL DEFAULT '',
  `source_id` int(11) NOT NULL,
  `des_id` int(11) NOT NULL,
  `name_contact` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `tblreceivercontact`
--

INSERT INTO `tblreceivercontact` (`id`, `bank_company_id`, `source_id`, `des_id`, `name_contact`) VALUES
(1, '', 4, 12, 'Thiện ngáo'),
(4, 'TttwVLKHvXRujyllDq', 4, 13, 'Thịnh bò'),
(6, 'TttwVLKHvXRujyllDq', 4, 10, 'Xệ Vinh'),
(7, 'TttwVLKHvXRujyllDq', 4, 9, 'Vinh Râu'),
(9, 'TttwVLKHvXRujyllDq', 5, 12, 'Thiện Chí'),
(10, 'TttwVLKHvXRujyllDq', 5, 9, 'Vinh Xóm Trên'),
(11, 'TttwVLKHvXRujyllDq', 5, 6, 'Thịnh Mập'),
(12, 'TttwVLKHvXRujyllDq', 5, 7, 'Toản bóp quả cam'),
(13, 'TttwVLKHvXRujyllDq', 5, 8, 'Vỹ khùng'),
(14, 'TttwVLKHvXRujyllDq', 5, 5, 'Thế Thẹo'),
(15, 'TttwVLKHvXRujyllDq', 6, 5, 'Thế Thẹo'),
(16, 'TttwVLKHvXRujyllDq', 6, 9, 'Vinh Xù'),
(17, 'TttwVLKHvXRujyllDq', 6, 10, 'Vinh Lú'),
(18, 'pawGDX1Ddu', 6, 2147483647, 'Ngân hàng của người ta');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tblsavingaccount`
--
-- Tạo: Th5 29, 2020 lúc 03:04 AM
--

DROP TABLE IF EXISTS `tblsavingaccount`;
CREATE TABLE IF NOT EXISTS `tblsavingaccount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `code` int(11) NOT NULL,
  `bank_balance` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `tblsavingaccount`
--

INSERT INTO `tblsavingaccount` (`id`, `id_user`, `code`, `bank_balance`) VALUES
(1, 4, 0, 1000000),
(2, 4, 0, 2000000),
(3, 4, 0, 3000000),
(4, 4, 0, 4000000),
(5, 4, 0, 5000000),
(6, 5, 0, 6000000),
(7, 5, 0, 7000000),
(8, 5, 0, 8000000),
(9, 5, 0, 9000000),
(10, 5, 0, 10000000),
(11, 6, 0, 11000000),
(12, 6, 0, 12000000),
(13, 6, 0, 13000000),
(14, 6, 0, 14000000),
(15, 6, 0, 15000000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbluser`
--
-- Tạo: Th5 26, 2020 lúc 08:05 AM
--

DROP TABLE IF EXISTS `tbluser`;
CREATE TABLE IF NOT EXISTS `tbluser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `address` text NOT NULL,
  `email` text NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` text NOT NULL,
  `role` int(11) NOT NULL,
  `bank_balance` text NOT NULL,
  `verify` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '{}',
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `tbluser`
--

INSERT INTO `tbluser` (`id`, `name`, `phone`, `address`, `email`, `username`, `password`, `role`, `bank_balance`, `verify`, `is_active`) VALUES
(1, 'Nguyễn Thái Hoàng', '0936252722', 'c4/6d Lê Đình Chi huyện Bình Chánh thành phố Hồ Chí Minh', 'nthoang1996@gmail.com', 'admin1', '$2a$10$BSy/3DGcTEz7Nu/4hVbNWuWCqvVuq2cQ3jELH509Y/8i2/iHO/tTu', 1, '', '', 1),
(2, 'Trần Hoàng Anh Thư', '0947884660', '184 Phan Văn Khỏe, Phường 5, Quận 1, Sài Gòn - TP HCM', 'thathu1999@gmail.com', 'employee1', '$2a$10$BSy/3DGcTEz7Nu/4hVbNWuWCqvVuq2cQ3jELH509Y/8i2/iHO/tTu', 2, '', '', 1),
(3, 'Võ Thanh Hiếu', '(08) 3821 0', '140/34 Calmette, Phường NTB, Quận 1, Sài Gòn - TP HCM', 'vthieu1996@gmail.com', 'employee2', '$2a$10$BSy/3DGcTEz7Nu/4hVbNWuWCqvVuq2cQ3jELH509Y/8i2/iHO/tTu', 2, '', '', 1),
(4, 'Bùi Chí Thanh', '(08) 3839 2', '284 Cống Quỳnh, Phuờng Phạm Ngũ Lão, Quận 1, Sài Gòn - TP HCM', 'sad.rain1996@gmail.com', '1234567890', '$2a$10$BSy/3DGcTEz7Nu/4hVbNWuWCqvVuq2cQ3jELH509Y/8i2/iHO/tTu', 3, '100500000', '{\"code\":271567,\"ts\":1590481894606}', 1),
(5, 'Hàng Hữu Thế', '(08) 3823 8', '82 Nguyễn Du, Phường Bến Nghé, Quận 1, Sài Gòn - TP HCM', 'hhthe@gmail.com', '2345678901', '$2a$10$BSy/3DGcTEz7Nu/4hVbNWuWCqvVuq2cQ3jELH509Y/8i2/iHO/tTu', 3, '200500000', '', 1),
(6, 'Phan Tấn Thịnh', '(08) 3740 0', '177 Trần Não, Phường Bình An, Quận 2, Sài Gòn - TP HCM', 'ptthinh@gmail.com', '3456789012', '$2a$10$BSy/3DGcTEz7Nu/4hVbNWuWCqvVuq2cQ3jELH509Y/8i2/iHO/tTu', 3, '300150000', '', 1),
(7, 'Trần Quốc Toản', '(08) 3931 1', '16/99 - 16/101 Kỳ Đồng, Phường 9, Quận 3, Sài Gòn - TP HCM', 'tqtoan@gmail.com', '4567890123', '$2a$10$BSy/3DGcTEz7Nu/4hVbNWuWCqvVuq2cQ3jELH509Y/8i2/iHO/tTu', 3, '400000000', '', 1),
(8, 'Trần Chí Vỹ', '(08) 3824 9', '280/10 Cách mạng Tháng 8, Phường 10, Quận 3, Sài Gòn - TP HCM', 'tcvy@gmail.com', '5678901234', '$2a$10$BSy/3DGcTEz7Nu/4hVbNWuWCqvVuq2cQ3jELH509Y/8i2/iHO/tTu', 3, '500000000', '', 1),
(9, 'Đặng Xuân Vinh', '(08) 3935 0', '210/18/2 Cách mạng Tháng 8, Phường 10, Quận 3, Sài Gòn - TP HCM', 'dxvinh@gmail.com', '6789012345', '$2a$10$BSy/3DGcTEz7Nu/4hVbNWuWCqvVuq2cQ3jELH509Y/8i2/iHO/tTu', 3, '600000000', '', 1),
(10, 'Lê Thanh Trường Vinh', '(08) 3931 3', '80/76 Trần Quang Diệu, Phường 14, Quận 3, Sài Gòn - TP HCM', 'lttvinh@gmail.com', '7890123456', '$2a$10$BSy/3DGcTEz7Nu/4hVbNWuWCqvVuq2cQ3jELH509Y/8i2/iHO/tTu', 3, '2300000000', '', 1),
(11, 'Phan Nhật Vinh', '(08) 3885 3', '373/14 Cách mạng Tháng 8, Phường 13, Quận 3, Sài Gòn - TP HCM', 'pnvinh@gmail.com', '8901234567', '$2a$10$BSy/3DGcTEz7Nu/4hVbNWuWCqvVuq2cQ3jELH509Y/8i2/iHO/tTu', 3, '800000000', '', 1),
(12, 'Trần Quang Thiện', '(08) 3930 3', '59 Trần Quốc Thảo, Ward 7, Quận 3, Sài Gòn - TP HCM', 'tqthien@gmail.com', '9012345678', '$2a$10$BSy/3DGcTEz7Nu/4hVbNWuWCqvVuq2cQ3jELH509Y/8i2/iHO/tTu', 3, '1080000000', '', 1),
(13, 'Đỗ Quang Thịnh', '(08) 3932 5', '38 Tú Xương, Phường 7, Quận 3, Sài Gòn - TP HCM', 'dqthinh@gmail.com', '1478523690', '$2a$10$BSy/3DGcTEz7Nu/4hVbNWuWCqvVuq2cQ3jELH509Y/8i2/iHO/tTu', 3, '1000000000', '', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `userrefreshtokenext`
--
-- Tạo: Th6 09, 2020 lúc 01:21 PM
-- Cập nhật lần cuối: Th6 09, 2020 lúc 02:02 PM
--

DROP TABLE IF EXISTS `userrefreshtokenext`;
CREATE TABLE IF NOT EXISTS `userrefreshtokenext` (
  `id` int(11) NOT NULL,
  `refresh_token` varchar(256) NOT NULL,
  `rdt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `userrefreshtokenext`
--

INSERT INTO `userrefreshtokenext` (`id`, `refresh_token`, `rdt`) VALUES
(6, 'drcGeQ6HvTak8QZlzzT2rol5eDIYAUqb2yOnhdtc5OEtOqMynhMVguRtg02WdCAxF7avTeBAURUdfP5Q', '2020-06-09 21:02:22');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
