import Joi from 'joi';

export const overtimeSchema = Joi.object({
  employee_id: Joi.string(),
  overtime_type_id: Joi.number(),
  year: Joi.number(),
  start_time: Joi.date(),
  end_time: Joi.date(),
  hours: Joi.number(),
  permit_id: Joi.string(),
  hr_permit: Joi.boolean(),
  permit_time: Joi.date(),
  sv_permit: Joi.boolean(),
  reason: Joi.string(),
  last_update_time: Joi.date(),
  act_start_time: Joi.date(),
  act_end_time: Joi.date(),
});

export const createOvertimeSchema = Joi.object({
  employee_id: Joi.string().required(),
  overtime_type_id: Joi.number().required(),
  start_time: Joi.date().required(),
  end_time: Joi.date().required(),
  hours: Joi.number(),
  reason: Joi.string().allow(null, ''),
  act_start_time: Joi.date().allow(null, ''),
  act_end_time: Joi.date().allow(null, ''),
});

export const updateOvertimeSchema = Joi.object({
  hours: Joi.number(),
  permit_id: Joi.string(),
  hr_permit: Joi.boolean(),
  permit_time: Joi.date(),
  sv_permit: Joi.boolean(),
  act_start_time: Joi.date(),
  act_end_time: Joi.date(),
});