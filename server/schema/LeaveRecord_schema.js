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
  permit: Joi.boolean().allow(null),
  permit_time: Joi.date().allow(null),
  create_time: Joi.date().allow(null),
});