import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import csv from 'csv-parser';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const errorStatus = (res, statusCode, errorMessage) => res.status(statusCode).json({
  status: statusCode,
  error: errorMessage,
});

export const successStatus = (res, status, key, object) => {
  const response = { status };
  response[key] = object;
  return res.status(status).json(response);
};

export const validateJoi = (validateObject, schemaData) => {
  let error;
  const err = schemaData.validate(validateObject, { abortEarly: false });
  if (err.error) {
    error = err.error.details;
    error = error.map(singleErrors => {
      let { message } = singleErrors;
      message = message.replace(/"/gi, '');
      if (message.includes('[A-Za-z]')) {
        message = `${singleErrors.path[0]} should be a string with at least 3 characters`;
      }
      return message;
    });
  }
  return error;
};

export const getToken = (id, email) => jwt.sign({ id, email }, process.env.SECRET, {
  expiresIn: '5h',
});

export const decodeToken = token => jwt.verify(token, process.env.SECRET);

export const uploadImage = (img, publicId) => new Promise((resolve, reject) => {
  cloudinary.uploader.upload(
    img.tempFilePath,
    { public_id: publicId },
    (err, res) => (err ? reject(err) : resolve(res.url))
  );
});

export const deleteImage = publicId => new Promise((resolve, reject) => {
  cloudinary.uploader.destroy(
    publicId,
    (err, res) => (err ? reject(err) : resolve(res.url))
  );
});


export const readCsv = (file) => {
  fs.createReadStream(file)
    .pipe(csv())
    .on('data', (row) => {
      console.log(row);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
};
