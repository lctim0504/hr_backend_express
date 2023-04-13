import Joi from 'joi';

export const overtimeSchema = Joi.object({
  employee_id: Joi.string().required(),
  overtime_type_id: Joi.number().required(),
  year: Joi.number().optional(),
  start_time: Joi.date().required(),
  end_time: Joi.date().required(),
  hours: Joi.number().required(),
  permit_id: Joi.string().optional(),
  hr_permit: Joi.boolean().optional(),
  permit_time: Joi.date().optional(),
  sv_permit: Joi.boolean().optional(),
  reason: Joi.string().optional(),
  last_update_time: Joi.date().optional(),
  act_start_time: Joi.date().optional(),
  act_end_time: Joi.date().optional(),
});

export const createOovertimeSchema = Joi.object({
  employee_id: Joi.string().required(),
  overtime_type_id: Joi.number().required(),
  start_time: Joi.date().required(),
  end_time: Joi.date().required(),
  
  hours: Joi.number().optional(),
  permit_id: Joi.string().optional(),
  hr_permit: Joi.boolean().optional(),
  permit_time: Joi.date().optional(),
  sv_permit: Joi.boolean().optional(),
  reason: Joi.string().optional(),
  act_start_time: Joi.date().optional(),
  act_end_time: Joi.date().optional(),
});

export const updateOovertimeSchema = Joi.object({
  hours: Joi.number().required(),
  permit_id: Joi.string().required(),
  hr_permit: Joi.boolean().required(),
  permit_time: Joi.date().required(),
  sv_permit: Joi.boolean().required(),
  act_start_time: Joi.date().required(),
  act_end_time: Joi.date().required(),
});