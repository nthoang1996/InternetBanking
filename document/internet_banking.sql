-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 18, 2020 lúc 11:18 AM
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
-- Cập nhật lần cuối: Th6 18, 2020 lúc 07:06 AM
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
('hFKsgwJyJXUpNxNwZM', 'Ngân hàng C', 'ngan hang c', NULL),
('jpS38Zwq37hIQf0jkO', 'Ngân hàng B', 'ngan hang b', NULL),
('pawGDX1Ddu', 'Ngân hàng của Đạt', '-----BEGIN PGP PUBLIC KEY BLOCK-----\r\nVersion: OpenPGP.js v4.10.4\r\nComment: https://openpgpjs.org\r\n    \r\nxjMEXucvbRYJKwYBBAHaRw8BAQdAhluyWUyT/6WtxLpAKmOyAUsUWb6F3S9H\r\nTJxIpxComTDNHkRhdCA8Tmd1eWVuVGhhbmhEYXRAZ21haWwuY29tPsJ4BBAW\r\nCgAgBQJe5y9tBgsJBwgDAgQVCAoCBBYCAQACGQECGwMCHgEACgkQ70oE2uph\r\niQ+6IwD/fJohuvKler2uA2gX0xTAh5Vh6Guukb3iR7eawgXTQYUA/1adGEsH\r\nFGpqoACuh2sBR5TbmCWzxjQQ20FlkE3KFusJzjgEXucvbRIKKwYBBAGXVQEF\r\nAQEHQHCpSvye2tmzRpZtSyGRziBNmlIdAn3Mc8QxC3qxAW1iAwEIB8JhBBgW\r\nCAAJBQJe5y9tAhsMAAoJEO9KBNrqYYkPm4QBAPCRnJhyMlzbcnv1xXyVnkca\r\nCtQhVVTjpptRqFOpbv9QAQCRtsemENqYBfQiRqsqJzRxa3pXMaQVMOfMSd/P\r\nCizxCQ==\r\n=TPYo\r\n-----END PGP PUBLIC KEY BLOCK-----\r\n', 'ThisKeyForHash'),
('TnyjhGBTwMthNgYZkq', 'Ngân hàng A', 'ngan hang a', NULL),
('TttwVLKHvXRujyllDq', 'Cùng ngân hàng', '-----BEGIN PUBLIC KEY-----\r\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCTrlHb3adQstaRWJlqtsrIeFo5\r\n7lSpE5FemvbIiBn0gGVMl+SveVm8Zj1JnpLfJngkfnsUgyJp1fLodhgtN581o7Ad\r\nYGUQlx70kWw75WhSMbDAzH5qjpFNSlNNjC8rT5XyCE/YFJ6DuEloJgXoJvRnNXPx\r\nPWj4IelLJ84ZfAWI5QIDAQAB\r\n-----END PUBLIC KEY-----', 'hPZno63KBfZeIcvYLDwx');

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
-- Tạo: Th6 17, 2020 lúc 09:50 AM
--

DROP TABLE IF EXISTS `tblhistorytransaction`;
CREATE TABLE IF NOT EXISTS `tblhistorytransaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL,
  `root_id` int(11) NOT NULL,
  `source_username` varchar(256) NOT NULL,
  `source_name` varchar(256) NOT NULL,
  `bank_company_id` varchar(256) NOT NULL,
  `des_username` varchar(256) NOT NULL,
  `des_name` varchar(256) NOT NULL,
  `value` text NOT NULL,
  `message` text NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `tblhistorytransaction`
--

INSERT INTO `tblhistorytransaction` (`id`, `type`, `root_id`, `source_username`, `source_name`, `bank_company_id`, `des_username`, `des_name`, `value`, `message`, `time`) VALUES
(49, 2, 10, '1234567890', 'Bùi Chí Thanh', 'TttwVLKHvXRujyllDq', '7890123456', 'Lê Thanh Trường Vinh', '50000', 'Cho tiền cắt tóc', '2020-06-16 20:49:42'),
(50, 1, 4, '1234567890', 'Bùi Chí Thanh', 'TttwVLKHvXRujyllDq', '7890123456', 'Lê Thanh Trường Vinh', '50000', 'Cho tiền cắt tóc', '2020-06-16 20:49:42'),
(51, 2, 13, '1234567890', 'Bùi Chí Thanh', 'TttwVLKHvXRujyllDq', '1478523690', 'Đỗ Quang Thịnh', '50000', 'Cho tiền đổ xăng', '2020-06-16 21:18:09'),
(52, 1, 4, '1234567890', 'Bùi Chí Thanh', 'TttwVLKHvXRujyllDq', '1478523690', 'Đỗ Quang Thịnh', '50000', 'Cho tiền đổ xăng', '2020-06-16 21:18:09'),
(75, 2, 13, '1234567890', 'Bùi Chí Thanh', 'TttwVLKHvXRujyllDq', '1478523690', 'Đỗ Quang Thịnh', '500000', 'Tiền lì xì', '2020-06-16 22:29:47'),
(76, 1, 4, '1234567890', 'Bùi Chí Thanh', 'TttwVLKHvXRujyllDq', '1478523690', 'Đỗ Quang Thịnh', '500000', 'Tiền lì xì', '2020-06-16 22:29:47'),
(77, 2, 12, '1234567890', 'Bùi Chí Thanh', 'TttwVLKHvXRujyllDq', '9012345678', 'Trần Quang Thiện', '20000', 'Tiền bánh tráng trộn', '2020-06-17 16:49:55'),
(78, 1, 4, '1234567890', 'Bùi Chí Thanh', 'TttwVLKHvXRujyllDq', '9012345678', 'Trần Quang Thiện', '20000', 'Tiền bánh tráng trộn', '2020-06-17 16:49:55'),
(79, 2, 13, '1234567890', 'Bùi Chí Thanh', 'TttwVLKHvXRujyllDq', '1478523690', 'Đỗ Quang Thịnh', '10000', 'Cho tiền chai nước ngọt', '2020-06-17 16:51:16'),
(80, 1, 4, '1234567890', 'Bùi Chí Thanh', 'TttwVLKHvXRujyllDq', '1478523690', 'Đỗ Quang Thịnh', '10000', 'Cho tiền chai nước ngọt', '2020-06-17 16:51:16');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tblreceivercontact`
--
-- Tạo: Th6 14, 2020 lúc 04:30 AM
-- Cập nhật lần cuối: Th6 18, 2020 lúc 09:13 AM
--

DROP TABLE IF EXISTS `tblreceivercontact`;
CREATE TABLE IF NOT EXISTS `tblreceivercontact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bank_company_id` varchar(20) NOT NULL DEFAULT '',
  `source_id` int(11) NOT NULL,
  `des_id` varchar(256) NOT NULL,
  `name_contact` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `tblreceivercontact`
--

INSERT INTO `tblreceivercontact` (`id`, `bank_company_id`, `source_id`, `des_id`, `name_contact`) VALUES
(1, 'TttwVLKHvXRujyllDq', 4, '9012345678', 'Thiện hết ngáo'),
(6, 'TttwVLKHvXRujyllDq', 4, '7890123456', 'Xệ Vinh'),
(7, 'TttwVLKHvXRujyllDq', 4, '6789012345', 'Vinh Râu'),
(9, 'TttwVLKHvXRujyllDq', 5, '9012345678', 'Thiện Chí'),
(10, 'TttwVLKHvXRujyllDq', 5, '6789012345', 'Vinh Xóm Trên'),
(11, 'TttwVLKHvXRujyllDq', 5, '3456789012', 'Thịnh Mập'),
(12, 'TttwVLKHvXRujyllDq', 5, '4567890123', 'Toản bóp quả cam'),
(13, 'TttwVLKHvXRujyllDq', 5, '5678901234', 'Vỹ khùng'),
(14, 'TttwVLKHvXRujyllDq', 5, '2345678901', 'Thế Thẹo'),
(15, 'TttwVLKHvXRujyllDq', 6, '2345678901', 'Thế Thẹo'),
(16, 'TttwVLKHvXRujyllDq', 6, '6789012345', 'Vinh Xù'),
(17, 'TttwVLKHvXRujyllDq', 6, '7890123456', 'Vinh Lú'),
(18, 'pawGDX1Ddu', 6, '4638857506091920', 'Ngân hàng của người ta'),
(20, 'TttwVLKHvXRujyllDq', 4, '2345678901', 'Hàng Hữu Thế'),
(29, 'TttwVLKHvXRujyllDq', 4, '1478523690', 'Đỗ Quang Thịnh'),
(30, 'pawGDX1Ddu', 4, '4532241457756970', 'dat');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tblsavingaccount`
--
-- Tạo: Th6 13, 2020 lúc 03:54 PM
--

DROP TABLE IF EXISTS `tblsavingaccount`;
CREATE TABLE IF NOT EXISTS `tblsavingaccount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `username` varchar(256) NOT NULL,
  `code` int(11) NOT NULL,
  `bank_balance` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `tblsavingaccount`
--

INSERT INTO `tblsavingaccount` (`id`, `id_user`, `username`, `code`, `bank_balance`) VALUES
(1, 4, '1111111111', 0, 1000000),
(2, 4, '222222222', 0, 2000000),
(3, 4, '333333333', 0, 3000000),
(4, 4, '444444444', 0, 4000000),
(5, 4, '555555555', 0, 5000000),
(6, 5, '666666666', 0, 6000000),
(7, 5, '777777777', 0, 7000000),
(8, 5, '888888888', 0, 8000000),
(9, 5, '999999999', 0, 9000000),
(10, 5, '101010101', 0, 10000000),
(11, 6, '121212121', 0, 11000000),
(12, 6, '131313131', 0, 12000000),
(13, 6, '141414141', 0, 13000000),
(14, 6, '151515151', 0, 14000000),
(15, 6, '161616161', 0, 15000000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbluser`
--
-- Tạo: Th5 26, 2020 lúc 08:05 AM
-- Cập nhật lần cuối: Th6 18, 2020 lúc 09:13 AM
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
(4, 'Bùi Chí Thanh', '(08) 3839 2', '284 Cống Quỳnh, Phuờng Phạm Ngũ Lão, Quận 1, Sài Gòn - TP HCM', 'sad.rain1996@gmail.com', '1234567890', '$2a$10$BSy/3DGcTEz7Nu/4hVbNWuWCqvVuq2cQ3jELH509Y/8i2/iHO/tTu', 3, '97800000', '{\"code\":1553887,\"ts\":1592471475993}', 1),
(5, 'Hàng Hữu Thế', '(08) 3823 8', '82 Nguyễn Du, Phường Bến Nghé, Quận 1, Sài Gòn - TP HCM', 'hhthe@gmail.com', '2345678901', '$2a$10$BSy/3DGcTEz7Nu/4hVbNWuWCqvVuq2cQ3jELH509Y/8i2/iHO/tTu', 3, '200510000', '', 1),
(6, 'Phan Tấn Thịnh', '(08) 3740 0', '177 Trần Não, Phường Bình An, Quận 2, Sài Gòn - TP HCM', 'ptthinh@gmail.com', '3456789012', '$2a$10$BSy/3DGcTEz7Nu/4hVbNWuWCqvVuq2cQ3jELH509Y/8i2/iHO/tTu', 3, '233150000', '', 1),
(7, 'Trần Quốc Toản', '(08) 3931 1', '16/99 - 16/101 Kỳ Đồng, Phường 9, Quận 3, Sài Gòn - TP HCM', 'tqtoan@gmail.com', '4567890123', '$2a$10$BSy/3DGcTEz7Nu/4hVbNWuWCqvVuq2cQ3jELH509Y/8i2/iHO/tTu', 3, '400500000', '', 1),
(8, 'Trần Chí Vỹ', '(08) 3824 9', '280/10 Cách mạng Tháng 8, Phường 10, Quận 3, Sài Gòn - TP HCM', 'tcvy@gmail.com', '5678901234', '$2a$10$BSy/3DGcTEz7Nu/4hVbNWuWCqvVuq2cQ3jELH509Y/8i2/iHO/tTu', 3, '500000000', '', 1),
(9, 'Đặng Xuân Vinh', '(08) 3935 0', '210/18/2 Cách mạng Tháng 8, Phường 10, Quận 3, Sài Gòn - TP HCM', 'dxvinh@gmail.com', '6789012345', '$2a$10$BSy/3DGcTEz7Nu/4hVbNWuWCqvVuq2cQ3jELH509Y/8i2/iHO/tTu', 3, '600000000', '', 1),
(10, 'Lê Thanh Trường Vinh', '(08) 3931 3', '80/76 Trần Quang Diệu, Phường 14, Quận 3, Sài Gòn - TP HCM', 'lttvinh@gmail.com', '7890123456', '$2a$10$BSy/3DGcTEz7Nu/4hVbNWuWCqvVuq2cQ3jELH509Y/8i2/iHO/tTu', 3, '2305150000', '', 1),
(11, 'Phan Nhật Vinh', '(08) 3885 3', '373/14 Cách mạng Tháng 8, Phường 13, Quận 3, Sài Gòn - TP HCM', 'pnvinh@gmail.com', '8901234567', '$2a$10$BSy/3DGcTEz7Nu/4hVbNWuWCqvVuq2cQ3jELH509Y/8i2/iHO/tTu', 3, '800000000', '', 1),
(12, 'Trần Quang Thiện', '(08) 3930 3', '59 Trần Quốc Thảo, Ward 7, Quận 3, Sài Gòn - TP HCM', 'tqthien@gmail.com', '9012345678', '$2a$10$BSy/3DGcTEz7Nu/4hVbNWuWCqvVuq2cQ3jELH509Y/8i2/iHO/tTu', 3, '1171380002', '', 1),
(13, 'Đỗ Quang Thịnh', '(08) 3932 5', '38 Tú Xương, Phường 7, Quận 3, Sài Gòn - TP HCM', 'dqthinh@gmail.com', '1478523690', '$2a$10$BSy/3DGcTEz7Nu/4hVbNWuWCqvVuq2cQ3jELH509Y/8i2/iHO/tTu', 3, '1014760000', '', 1);

-- --------------------------------------------------------
INSERT INTO `tbluser` (`name`, `phone`, `address`, `email`, `username`, `password`, `role`, `bank_balance`, `verify`, `is_active`) VALUES
('Đỗ Quang Thịnh', '(08) 3932 5', '389/10 Ngô Gia Tự, phường 3, quận 10, TP HCM', 'kyou@gmail.com', '1986523690', '$2a$10$BSy/3DGcTEz7Nu/4hVbNWuWCqvVuq2cQ3jELH509Y/8i2/iHO/tTu', 3, '1014760000', '', 1);

--
-- Cấu trúc bảng cho bảng `userrefreshtokenext`
--
-- Tạo: Th6 09, 2020 lúc 01:21 PM
-- Cập nhật lần cuối: Th6 18, 2020 lúc 05:54 AM
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
(5, '9AStUe2qR3ChatLI6fAYK3s7JHP76hVfK8Tsz397yD6wuwkOZiritmqELof4womECO05VoCMg2Dk0GFW', '2020-06-13 17:52:37'),
(6, '2BVMRcJ6ZCMz2m1KZOo3maqUopLN5Mu7amTOHZq0fYqvKJJZpA4BLvF9xjcaAZF6lrxwF9Vgl3J9tjAr', '2020-06-15 21:43:51'),
(2, 'C6WsgCPHHiHQY7TrOcnrpzmOdtBPz5BWyMzu5jCviA588fwAYiGBLzPepGq7GTxJpr2oQSYGDCJ5hPCL', '2020-06-18 12:38:45'),
(4, 'kdt25rIT8t8Im53OC2WWSuwRyHiVeQKm8C1KmmpHcFbaBste3BDlN8seFgzbMeHFKxkdT63UaH8HB7Ef', '2020-06-18 12:54:13');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
