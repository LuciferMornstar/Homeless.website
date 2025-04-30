<?php
// Database connection details
$host_name = 'db5017676906.hosting-data.io';
$database = 'dbs14137291';
$user_name = 'dbu5385048';
$password = 'Z9EYceyh28Up9kH';

// Initialize response array
$response = [
    'success' => false,
    'data' => [],
    'dogFriendlyShelters' => [],
    'mentalHealthSupportShelters' => [],
    'lastUpdated' => null,
    'message' => ''
];

header('Content-Type: application/json');

try {
    // Create connection
    $link = new mysqli($host_name, $user_name, $password, $database);

    // Check connection
    if ($link->connect_error) {
        throw new Exception('Failed to connect to MySQL: ' . $link->connect_error);
    }

    // Query to get shelter availability from the EmergencyShelters table
    $query = "SELECT ShelterID as id, Name as name, City as city, 
              CurrentAvailability as available_beds, Capacity as total_beds, 
              Address as address, Phone as phone_number, DogFriendly as has_dog_facilities,
              Gender as gender, AcceptsPartners as accepts_partners,
              AccessibilityFeatures as accessibility_features, 
              HasMentalHealthSupport as has_mental_health_support,
              HasAddictionSupport as has_addiction_support,
              ServicesOffered as services_offered,
              HasSecureStorage as has_secure_storage,
              HasWifi as has_wifi,
              LastAvailabilityUpdate as last_updated, 
              County as county, PostCode as post_code,
              CheckInTime as check_in_time, CheckOutTime as check_out_time,
              AgeRestrictions as age_restrictions,
              RequiresReferral as requires_referral,
              ReferralProcess as referral_process,
              SobrietyRequirements as sobriety_requirements,
              FeeDetails as fee_details
              FROM EmergencyShelters 
              WHERE IsVerified = 1 
              ORDER BY City ASC, CurrentAvailability DESC";
    
    $result = $link->query($query);

    // If EmergencyShelters table doesn't exist/return results, try the older shelter_availability table
    if (!$result) {
        // Log the error for debugging
        error_log("Error querying EmergencyShelters: " . $link->error);
        
        // Try the older table format as fallback
        $query = "SELECT id, city, available_beds, total_beds, address, phone_number, 
                has_dog_facilities, accessibility_features, last_updated, notes 
                FROM shelter_availability 
                WHERE active = 1 
                ORDER BY city ASC";
        
        $result = $link->query($query);
        
        if (!$result) {
            throw new Exception('Error executing query: ' . $link->error);
        }
    }

    $shelters = [];
    $dogFriendlyShelters = [];
    $mentalHealthSupportShelters = [];
    $mostRecentUpdate = null;
    
    while ($row = $result->fetch_assoc()) {
        // Convert to proper data types
        $row['id'] = (int)$row['id'];
        if (isset($row['available_beds'])) $row['available_beds'] = (int)$row['available_beds'];
        if (isset($row['total_beds'])) $row['total_beds'] = (int)$row['total_beds'];
        if (isset($row['has_dog_facilities'])) $row['has_dog_facilities'] = (bool)$row['has_dog_facilities'];
        if (isset($row['has_mental_health_support'])) $row['has_mental_health_support'] = (bool)$row['has_mental_health_support'];
        if (isset($row['has_addiction_support'])) $row['has_addiction_support'] = (bool)$row['has_addiction_support'];
        if (isset($row['has_secure_storage'])) $row['has_secure_storage'] = (bool)$row['has_secure_storage'];
        if (isset($row['has_wifi'])) $row['has_wifi'] = (bool)$row['has_wifi'];
        if (isset($row['accepts_partners'])) $row['accepts_partners'] = (bool)$row['accepts_partners'];
        if (isset($row['requires_referral'])) $row['requires_referral'] = (bool)$row['requires_referral'];
        
        // Track most recent update
        $lastUpdatedField = isset($row['last_updated']) ? 'last_updated' : 'LastAvailabilityUpdate';
        if (isset($row[$lastUpdatedField])) {
            $lastUpdated = strtotime($row[$lastUpdatedField]);
            if ($mostRecentUpdate === null || $lastUpdated > $mostRecentUpdate) {
                $mostRecentUpdate = $lastUpdated;
            }
        }
        
        // Add availability percentage for easier frontend display
        if (isset($row['available_beds']) && isset($row['total_beds']) && $row['total_beds'] > 0) {
            $row['availability_percentage'] = round(($row['available_beds'] / $row['total_beds']) * 100);
        }
        
        // Add to general shelters array
        $shelters[] = $row;
        
        // Add to dog-friendly shelters array if applicable
        if (isset($row['has_dog_facilities']) && $row['has_dog_facilities']) {
            $dogFriendlyShelters[] = $row;
        }
        
        // Add to mental health support shelters array if applicable
        if (isset($row['has_mental_health_support']) && $row['has_mental_health_support']) {
            $mentalHealthSupportShelters[] = $row;
        }
    }

    $response['success'] = true;
    $response['data'] = $shelters;
    $response['dogFriendlyShelters'] = $dogFriendlyShelters;
    $response['mentalHealthSupportShelters'] = $mentalHealthSupportShelters;
    $response['lastUpdated'] = $mostRecentUpdate ? date('Y-m-d H:i:s', $mostRecentUpdate) : null;
    $response['message'] = 'Shelter data retrieved successfully';
    $response['supportContacts'] = [
        'general' => 'helpme@homeless.website',
        'dogs' => 'dogs@homeless.website',
        'phone' => '+447853811172'
    ];

    // Close connection
    $link->close();
} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = $e->getMessage();
    
    // Log the error
    error_log("Shelter availability error: " . $e->getMessage());
    
    // Fallback data if database query fails
    $currentTime = date('Y-m-d H:i:s');
    $response['data'] = [
        [
            'id' => 1,
            'name' => 'London Refuge Centre',
            'city' => 'London',
            'available_beds' => 43,
            'total_beds' => 150,
            'address' => '123 Shelter Street, London, EC1A 1BB',
            'phone_number' => '020 7123 4567',
            'has_dog_facilities' => true,
            'accessibility_features' => 'Wheelchair accessible, quiet areas available',
            'last_updated' => $currentTime,
            'gender' => 'Mixed',
            'accepts_partners' => true,
            'has_mental_health_support' => true,
            'has_addiction_support' => true,
            'has_secure_storage' => true,
            'has_wifi' => true,
            'services_offered' => 'Meals, Showers, Laundry, Support Workers, Housing Advice',
            'county' => 'Greater London',
            'post_code' => 'EC1A 1BB',
            'availability_percentage' => 29,
            'notes' => 'Multiple locations across London, call for specific site availability'
        ],
        [
            'id' => 2,
            'name' => 'Manchester Hope Shelter',
            'city' => 'Manchester',
            'available_beds' => 12,
            'total_beds' => 75,
            'address' => '45 Hope Road, Manchester, M1 2WD',
            'phone_number' => '0161 234 5678',
            'has_dog_facilities' => true,
            'accessibility_features' => 'Ground floor beds available, assistance available for visual impairments',
            'last_updated' => $currentTime,
            'gender' => 'Mixed',
            'accepts_partners' => false,
            'has_mental_health_support' => true,
            'has_addiction_support' => false,
            'has_secure_storage' => true,
            'has_wifi' => true,
            'services_offered' => 'Meals, Showers, Laundry, Kennels',
            'county' => 'Greater Manchester',
            'post_code' => 'M1 2WD',
            'availability_percentage' => 16,
            'notes' => 'Dog kennels available on site'
        ],
        [
            'id' => 3,
            'name' => 'Birmingham Refuge',
            'city' => 'Birmingham',
            'available_beds' => 18,
            'total_beds' => 60,
            'address' => '78 Refuge Lane, Birmingham, B1 1TT',
            'phone_number' => '0121 345 6789',
            'has_dog_facilities' => false,
            'accessibility_features' => 'Step-free access, sensory-friendly spaces',
            'last_updated' => $currentTime,
            'gender' => 'Mixed',
            'accepts_partners' => false,
            'has_mental_health_support' => false,
            'has_addiction_support' => true,
            'has_secure_storage' => false,
            'has_wifi' => true,
            'services_offered' => 'Meals, Showers, Mental Health Support',
            'county' => 'West Midlands',
            'post_code' => 'B1 1TT',
            'availability_percentage' => 30,
            'notes' => 'Call ahead for assessment'
        ],
        [
            'id' => 4,
            'name' => 'Glasgow Safe Haven',
            'city' => 'Glasgow',
            'available_beds' => 15,
            'total_beds' => 45,
            'address' => '32 Clyde Street, Glasgow, G1 4LU',
            'phone_number' => '0141 287 2000',
            'has_dog_facilities' => true,
            'accessibility_features' => 'Fully accessible, hearing loop available',
            'last_updated' => $currentTime,
            'gender' => 'Mixed',
            'accepts_partners' => true,
            'has_mental_health_support' => true,
            'has_addiction_support' => true,
            'has_secure_storage' => true,
            'has_wifi' => true,
            'services_offered' => 'Meals, Showers, Laundry, Mental Health Support, Pet Area',
            'county' => 'Lanarkshire',
            'post_code' => 'G1 4LU',
            'availability_percentage' => 33,
            'notes' => 'Specialist dog facilities available, including outdoor exercise area'
        ]
    ];
    
    // Populate specialized shelter arrays for fallback
    foreach ($response['data'] as $shelter) {
        if ($shelter['has_dog_facilities']) {
            $response['dogFriendlyShelters'][] = $shelter;
        }
        
        if (isset($shelter['has_mental_health_support']) && $shelter['has_mental_health_support']) {
            $response['mentalHealthSupportShelters'][] = $shelter;
        }
    }
    
    $response['lastUpdated'] = $currentTime;
    $response['supportContacts'] = [
        'general' => 'helpme@homeless.website',
        'dogs' => 'dogs@homeless.website',
        'phone' => '+447853811172'
    ];
}

// Return the JSON response
echo json_encode($response);
?>