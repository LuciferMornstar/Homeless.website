// Base user interface with GDPR-related fields
export interface User {
  UserID: number;
  Username: string;
  Email: string;
  Role: string;
  HasDog: boolean;
  IsHiddenMember: boolean;
  FirstName?: string;
  LastName?: string;
  ContactPreference: string;
  PrivacyPolicyAgreed: boolean;
  MarketingConsentGiven: boolean;
  DataSharingConsentGiven: boolean;
  PreferredLanguage: string;
  EmailVerified: boolean;
  AccessibilityPreferences?: string;
}

// Dog-related interfaces
export interface ServiceDog {
  DogID: number;
  UserID: number;
  Name: string;
  Breed?: string;
  IsServiceDog: boolean;
  ServiceDogType?: string;
  ServiceDogTrainingLevel?: string;
  ProfileImage?: string;
}

export interface DogFriendlyResource {
  DogFriendlyResourceID: number;
  Name: string;
  Description: string;
  ServicesOffered: string;
  Address: string;
  City: string;
  PostCode: string;
  Phone: string;
  DogSize: string;
  HasDogFacilities: boolean;
  IsVerified: boolean;
  Latitude: number;
  Longitude: number;
}

// Shelter and support interfaces
export interface EmergencyShelter {
  ShelterID: number;
  Name: string;
  Address: string;
  CurrentAvailability: number;
  AcceptsPets: boolean;
  DogFriendly: boolean;
  ServicesOffered: string;
  AccessibilityFeatures?: string;
  RequiresReferral: boolean;
  Latitude: number;
  Longitude: number;
  IsVerified: boolean;
}

export interface FoodBank {
  FoodBankID: number;
  Name: string;
  Address: string;
  OpeningHours: string;
  Requirements: string;
  CurrentStockLevel: 'Low' | 'Medium' | 'High';
  PetFoodAvailable: boolean;
  DeliveryAvailable: boolean;
  Latitude: number;
  Longitude: number;
}

// Housing Opportunities interface
export interface HousingOpportunity {
  PropertyID: number;
  Title: string;
  Description: string;
  PropertyType: string;
  Location: string;
  Address: string;
  City: string;
  PostCode: string;
  Rent: number;
  DepositAmount: number;
  BedroomCount: number;
  AcceptsDogs: boolean;
  AcceptsHousingBenefit: boolean;
  HasAccessibility: boolean;
  IsAvailable: boolean;
  DateListed: Date;
  LandlordID?: number;
  ContactPhone?: string;
  ContactEmail?: string;
  ImageUrls?: string[];
  Latitude?: number;
  Longitude?: number;
}

// Mental health interfaces
export interface MentalHealthResource {
  ResourceID: number;
  Name: string;
  ResourceType: string;
  ServicesOffered: string;
  AcceptsHomeless: boolean;
  AcceptsDogs: boolean;
  ProvidesRemoteSupport: boolean;
  WaitingTimeDays?: number;
  NHSFunded: boolean;
}

export interface MentalHealthAssessment {
  AssessmentID: number;
  UserID: number;
  TotalScore: number;
  InterpretationText: string;
  RecommendationsText: string;
  DateTaken: Date;
}

// Support and services interfaces
export interface AddictionService {
  ServiceID: number;
  Name: string;
  ServiceType: string;
  IsNHSProvided: boolean;
  AcceptsSelfReferrals: boolean;
  HasDualDiagnosisSupport: boolean;
  WaitingListTimeWeeks?: number;
}

export interface Organization {
  OrganizationID: number;
  Name: string;
  ServicesOffered: string;
  IsVerified: boolean;
  IsNHSAffiliated: boolean;
  CharityNumber?: string;
}

// GDPR-related interfaces
export interface GDPRConsent {
  LogID: number;
  UserID: number;
  ConsentType: string;
  ConsentGiven: boolean;
  DateLogged: Date;
  ConsentVersion: string;
}

export interface DataRequest {
  RequestID: number;
  UserID: number;
  RequestDate: Date;
  Status: string;
  CompletionDate?: Date;
}

// Hidden section interfaces
export interface SensitiveLocation {
  LocationID: number;
  LocationType: string;
  Description: string;
  Latitude: number;
  Longitude: number;
  SafetyWarnings?: string;
  IsVerified: boolean;
}