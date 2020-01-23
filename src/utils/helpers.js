import db from '../db/models';

export const destroyModel = async (modelName) => {
  await db[modelName].destroy({ truncate: true, cascade: true, restartIdentity: true });
};

export const createUser = async (data, modelName) => {
  await db[modelName].create({ ...data });
};
