-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 21, 2020 lúc 06:10 PM
-- Phiên bản máy phục vụ: 10.4.11-MariaDB
-- Phiên bản PHP: 7.2.26

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

CREATE TABLE `tblbank` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `secret_string` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `tblbank`
--

INSERT INTO `tblbank` (`id`, `name`, `secret_string`) VALUES
(1, 'ngân hàng A', 'ngan hang a'),
(2, 'ngân hàng B', 'ngan hang b'),
(3, 'ngân hàng C', 'ngan hang c');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbldebtreminder`
--

CREATE TABLE `tbldebtreminder` (
  `id` int(11) NOT NULL,
  `source_id` int(11) NOT NULL,
  `des_id` int(11) NOT NULL,
  `value` text NOT NULL,
  `message` text NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tblhistorytransaction`
--

CREATE TABLE `tblhistorytransaction` (
  `id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `source_id` int(11) NOT NULL,
  `bank_company_id` int(11) NOT NULL,
  `des_id` int(11) NOT NULL,
  `value` text NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `tblhistorytransaction`
--

INSERT INTO `tblhistorytransaction` (`id`, `type`, `source_id`, `bank_company_id`, `des_id`, `value`, `message`) VALUES
(2, 1, 101, 100, 4, '500000', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tblreceivercontact`
--

CREATE TABLE `tblreceivercontact` (
  `id` int(11) NOT NULL,
  `source_id` int(11) NOT NULL,
  `des_id` int(11) NOT NULL,
  `name_contact` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbluser`
--

CREATE TABLE `tbluser` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `address` text NOT NULL,
  `email` text NOT NULL,
  `username` varchar(30) NOT NULL,
  `passsword` varchar(50) NOT NULL,
  `role` int(11) NOT NULL,
  `bank_balance` text NOT NULL,
  `is_active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `tbluser`
--

INSERT INTO `tbluser` (`id`, `name`, `phone`, `address`, `email`, `username`, `passsword`, `role`, `bank_balance`, `is_active`) VALUES
(1, 'Nguyễn Thái Hoàng', '0936252722', 'c4/6d Lê Đình Chi huyện Bình Chánh thành phố Hồ Chí Minh', 'nthoang1996@gmail.com', 'admin1', '123456', 1, '', 1),
(2, 'Trần Hoàng Anh Thư', '0947884660', '184 Phan Văn Khỏe, Phường 5, Quận 1, Sài Gòn - TP HCM', 'thathu1999@gmail.com', 'employee1', '123456', 2, '', 1),
(3, 'Võ Thanh Hiếu', '(08) 3821 0', '140/34 Calmette, Phường NTB, Quận 1, Sài Gòn - TP HCM', 'vthieu1996@gmail.com', 'employee2', '123456', 2, '', 1),
(4, 'Bùi Chí Thanh', '(08) 3839 2', '284 Cống Quỳnh, Phuờng Phạm Ngũ Lão, Quận 1, Sài Gòn - TP HCM', 'bcthanh@gmail.com', '1234567890', '123456', 3, '100500000', 1),
(5, 'Hàng Hữu Thế', '(08) 3823 8', '82 Nguyễn Du, Phường Bến Nghé, Quận 1, Sài Gòn - TP HCM', 'hhthe@gmail.com', '2345678901', '123456', 3, '200000000', 1),
(6, 'Phan Tấn Thịnh', '(08) 3740 0', '177 Trần Não, Phường Bình An, Quận 2, Sài Gòn - TP HCM', 'ptthinh@gmail.com', '3456789012', '123456', 3, '300000000', 1),
(7, 'Trần Quốc Toản', '(08) 3931 1', '16/99 - 16/101 Kỳ Đồng, Phường 9, Quận 3, Sài Gòn - TP HCM', 'tqtoan@gmail.com', '4567890123', '123456', 3, '400000000', 1),
(8, 'Trần Chí Vỹ', '(08) 3824 9', '280/10 Cách mạng Tháng 8, Phường 10, Quận 3, Sài Gòn - TP HCM', 'tcvy@gmail.com', '5678901234', '123456', 3, '500000000', 1),
(9, 'Đặng Xuân Vinh', '(08) 3935 0', '210/18/2 Cách mạng Tháng 8, Phường 10, Quận 3, Sài Gòn - TP HCM', 'dxvinh@gmail.com', '6789012345', '123456', 3, '600000000', 1),
(10, 'Lê Thanh Trường Vinh', '(08) 3931 3', '80/76 Trần Quang Diệu, Phường 14, Quận 3, Sài Gòn - TP HCM', 'lttvinh@gmail.com', '7890123456', '123456', 3, '700000000', 1),
(11, 'Phan Nhật Vinh', '(08) 3885 3', '373/14 Cách mạng Tháng 8, Phường 13, Quận 3, Sài Gòn - TP HCM', 'pnvinh@gmail.com', '8901234567', '123456', 3, '800000000', 1),
(12, 'Trần Quang Thiện', '(08) 3930 3', '59 Trần Quốc Thảo, Ward 7, Quận 3, Sài Gòn - TP HCM', 'tqthien@gmail.com', '9012345678', '123456', 3, '900000000', 1),
(13, 'Đỗ Quang Thịnh', '(08) 3932 5', '38 Tú Xương, Phường 7, Quận 3, Sài Gòn - TP HCM', 'dqthinh@gmail.com', '1478523690', '123456', 3, '1000000000', 1);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `tblbank`
--
ALTER TABLE `tblbank`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tbldebtreminder`
--
ALTER TABLE `tbldebtreminder`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tblhistorytransaction`
--
ALTER TABLE `tblhistorytransaction`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tblreceivercontact`
--
ALTER TABLE `tblreceivercontact`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tbluser`
--
ALTER TABLE `tbluser`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `tblbank`
--
ALTER TABLE `tblbank`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `tbldebtreminder`
--
ALTER TABLE `tbldebtreminder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `tblhistorytransaction`
--
ALTER TABLE `tblhistorytransaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `tblreceivercontact`
--
ALTER TABLE `tblreceivercontact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `tbluser`
--
ALTER TABLE `tbluser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
