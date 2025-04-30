-- SQL file to create shelter_availability table
-- Run this on your IONOS database to create the shelter availability table

CREATE TABLE IF NOT EXISTS `shelter_availability` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(100) NOT NULL,
  `available_beds` int(11) NOT NULL DEFAULT 0,
  `total_beds` int(11) NOT NULL DEFAULT 0,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `has_dog_facilities` tinyint(1) NOT NULL DEFAULT 0,
  `accessibility_features` text DEFAULT NULL,
  `last_updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `notes` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `city_index` (`city`),
  KEY `active_index` (`active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insert initial data for major UK cities
INSERT INTO `shelter_availability` 
(`city`, `available_beds`, `total_beds`, `address`, `phone_number`, `has_dog_facilities`, `accessibility_features`, `notes`) 
VALUES
('London', 43, 150, '123 Shelter Street, London, EC1A 1BB', '020 7123 4567', 1, 'Wheelchair accessible, quiet areas available', 'Multiple locations across London, call for specific site availability'),
('Manchester', 12, 75, '45 Hope Road, Manchester, M1 2WD', '0161 234 5678', 1, 'Ground floor beds available, assistance available for visual impairments', 'Dog kennels available on site'),
('Birmingham', 18, 60, '78 Refuge Lane, Birmingham, B1 1TT', '0121 345 6789', 0, 'Step-free access, sensory-friendly spaces', 'Call ahead for assessment'),
('Glasgow', 22, 50, '15 Sanctuary Avenue, Glasgow, G1 2BA', '0141 234 5678', 1, 'Lift access, accessible bathrooms', 'Service dog friendly spaces available'),
('Cardiff', 9, 35, '33 Haven Street, Cardiff, CF10 1TD', '029 2087 6543', 0, 'Ground floor facilities, hearing loops', 'Welsh language support available'),
('Edinburgh', 15, 45, '27 Shelter Close, Edinburgh, EH1 1QR', '0131 123 4567', 1, 'Accessible showers, quiet space available', 'Dog walking volunteers available'),
('Liverpool', 14, 40, '56 Support Street, Liverpool, L1 2CD', '0151 234 5678', 0, 'Accessible entry, ground floor beds', 'Call for availability updates'),
('Leeds', 11, 38, '18 Aid Road, Leeds, LS1 3AB', '0113 234 5678', 1, 'Step-free access, sensory accommodations', 'Dog-friendly section available'),
('Bristol', 8, 30, '42 Refuge Way, Bristol, BS1 5TF', '0117 123 4567', 1, 'Accessible bathrooms, quiet areas', 'Veterinary support available for service dogs'),
('Newcastle', 13, 35, '21 Support Avenue, Newcastle, NE1 4ST', '0191 234 5678', 0, 'Ground floor facilities, visual aids', 'Please call before arriving');

-- Create admin procedure to update bed availability
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS `update_shelter_beds`(
    IN p_city VARCHAR(100),
    IN p_available_beds INT
)
BEGIN
    UPDATE `shelter_availability` 
    SET `available_beds` = p_available_beds,
        `last_updated` = NOW()
    WHERE `city` = p_city AND `active` = 1;
    
    SELECT ROW_COUNT() AS updated_rows;
END //
DELIMITER ;

-- Grant execute permission if needed (ask your hosting provider about this)
-- GRANT EXECUTE ON PROCEDURE `dbs14137291`.`update_shelter_beds` TO 'dbu5385048'@'%';