-- Remove database creation and switch to your permitted database
-- CREATE DATABASE IF NOT EXISTS `dbinstruct`;
-- USE `dbinstruct`;
USE `dbs14137291`;

-- Start by disabling foreign key checks to avoid dependency issues
SET FOREIGN_KEY_CHECKS = 0;

-- Create or verify the new tables first

-- Organizations table
CREATE TABLE IF NOT EXISTS `Organizations` (
    `OrganizationID` INT AUTO_INCREMENT PRIMARY KEY,
    `Address` VARCHAR(255),
    `Address` VARCHAR(255),
    `City` VARCHAR(100),
    `County` VARCHAR(50),
    `Phone` VARCHAR(20),
    `Phone` VARCHAR(20),
    `Email` VARCHAR(255),
    `Website` VARCHAR(255),
    `Description` TEXT,
    `ServicesOffered` TEXT,
    `HoursOfOperation` VARCHAR(255),
    `ContactPerson` VARCHAR(255),
    `IsVerified` BOOLEAN,
    `DateAdded` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `LastUpdated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `Latitude` DECIMAL(10,6),
    `Longitude` DECIMAL(10,6),
    `IsNHSAffiliated` BOOLEAN DEFAULT FALSE,
    `CouncilAffiliation` VARCHAR(100),
    `CharityNumber` VARCHAR(50),
    `DataProtectionOfficerName` VARCHAR(255),
    `DataProtectionOfficerEmail` VARCHAR(255),
    `PrivacyPolicyURL` VARCHAR(255),
    `UniquePRN` VARCHAR(50)
);

-- Create index for Organizations (checking if exists first)
DROP PROCEDURE IF EXISTS CreateIndexIfNotExists;
DELIMITER $$
CREATE PROCEDURE CreateIndexIfNotExists()
BEGIN
    -- For Organizations.Latitude, Longitude
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.statistics 
        WHERE table_schema = DATABASE() 
        AND table_name = 'Organizations' 
        AND index_name = 'idx_organizations_location'
    ) THEN
        CREATE INDEX idx_organizations_location ON `Organizations` (`Latitude`, `Longitude`);
    END IF;
    
    -- For Organizations.Name
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.statistics 
        WHERE table_schema = DATABASE() 
        AND table_name = 'Organizations' 
        AND index_name = 'idx_organizations_name'
    ) THEN
        CREATE INDEX idx_organizations_name ON `Organizations` (`Name`);
    END IF;
    
    -- For Organizations.CharityNumber
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.statistics 
        WHERE table_schema = DATABASE() 
        AND table_name = 'Organizations' 
        AND index_name = 'idx_organizations_charity'
    ) THEN
        CREATE INDEX idx_organizations_charity ON `Organizations` (`CharityNumber`);
    END IF;
END $$
DELIMITER ;

CALL CreateIndexIfNotExists();
DROP PROCEDURE IF EXISTS CreateIndexIfNotExists;

-- Users table
CREATE TABLE IF NOT EXISTS `Users` (
    `UserID` INT AUTO_INCREMENT PRIMARY KEY,
    `Username` VARCHAR(255) NOT NULL UNIQUE,
    `Password` VARCHAR(255) NOT NULL,
    `Email` VARCHAR(255) NOT NULL UNIQUE,
    `Role` VARCHAR(50),
    `OrganizationID` INT,
    `DateRegistered` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `LastLogin` TIMESTAMP NULL,
    `IsActive` BOOLEAN DEFAULT TRUE,
    `IsHiddenMember` BOOLEAN DEFAULT FALSE,
    `HasDog` BOOLEAN DEFAULT FALSE,
    `FirstName` VARCHAR(255),
    `LastName` VARCHAR(255),
    `DateOfBirth` DATE,
    `Gender` VARCHAR(50),
    `ContactPreference` VARCHAR(50),
    `BestTimeToContact` VARCHAR(50),
    `PrivacyPolicyAgreed` BOOLEAN DEFAULT FALSE,
    `MarketingConsentGiven` BOOLEAN DEFAULT FALSE,
    `DataSharingConsentGiven` BOOLEAN DEFAULT FALSE,
    `LastConsentUpdate` TIMESTAMP,
    `TwoFactorEnabled` BOOLEAN DEFAULT FALSE,
    `TwoFactorMethod` VARCHAR(50),
    `TwoFactorSecret` VARCHAR(255),
    `AccessibilityPreferences` TEXT,
    `PreferredLanguage` VARCHAR(50) DEFAULT 'en-GB',
    `FailedLoginAttempts` INT DEFAULT 0,
    `AccountLocked` BOOLEAN DEFAULT FALSE,
    `AccountLockedUntil` TIMESTAMP NULL,
    `ResetToken` VARCHAR(255),
    `ResetTokenExpiry` TIMESTAMP NULL,
    `LastPasswordChange` TIMESTAMP NULL,
    `EmailVerified` BOOLEAN DEFAULT FALSE,
    `EmailVerificationToken` VARCHAR(255),
    `EmailVerificationExpiry` TIMESTAMP NULL,
    FOREIGN KEY (`OrganizationID`) REFERENCES `Organizations` (`OrganizationID`)
);

-- Create indexes for Users (checking if exists first)
DROP PROCEDURE IF EXISTS CreateUserIndexes;
DELIMITER $$
CREATE PROCEDURE CreateUserIndexes()
BEGIN
    -- For Users.Email
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.statistics 
        WHERE table_schema = DATABASE() 
        AND table_name = 'Users' 
        AND index_name = 'idx_users_email'
    ) THEN
        CREATE INDEX idx_users_email ON `Users` (`Email`);
    END IF;
    
    -- For Users.Username
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.statistics 
        WHERE table_schema = DATABASE() 
        AND table_name = 'Users' 
        AND index_name = 'idx_users_username'
    ) THEN
        CREATE INDEX idx_users_username ON `Users` (`Username`);
    END IF;
END $$
DELIMITER ;

CALL CreateUserIndexes();
DROP PROCEDURE IF EXISTS CreateUserIndexes;

-- Dogs table
CREATE TABLE IF NOT EXISTS `Dogs` (
    `DogID` INT AUTO_INCREMENT PRIMARY KEY,
    `UserID` INT,
    `Name` VARCHAR(255) NOT NULL,
    `Breed` VARCHAR(100),
    `DateOfBirth` DATE,
    `Sex` ENUM('Male', 'Female') NOT NULL,
    `Microchipped` BOOLEAN DEFAULT FALSE,
    `MicrochipNumber` VARCHAR(50),
    `Description` TEXT,
    `Size` ENUM('Small', 'Medium', 'Large', 'Extra Large') NOT NULL,
    `SpecialNeeds` TEXT,
    `DietaryRequirements` TEXT,
    `BehavioralNotes` TEXT,
    `IsServiceDog` BOOLEAN DEFAULT FALSE,
    `ServiceDogType` ENUM('Assistance', 'Guide', 'Hearing', 'Medical Alert', 'Psychiatric', 'Mobility', 'Other') NULL,
    `ServiceDogTrainingLevel` ENUM('In Training', 'Partially Trained', 'Fully Trained', 'Retired') NULL,
    `InsuranceProvider` VARCHAR(100),
    `InsurancePolicyNumber` VARCHAR(100),
    `VeterinarianName` VARCHAR(100),
    `VeterinarianContact` VARCHAR(100),
    `ProfileImage` VARCHAR(255),
    `LastVetVisit` DATE,
    `DateAdded` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `LastUpdated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`)
);

-- Ensure IsServiceDog column exists in Dogs table (prevents #1072 error if table existed before)
SET @column_exists := (
    SELECT COUNT(*)
    FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'Dogs'
      AND COLUMN_NAME = 'IsServiceDog'
);
SET @alter_sql := IF(@column_exists = 0,
    'ALTER TABLE Dogs ADD COLUMN IsServiceDog BOOLEAN DEFAULT FALSE',
    'SELECT "Column IsServiceDog already exists"'
);
PREPARE alter_stmt FROM @alter_sql;
EXECUTE alter_stmt;
DEALLOCATE PREPARE alter_stmt;

-- Create index for Dogs (checking if exists first)
DROP PROCEDURE IF EXISTS CreateDogIndexes;
DELIMITER $$
CREATE PROCEDURE CreateDogIndexes()
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.statistics 
        WHERE table_schema = DATABASE() 
        AND table_name = 'Dogs' 
        AND index_name = 'idx_dogs_service'
    ) THEN
        CREATE INDEX idx_dogs_service ON `Dogs` (`IsServiceDog`);
    END IF;
END $$
DELIMITER ;

CALL CreateDogIndexes();
DROP PROCEDURE IF EXISTS CreateDogIndexes;

-- SiteContactDetails table
CREATE TABLE IF NOT EXISTS `SiteContactDetails` (
    `ContactID` INT AUTO_INCREMENT PRIMARY KEY,
    `Purpose` VARCHAR(100) NOT NULL,
    `Email` VARCHAR(255) NOT NULL,
    `Phone` VARCHAR(20),
    `ResponseTimeHours` INT,
    `DisplayOrder` INT,
    `IsActive` BOOLEAN DEFAULT TRUE,
    `AdditionalInfo` TEXT
);

-- SocialMediaLinks table
CREATE TABLE IF NOT EXISTS `SocialMediaLinks` (
    `LinkID` INT AUTO_INCREMENT PRIMARY KEY,
    `Platform` VARCHAR(50) NOT NULL,
    `URL` VARCHAR(255) NOT NULL,
    `DisplayName` VARCHAR(100),
    `DisplayOrder` INT,
    `IsActive` BOOLEAN DEFAULT TRUE,
    `Icon` VARCHAR(50)
);

-- Create a procedure to identify tables that aren't in the new schema
DROP PROCEDURE IF EXISTS FindTablesToDrop;
DELIMITER $$
CREATE PROCEDURE FindTablesToDrop()
BEGIN
    DECLARE tableName VARCHAR(255);
    DECLARE done INT DEFAULT FALSE;
    DECLARE dropStatements TEXT DEFAULT '';
    
    -- Cursor to get all tables in the database
    DECLARE tableCursor CURSOR FOR
        SELECT TABLE_NAME
        FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = DATABASE();
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN tableCursor;
    
    read_loop: LOOP
        FETCH tableCursor INTO tableName;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- Check if table is NOT in our new schema list
        IF tableName NOT IN (
            'Organizations', 'Users', 'Dogs', 'Resources', 'Events', 'Needs', 'Services', 
            'OrganizationServices', 'DogFriendlyResources', 'Donations', 'Feedback', 
            'MentalHealthAssessments', 'MentalHealthQuestions', 'MentalHealthAnswers', 
            'GeneratedLetters', 'LetterTemplates', 'AddictionServices', 'FoodBanks', 
            'EmergencyShelters', 'UserAssessmentResponses', 'ContactMessages', 
            'MentalHealthResources', 'BenefitsEntitlements', 'MentalHealthCrisisSupport', 
            'HousingPathways', 'Volunteers', 'VolunteerHours', 'CaseManagement', 
            'LocalCouncilContacts', 'SiteSettings', 'SiteContactDetails', 'SocialMediaLinks',
            'SensitiveLocations', 'ConspiracyTheories', 'ForumThreads', 'ForumPosts',
            'HarmReductionInformation', 'UserStories', 'SkillsExchange', 'LegalInformation',
            'EmploymentOpportunities', 'UserHealthTracking', 'UserDocumentStorage',
            'WishlistItems', 'SuccessStories', 'OAuthProviders', 'UserOAuthConnections',
            'AccessibilityTools', 'UserAccessibilitySettings', 'APIKeys', 'UserDevices',
            'RealTimeNotifications', 'RealTimeShelterUpdates', 'DataChangeLog',
            'SimplifiedContent', 'TranslatedContent', 'ServiceDogWelfareConcerns',
            'AccessibilityRatingCategories', 'ResourceAccessibilityRatings',
            'GDPRConsentLog', 'DataExportRequests', 'DataDeletionRequests'
        ) THEN
            SET dropStatements = CONCAT(dropStatements, 'DROP TABLE IF EXISTS `', tableName, '`;\n');
        END IF;
    END LOOP;
    
    CLOSE tableCursor;
    
    -- Output the DROP statements for tables not in the new schema
    SELECT dropStatements AS 'Tables to Drop';
END$$
DELIMITER ;
-- Run the procedure to get a list of tables to drop
CALL FindTablesToDrop();

-- Add contact information
INSERT INTO `SiteContactDetails` (`Purpose`, `Email`, `Phone`, `ResponseTimeHours`, `DisplayOrder`, `IsActive`, `AdditionalInfo`)
VALUES
('General Inquiries', 'info@homeless.website', '+447853811172', 24, 1, TRUE, 'For general information and non-urgent inquiries'),
('Help & Support', 'helpme@homeless.website', '+447853811172', 12, 2, TRUE, 'If you need assistance or are in a difficult situation'),
('Dog Support Services', 'dogs@homeless.website', '+447853811172', 24, 3, TRUE, 'For inquiries about pet-friendly services and support'),
('Volunteer Opportunities', 'volunteer@homeless.website', '+447853811172', 48, 4, TRUE, 'If you would like to volunteer or help')
ON DUPLICATE KEY UPDATE
`Email` = VALUES(`Email`),
`Phone` = VALUES(`Phone`),
`ResponseTimeHours` = VALUES(`ResponseTimeHours`),
`AdditionalInfo` = VALUES(`AdditionalInfo`);

INSERT INTO `SocialMediaLinks` (`Platform`, `URL`, `DisplayName`, `DisplayOrder`, `IsActive`, `Icon`)
VALUES ('Facebook', 'www.facebook.com/homelesshelpuk', 'Homeless Help UK', 1, TRUE, 'facebook')
ON DUPLICATE KEY UPDATE
`URL` = VALUES(`URL`),
`DisplayName` = VALUES(`DisplayName`);

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;