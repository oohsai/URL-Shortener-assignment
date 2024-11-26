import z from "zod"

export const urlSchema = z.object({
    originalUrl: z.string().url().min(1),
  });

export const shortId = z.object({
    shortId : z.string()
})