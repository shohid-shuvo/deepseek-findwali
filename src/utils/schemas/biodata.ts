// src/utils/schemas/biodata.ts
import { z } from 'zod';

export const generalInfoSchema = z.object({
  biodataType: z.string().min(1, "Biodata type is required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  birthDate: z
  .string()
  .min(1, "Birth date is required")
  .refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  height: z.string().min(1, "Height is required"),
  complexion: z.string().min(1, "Complexion is required"),
  weight: z.string().min(1, "Weight is required"),
  bloodGroup: z.string().min(1, "Blood group is required"),
  nationality: z.string().min(1, "Nationality is required"),
});

export const familyInfoSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required"),
  fatherOccupation: z.string().min(1, "Father's occupation is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  motherOccupation: z.string().min(1, "Mother's occupation is required"),
  siblings: z.array(z.object({
    name: z.string().min(1, "Sibling name is required"),
    occupation: z.string().min(1, "Sibling occupation is required"),
    maritalStatus: z.string().min(1, "Sibling marital status is required"),
  })).optional(),
});

// address form schema
export const addressSchema = z.object({
  permanentAddress: z.object({
    location: z.string().min(1, "Location is required"),
    area: z.string().min(1, "Area is required").max(100)
  }),
  presentAddress: z.object({
    sameAsPermanent: z.boolean().default(false),
    location: z.string().min(1).max(100).optional(),
    area: z.string().min(1).max(100).optional()
  }),
  grewUpLocation: z.string().min(1).max(100)
});

export type AddressFormData = z.infer<typeof addressSchema>;

// address form schema end

export type GeneralInfoFormData = z.infer<typeof generalInfoSchema>;
export type FamilyInfoFormData = z.infer<typeof familyInfoSchema>;