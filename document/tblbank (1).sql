-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 22, 2020 lúc 04:45 AM
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

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tblbank`
--

DROP TABLE IF EXISTS `tblbank`;
CREATE TABLE IF NOT EXISTS `tblbank` (
  `id` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `public_key` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `tblbank`
--

INSERT INTO `tblbank` (`id`, `name`, `public_key`) VALUES
('hFKsgwJyJX\r\nUpNxNwZM', 'ngân hàng C', 'ngan hang c'),
('jpS38Zwq37\r\nhIQf0jkO', 'ngân hàng B', 'ngan hang b'),
('TnyjhGBTwM\r\nthNgYZkq', 'ngân hàng A', 'ngan hang a'),
('TttwVLKHvX\r\nRujyllDq', 'HoangBank', '-----BEGIN PUBLIC KEY-----\r\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCTrlHb3adQstaRWJlqtsrIeFo5\r\n7lSpE5FemvbIiBn0gGVMl+SveVm8Zj1JnpLfJngkfnsUgyJp1fLodhgtN581o7Ad\r\nYGUQlx70kWw75WhSMbDAzH5qjpFNSlNNjC8rT5XyCE/YFJ6DuEloJgXoJvRnNXPx\r\nPWj4IelLJ84ZfAWI5QIDAQAB\r\n-----END PUBLIC KEY-----');
COMMIT;

--
-- add column secret_key in table tblbank and update data 
--

ALTER TABLE `tblbank` ADD `secret_key` text;
UPDATE `tblbank` SET `secret_key` = "secretKey" where `id` = 'hFKsgwJyJX\r\nUpNxNwZM';
UPDATE `tblbank` SET `secret_key` = "secretKey" where `id` = 'jpS38Zwq37\r\nhIQf0jkO';
UPDATE `tblbank` SET `secret_key` = "secretKey" where `id` = 'TnyjhGBTwM\r\nthNgYZkq';
UPDATE `tblbank` SET `secret_key` = "secretKey" where `id` = 'TttwVLKHvX\r\nRujyllDq';

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
