import { z } from "zod";

export const agentInsertSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
  instructions: z.string().min(1, { message: "instructions is required" }),
});

export const agentsUpdateSchema = agentInsertSchema.extend({
  id: z.string().min(1, { message: "Id is required" }),
});
