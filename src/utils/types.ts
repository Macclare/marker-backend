import Joi from 'joi';

export const addMarkerSchema = Joi.object({
  millName: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  p1Amount: Joi.number().required(),
  numTransactions: Joi.number().required(),
  p1PriceTon: Joi.number().required(),
  lastTransactionDate: Joi.date().iso().required(),
});

export const updateMarkerSchema = Joi.object({
    millName: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    p1Amount: Joi.number().required(),
    numTransactions: Joi.number().required(),
    p1PriceTon: Joi.number().required(),
    lastTransactionDate: Joi.date().iso().required(),
  });
