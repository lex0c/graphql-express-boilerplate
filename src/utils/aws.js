import aws from 'aws-sdk';

export const s3Upload = (keyName, stream) => {
  const s3 = new aws.S3({ apiVersion: '2006-03-01' });
  const uploadParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: keyName,
    Body: stream,
    ACL: 'public-read',
  };
  return new Promise((resolve, reject) => {
    s3.upload(uploadParams, (err, data) => {
      if (err) reject(err);
      if (data) {
        resolve({
          md5: data.ETag,
          url: data.Location,
        });
      }
    });
  }).catch(err => {
    throw err;
  });
};
