import { z } from "zod";

const create = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name can have maximum 100 characters")
    .transform((val) => val.toLowerCase()),

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(500, "Description can have maximum 500 characters"),

  metaTitle: z
    .string()
    .trim()
    .min(1, "Meta Title is required")
    .max(70, "Meta Title can have maximum 70 characters"),

  metaDescription: z
    .string()
    .trim()
    .min(1, "Meta Description is required")
    .max(160, "Meta Description can have maximum 160 characters"),

  searchTags: z
    .array(
      z
        .string()
        .trim()
        .min(1, "Each tag is required")
        .max(30, "Each tag can have maximum 30 characters"),
    )
    .nonempty("At least one search tag is required"),

  img: z
    .custom<File>()
    .refine((file) => file instanceof File, "File is required")
    .refine(
      (file) => file.type.startsWith("image/"),
      "Only image files are allowed (jpg, png, etc.)",
    )
    .optional(),
});

export const categorySchema = { create } as const;
