const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3 = new S3Client({
    region: 'us-west-1'
});

exports.upload = async (bucketName, buffer, documentName, contentType) => {
    return await s3.send(new PutObjectCommand({
        Bucket: bucketName,
        Body: buffer,
        Key: documentName,
        ContentType: contentType
    }));
};

exports.delete = async (bucketName, documentName) => {
    return await s3.send(new DeleteObjectCommand({
        Bucket: bucketName,
        Key: documentName
    }));
};

exports.getSignedURL = async (key) => {
    const command = new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: key });
    return await getSignedUrl(s3, command, { expiresIn: 3600 });
};
