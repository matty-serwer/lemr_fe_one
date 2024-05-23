export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
  email: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  bloodType: string;
  allergies: string[];
  medicalHistory: string[];
  emergencyContacts: EmergencyContact[];
  currentMedications: string[];
}

export interface NoteContent {
  text: string;
}

export interface Note {
  id: string;
  patientId: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
  type: string;
  content: NoteContent[];
}

export interface NewNote {
  patientId: string;
  author: string;
  type: string;
  content: {
    text: string
  }[]
}