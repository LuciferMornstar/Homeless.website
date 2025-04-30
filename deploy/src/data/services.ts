export interface Service {
  name: string;
  address?: string;
  phone?: string;
  hours?: string;
  availability?: string;
  notes?: string;
  icon?: string;
}

export const servicesDatabase: Record<string, Record<string, Service[]>> = {
  "manchester": {
    "shelters": [
      { name: "Beacon House Shelter", address: "123 Hope St, Manchester", phone: "0161 123 4567", notes: "Open 24/7. Accepts individuals.", availability: "Likely spaces", icon: "fa-solid fa-house-chimney-user" },
      { name: "St. Jude's Night Shelter", address: "45 Charity Ave, Manchester", phone: "0161 987 6543", notes: "Opens 8 PM. Men only.", availability: "Check first", icon: "fa-solid fa-bed" }
    ],
    "food banks": [
      { name: "Manchester Central Food Bank", address: "Unit 5, Progress Way, Manchester", hours: "Mon, Wed, Fri 10am-2pm", notes: "Referral usually needed.", icon: "fa-solid fa-utensils" },
      { name: "Community Kitchen Project", address: "The Old Church Hall, Manchester", hours: "Tue, Thu 12pm-3pm", notes: "Hot meals served.", icon: "fa-solid fa-bowl-food" }
    ],
    "healthcare": [
      { name: "Urban Village Medical Practice", address: "Ancoats Primary Care Centre, Manchester", phone: "0161 272 5656", notes: "GP services for homeless.", icon: "fa-solid fa-notes-medical" }
    ],
    "job centres": [
      { name: "Manchester City Jobcentre Plus", address: "Employment Hub, Central St, Manchester", phone: "Check gov.uk", notes: "Support with job searching and benefits.", icon: "fa-solid fa-briefcase" }
    ],
    "legal aid": [
      { name: "Greater Manchester Law Centre", address: "50 Newton St, Manchester", phone: "0161 834 7210", notes: "Free legal advice and representation.", icon: "fa-solid fa-scale-balanced" }
    ],
    "mental health support": [
      { name: "Manchester Mind", address: "The Ziferblat Building, 23 Edge St, Manchester", phone: "0161 769 5732", notes: "Mental health support and advocacy.", icon: "fa-solid fa-brain" }
    ]
  },
  "birmingham": {
    "shelters": [
      { name: "Midland Shelter Services", address: "78 Safe Haven Rd, Birmingham", phone: "0121 111 2222", notes: "Families and individuals.", availability: "Limited spaces", icon: "fa-solid fa-house-chimney-user" }
    ],
    "food banks": [
      { name: "Birmingham Food Hub", address: "99 Generosity Ln, Birmingham", hours: "Mon-Fri 9am-1pm", notes: "Multiple locations, check website.", icon: "fa-solid fa-utensils" }
    ],
    "healthcare": [
      { name: "Heartlands Hospital", address: "Bordesley Green East, Birmingham", phone: "0121 424 2000", notes: "Emergency and general healthcare.", icon: "fa-solid fa-hospital" }
    ],
    "legal aid": [
      { name: "Birmingham Law Centre", address: "Legal Chambers, Birmingham", phone: "0121 333 4444", notes: "Housing and benefit advice.", icon: "fa-solid fa-scale-balanced" }
    ],
    "addiction support": [
      { name: "Reach Out Recovery", address: "Support Centre, Birmingham", phone: "0121 555 6666", notes: "Drug and alcohol support services.", icon: "fa-solid fa-hand-holding-heart" }
    ],
    "lgbtq+ support": [
      { name: "Birmingham LGBT", address: "38-40 Holloway Circus, Birmingham", phone: "0121 643 0821", notes: "Support and advice for LGBTQ+ community.", icon: "fa-solid fa-rainbow" }
    ]
  },
  "east london": {
    "shelters": [
      { name: "Tower Hamlets Emergency Stay", address: "Shelter Point, E1, London", phone: "020 7123 7890", notes: "Short-term stays.", availability: "Call first", icon: "fa-solid fa-bed" }
    ],
    "food banks": [
      { name: "Hackney Foodbank", address: "Various locations, Hackney", hours: "Check website for times/locations", notes: "Referral often required.", icon: "fa-solid fa-utensils" }
    ],
    "healthcare": [
      { name: "Royal London Hospital", address: "Whitechapel Rd, London", phone: "020 7377 7000", notes: "Major trauma centre.", icon: "fa-solid fa-hospital" }
    ],
    "mental health support": [
      { name: "Mind in the City, Hackney and Waltham Forest", address: "Various locations", phone: "Check website", notes: "Mental health support services.", icon: "fa-solid fa-brain" }
    ],
    "job centres": [
      { name: "Hackney Jobcentre Plus", address: "275-281 Mare St, London E8 1EE", phone: "Check gov.uk", notes: "Job search and benefit assistance.", icon: "fa-solid fa-briefcase" }
    ],
    "domestic violence support": [
      { name: "Hawa Project", address: "Confidential Address, London", phone: "020 7882 6226", notes: "Support for women experiencing domestic violence.", icon: "fa-solid fa-heart-broken" }
    ]
  },
  "bristol": {
    "shelters": [
      { name: "Bristol Nightsafe", address: "Central Bristol Location", phone: "0117 123 4567", notes: "Young people primarily (16-25).", availability: "Call to check", icon: "fa-solid fa-house-chimney-user" },
      { name: "St Mungo's Bristol", address: "Multiple projects", phone: "See website", notes: "Various housing and support services.", icon: "fa-solid fa-bed" }
    ],
    "food banks": [
      { name: "North Bristol Foodbank", address: "Check website for distribution centres", hours: "Varies by location", notes: "Referral needed.", icon: "fa-solid fa-utensils" },
      { name: "Bristol Community Cafe", address: "St Pauls Learning Centre, Bristol", hours: "Wed 11am-2pm", notes: "Pay-what-you-can cafe.", icon: "fa-solid fa-bowl-food" }
    ],
    "healthcare": [
      { name: "Bristol Royal Infirmary", address: "Marlborough St, Bristol", phone: "0117 923 0000", notes: "General hospital services.", icon: "fa-solid fa-hospital" }
    ],
    "addiction support": [
      { name: "Bristol Drugs Project (BDP)", address: "Central Office, Brunswick Square", phone: "0117 987 6000", notes: "Comprehensive drug/alcohol support.", icon: "fa-solid fa-hand-holding-heart" }
    ],
    "refugee support": [
      { name: "Bristol Refugee Rights", address: "St Pauls Church, City Road", phone: "0117 955 6003", notes: "Advice and support for asylum seekers and refugees.", icon: "fa-solid fa-users" }
    ]
  },
  "liverpool": {
    "shelters": [
      { name: "The Whitechapel Centre", address: "Langdale St, Liverpool", phone: "0151 207 7617", notes: "For people who are homeless or at risk of homelessness.", availability: "Check Availability", icon: "fa-solid fa-house-chimney-user" }
    ],
    "food banks": [
      { name: "Liverpool Central Foodbank", address: "Unit 1, Garston Trade Park, Blackburne St, Liverpool", hours: "Mon-Fri 9:30am-12pm", notes: "Referral required.", icon: "fa-solid fa-utensils" }
    ],
    "healthcare": [
      { name: "Royal Liverpool University Hospital", address: "Prescot St, Liverpool", phone: "0151 706 2000", notes: "General hospital.", icon: "fa-solid fa-hospital" }
    ],
    "job centres": [
      { name: "Liverpool City Jobcentre", address: "Williamson Square, Liverpool", phone: "Check gov.uk", notes: "Assistance with job searching and benefits.", icon: "fa-solid fa-briefcase" }
    ],
    "young people's services": [
      { name: "YMCA Liverpool", address: "25 Hope St, Liverpool", phone: "0151 709 9616", notes: "Accommodation and support for young people.", icon: "fa-solid fa-child" }
    ]
  }
};

export const serviceKeywords: Record<string, string> = {
  "shelter": "shelters",
  "shelters": "shelters",
  "sleep": "shelters",
  "stay": "shelters",
  "accommodation": "shelters",
  "housing": "shelters",
  "homeless": "shelters",
  "food": "food banks",
  "eat": "food banks",
  "kitchen": "food banks",
  "foodbank": "food banks",
  "food bank": "food banks",
  "meal": "food banks",
  "pantry": "food banks",
  "sustenance": "food banks",
  "healthcare": "healthcare",
  "health": "healthcare",
  "doctor": "healthcare",
  "gp": "healthcare",
  "clinic": "healthcare",
  "medical": "healthcare",
  "hospital": "healthcare",
  "nurse": "healthcare",
  "job": "job centres",
  "jobs": "job centres",
  "employment": "job centres",
  "jobcentre": "job centres",
  "work": "job centres",
  "career": "job centres",
  "legal": "legal aid",
  "lawyer": "legal aid",
  "advice": "legal aid",
  "rights": "legal aid",
  "solicitor": "legal aid",
  "court": "legal aid",
  "mental": "mental health support",
  "counseling": "mental health support",
  "support": "mental health support",
  "therapy": "mental health support",
  "psychology": "mental health support",
  "wellbeing": "mental health support",
  "addiction": "addiction support",
  "drugs": "addiction support",
  "alcohol": "addiction support",
  "recovery": "addiction support",
  "substance": "addiction support",
  "abuse": "addiction support",
  "lgbtq": "lgbtq+ support",
  "gay": "lgbtq+ support",
  "lesbian": "lgbtq+ support",
  "bisexual": "lgbtq+ support",
  "transgender": "lgbtq+ support",
  "queer": "lgbtq+ support",
  "refugee": "refugee support",
  "asylum": "refugee support",
  "immigrant": "refugee support",
  "domestic violence": "domestic violence support",
  "violence": "domestic violence support",
  "young people": "young people's services",
  "youth": "young people's services",
  "teenager": "young people's services",
  "child": "young people's services"
};
