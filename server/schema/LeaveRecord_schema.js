import Joi from 'joi';

//基本欄位
export const leaveRecordSchema = Joi.object({
  seq: Joi.number().integer(),
  employee_id: Joi.string(),
  start_time: Joi.date(),
  end_time: Joi.date(),
  hours: Joi.number(),
  leave_type_id: Joi.number().integer(),
  reason: Joi.string().allow(null, ''),
  sub_name: Joi.string().allow(null, ''),
  hr_permit: Joi.boolean().allow(null),
  sv_permit: Joi.boolean().allow(null),
  permit_time: Joi.date().allow(null),
  create_time: Joi.date().allow(null),
});
//創建時的參數
export const createLeaveRecordSchema = Joi.object({
  employee_id: Joi.string().required(),
  start_time: Joi.date().required(),
  end_time: Joi.date().required(),
  leave_type_id: Joi.number().integer().required(),
  hours: Joi.number(),
  reason: Joi.string().allow(null, ''),
  sub_name: Joi.string().allow(null, ''),
});
//更新時的參數
export const updateLeaveRecordSchema = Joi.object({
  hours: Joi.number(),
  hr_permit: Joi.boolean(),
  sv_permit: Joi.boolean(),
  permit_id: Joi.string(),
  permit_time: Joi.date(),
});
//大量更新時的參數 
export const updateBulkLeaveRecordSchema = Joi.object({
  hr_permit: Joi.boolean(),
  sv_permit: Joi.boolean(),
  permit_time: Joi.date(),
  permit_id: Joi.string(),
});