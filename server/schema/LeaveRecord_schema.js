import Joi from 'joi';

export const leaveRecordSchema = Joi.object({
  seq: Joi.number().integer(),
  employee_id: Joi.string().required(),
  start_time: Joi.date().required(),
  end_time: Joi.date().required(),
  hours: Joi.number().required(),
  leave_type_id: Joi.number().integer().required(),
  reason: Joi.string().allow(null, ''),
  sub_name: Joi.string().allow(null, ''),
  hr_permit: Joi.boolean().allow(null),
  sv_permit: Joi.boolean().allow(null),
  permit_time: Joi.date().allow(null),
  create_time: Joi.date().allow(null),
});

export const createLeaveRecordSchema = Joi.object({
  employee_id: Joi.string().required(),
  start_time: Joi.date().required(),
  end_time: Joi.date().required(),
  hours: Joi.number().required(),
  leave_type_id: Joi.number().integer().required(),
  reason: Joi.string().allow(null, ''),
  sub_name: Joi.string().allow(null, ''),
});
export const updateLeaveRecordSchema = Joi.object({
  seq: Joi.number().integer().required(),
  sv_permit: Joi.boolean(),
  permit_time: Joi.date(),
  permit_id: Joi.string().required(),
});
export const updateBulkLeaveRecordSchema = Joi.object({
  seq: Joi.number().integer().required(),
  sv_permit: Joi.boolean(),
});