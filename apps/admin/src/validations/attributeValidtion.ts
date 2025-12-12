import { z } from "zod";

export const attributesSchema = z.object({
  c: z.object({
    p: z.string().min(1, "Primary category is required"),
    s: z.string().min(1, "Secondary category is required"),
    t: z.string().min(1, "Tertiary category is required"),
  }),
  attributes: z.array(
    z.object({
      name: z.string().nonempty({ message: "Attribute name is required" }),
      type: z.enum(["select", "text", "checkbox", "number"], {
        message: "Attribute type is required",
      }),
      options: z
        .array(z.string().nonempty({ message: "Option value is required" }))
        .optional(),
      required: z.boolean().optional(),
    }),
  ),
});
