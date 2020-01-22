import db from '../db/models';

export const destroyModel = (modelName) => {
  db[modelName].destroy({ truncate: true, cascade: true, restartIdentity: true });
};
