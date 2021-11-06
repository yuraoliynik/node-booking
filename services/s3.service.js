const S3 = require('aws-sdk/clients/s3');
const path = require('path').posix;
const {nanoid} = require('nanoid');

const {
    AWS_S3_NAME,
    AWS_S3_REGION,
    AWS_S3_ACCESS_KEY_ID,
    AWS_S3_SECRET_ACCESS_KEY
} = require('../configs/config');

const bucket = new S3({
    region: AWS_S3_REGION,
    accessKeyId: AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: AWS_S3_SECRET_ACCESS_KEY
});

module.exports ={
    uploadImage: (file = {}, itemType, itemId) => {
        const {name, data, mimetype} = file;

        const uploadPath = _fileNameBuilder(name, itemType, itemId);

        return bucket
            .upload({
                Bucket: AWS_S3_NAME,
                Body: data,
                Key: uploadPath,
                ContentType: mimetype,
                ACL: 'public-read'
            })
            .promise();
    }
};

function _fileNameBuilder(fileName, itemType, itemId) {
    const fileExtension = path.extname(fileName);

    return path.join(itemType, itemId, `${nanoid()}${fileExtension}`);
}
