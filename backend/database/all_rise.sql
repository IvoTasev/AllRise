-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 10, 2020 at 07:32 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `all_rise`
--

-- --------------------------------------------------------

--
-- Table structure for table `challenges`
--

CREATE TABLE `challenges` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `reward` varchar(50) NOT NULL,
  `winner_id` varchar(50) DEFAULT NULL,
  `creator_id` varchar(50) NOT NULL,
  `participant_id` varchar(50) NOT NULL,
  `fixed` boolean not NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `challenges`
--

INSERT INTO `challenges` (`id`, `name`, `reward`, `winner_id`, `creator_id`, `participant_id`) VALUES
(0, 'Last one standing', 'Get the winner a cup of coffee', NULL, 1 ,2),
(1, 'Most calories burned', 'Losers owe the winner a small favor', NULL ,1 ,2),
(2, 'Most floors climbed', 'Get the winner an apple', NULL, 1 ,2);

-- --------------------------------------------------------

--
-- Table structure for table `challenge_registration`
--

CREATE TABLE `challenge_registration` (
  `user_id` varchar(50) NOT NULL,
  `challenge_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------

--
-- Table structure for table `goals`
--

CREATE TABLE `goals` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `desciption` varchar(50) NOT NULL,
  `finished` tinyint(1) NOT NULL DEFAULT 0,
  `user_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `health_facts`
--

CREATE TABLE `health_facts` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `health_facts`
--

INSERT INTO `health_facts` (`id`, `name`, `description`) VALUES
(1, 'fact1', ' standing for most of the day has the potential to burn 30.000 more calories in a year. That’s about eight pounds of fat.'),
(2, 'fact 2', ' regular, brisk walking can help prevent heart disease, high blood pressure and diabetes.'),
(3, 'fact 3', ' standing the majority of the day has been said to increase concentration, focus and overall productivity at the office.'),
(4, 'fact 4', ' good cholesterol drops by 20% after just two hours of sitting down.'),
(5, 'fact 5', ' thirty minutes to an hour of daily exercise is not enough to counteract the negative effects of prolonged sitting.');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `calories` int(11) NOT NULL DEFAULT 0,
  `points` int(11) NOT NULL DEFAULT 0,
  `steps` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `calories`, `points`, `steps`) VALUES
(1, 'John Doe', 110, 220, 1024),
(2, 'Tommy Wiseau', 10, 20, 0),
(3, 'Harry Potter', 100, 200, 0),
(4, 'Tom Poes', 220, 440, 0),
(5, 'Aladdin', 30, 60, 0),
(6, 'Micheal Reeves', 240, 480, 0),
(7, 'Jack Black', 198, 396, 0),
(8, 'Monty Python', 123, 246, 0),
(8L7YQK, 'Wim Luyendijk', 1000, 300, 200);

--
-- Table structure for coupon table
--
CREATE TABLE `coupon` (
  `id` int(11) NOT NULL,
  `description` varchar(50) NOT NULL,
  `winner_id` varchar(50) NOT NULL,
  `loser_id` varchar(50) NOT NULL,
  `activated` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `coupon` (`id`, `description`, `winner_id`, `loser_id`, `activated`) VALUES
(1, 'Get the winner a cup of coffee',  1, 2, 0),
(2, 'Losers owe the winner a small favor', 1, 2, 0),
(3, 'Get the winner an apple', 1, 2, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `challenges`
--
ALTER TABLE `challenges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `challenge_winner_fk` (`winner_id`);

--
-- Indexes for table `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `challenge_registration`
--
ALTER TABLE `challenge_registration`
  ADD KEY `challenge_id` (`challenge_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `goals`
--
ALTER TABLE `goals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `goal_fk` (`user_id`);

--
-- Indexes for table `health_facts`
--
ALTER TABLE `health_facts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `challenges`
--
ALTER TABLE `challenges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `coupon`
--
ALTER TABLE `coupon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `goals`
--
ALTER TABLE `goals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `health_facts`
--
ALTER TABLE `health_facts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `challenges`
--
ALTER TABLE `challenges`
  ADD CONSTRAINT `challenge_winner_fk` FOREIGN KEY (`winner_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `challenge_registration`
--
ALTER TABLE `challenge_registration`
  ADD CONSTRAINT `challenge_registration_ibfk_1` FOREIGN KEY (`challenge_id`) REFERENCES `challenges` (`id`),
  ADD CONSTRAINT `challenge_registration_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `goals`
--
ALTER TABLE `goals`
  ADD CONSTRAINT `goal_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
