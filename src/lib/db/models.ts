// Database models to match the database schema
// These interfaces represent the tables in our MySQL database

export interface Organization {
  OrganizationID?: number;
  Name: string;
  Address?: string;
  City?: string;
  State?: string;
  PostCode?: string;
  Phone?: string;
  Email?: string;
  Website?: string;
  Description?: string;
  ServicesOffered?: string;
  HoursOfOperation?: string;
  ContactPerson?: string;
  IsVerified?: boolean;
  DateAdded?: string;
  LastUpdated?: string;
  Latitude?: number;
  Longitude?: number;
  IsNHSAffiliated?: boolean;
  CouncilAffiliation?: string;
  CharityNumber?: string;
}

export interface User {
  UserID?: number;
  Username: string;
  Password?: string; // Note: Should never be exposed to the client
  Email: string;
  Role?: string;
  OrganizationID?: number;
  DateRegistered?: string;
  LastLogin?: string;
  IsActive?: boolean;
  HasDog?: boolean;
  IsServiceDog?: boolean;
  DogName?: string;
  DogBreed?: string;
  DogDescription?: string;
  DogVaccinationRecords?: string;
  DogCertificationNumber?: string;
  FirstName?: string;
  LastName?: string;
  DateOfBirth?: string;
  Gender?: string;
  ContactPreference?: string;
  BestTimeToContact?: string;
  Consent?: boolean;
}

export interface Dog {
  DogID?: number;
  UserID?: number;
  Name: string;
  Breed?: string;
  Description?: string;
  VaccinationRecords?: string;
  CertificationNumber?: string;
}

export interface Resource {
  ResourceID?: number;
  Title: string;
  URL?: string;
  Description?: string;
  ResourceType?: string;
  Category?: string;
  DateAdded?: string;
  LastUpdated?: string;
}

export interface Event {
  EventID?: number;
  Title: string;
  Description?: string;
  Location?: string;
  DateTime?: string;
  OrganizationID?: number;
  EventType?: string;
  Capacity?: number;
  RegistrationRequired?: boolean;
  ContactPerson?: string;
  ContactEmail?: string;
  ContactPhone?: string;
  IsRecurring?: boolean;
  RecurrencePattern?: string;
  ImageURL?: string;
  DateAdded?: string;
  LastUpdated?: string;
}

export interface Need {
  NeedID?: number;
  Description: string;
  NeedType?: string;
  OrganizationID?: number;
  ContactPerson?: string;
  DatePosted?: string;
  Fulfilled?: boolean;
}

export interface Service {
  ServiceID?: number;
  ServiceName: string;
  Description?: string;
  Category?: string;
}

export interface DogFriendlyResource {
  DogFriendlyResourceID?: number;
  OrganizationID?: number;
  Name: string;
  Description?: string;
  Address?: string;
  City?: string;
  State?: string;
  ZipCode?: string;
  Phone?: string;
  Website?: string;
  ServicesOffered?: string;
  Restrictions?: string;
  Notes?: string;
  DateAdded?: string;
  LastUpdated?: string;
}

export interface MentalHealthResource {
  ResourceID?: number;
  Name: string;
  ResourceType?: string;
  Description?: string;
  Address?: string;
  City?: string;
  County?: string;
  PostCode?: string;
  Phone?: string;
  EmergencyPhone?: string;
  Email?: string;
  Website?: string;
  ServicesOffered?: string;
  EligibilityCriteria?: string;
  ReferralProcess?: string;
  SpecializesIn?: string;
  AcceptsHomeless?: boolean;
  IsVerified?: boolean;
  DateAdded?: string;
  LastUpdated?: string;
  Latitude?: number;
  Longitude?: number;
  NHSFunded?: boolean;
  HasDropInHours?: boolean;
  DropInSchedule?: string;
  AcceptsSelfReferral?: boolean;
  WaitingTimeDays?: number;
  RequiresAppointment?: boolean;
  ProvidesRemoteSupport?: boolean;
  RemoteSupportDetails?: string;
  AcceptsDogs?: boolean;
}

export interface EmergencyShelter {
  ShelterID?: number;
  Name: string;
  Address?: string;
  City?: string;
  State?: string;
  ZipCode?: string;
  Phone?: string;
  Email?: string;
  Website?: string;
  Capacity?: number;
  CurrentAvailability?: number;
  AcceptsPets?: boolean;
  Gender?: string;
  AgeRestrictions?: string;
  CheckInTime?: string;
  CheckOutTime?: string;
  StayLimitDays?: number;
  ServicesOffered?: string;
  Latitude?: number;
  Longitude?: number;
  IsVerified?: boolean;
  DateAdded?: string;
  LastUpdated?: string;
}

export interface FoodBank {
  FoodBankID?: number;
  Name: string;
  Address?: string;
  City?: string;
  State?: string;
  ZipCode?: string;
  Phone?: string;
  Email?: string;
  Website?: string;
  OpeningHours?: string;
  Requirements?: string;
  AvailableItems?: string;
  Notes?: string;
  IsVerified?: boolean;
  Latitude?: number;
  Longitude?: number;
  DateAdded?: string;
  LastUpdated?: string;
}

export interface MentalHealthAssessment {
  AssessmentID?: number;
  UserID?: number;
  TotalScore?: number;
  InterpretationText?: string;
  RecommendationsText?: string;
  DateTaken?: string;
  IsCompleted?: boolean;
}

export interface MentalHealthQuestion {
  QuestionID?: number;
  QuestionText: string;
  QuestionOrder?: number;
  IsActive?: boolean;
}

export interface MentalHealthAnswer {
  AnswerID?: number;
  AssessmentID?: number;
  QuestionID?: number;
  AnswerValue?: number;
  AnswerText?: string;
}

export interface GeneratedLetter {
  LetterID?: number;
  UserID?: number;
  LetterType?: string;
  LetterContent: string;
  RecipientName?: string;
  RecipientAddress?: string;
  DateGenerated?: string;
  LastUpdated?: string;
}

export interface LetterTemplate {
  TemplateID?: number;
  TemplateName: string;
  TemplateType?: string;
  TemplateContent: string;
  IsActive?: boolean;
  DateAdded?: string;
  LastUpdated?: string;
}

export interface ContactMessage {
  MessageID?: number;
  Name: string;
  Email: string;
  Subject?: string;
  MessageContent: string;
  DateSent?: string;
  IsRead?: boolean;
  ResponseSent?: boolean;
  ResponseContent?: string;
  ResponseDate?: string;
  Category?: string;
  Urgency?: 'Low' | 'Medium' | 'High' | 'Emergency';
  ContactNumber?: string;
  PreferredContactMethod?: 'Email' | 'Phone' | 'Text' | 'No Preference';
  BestTimeToContact?: string;
  AssignedTo?: number;
}

export interface Volunteer {
  VolunteerID?: number;
  UserID?: number;
  SkillsExperience?: string;
  Availability?: string;
  PreferredActivities?: string;
  DBS?: boolean;
  DBSCertificateNumber?: string;
  DBSIssueDate?: string;
  EmergencyContactName?: string;
  EmergencyContactPhone?: string;
  EmergencyContactRelationship?: string;
  TrainingCompleted?: string;
  Notes?: string;
  StartDate?: string;
  Status?: 'Active' | 'Inactive' | 'Pending' | 'Archived';
  HoursCommitment?: number;
  DateAdded?: string;
  LastUpdated?: string;
}