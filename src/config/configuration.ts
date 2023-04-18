export default () => ({
  port: parseInt(process.env.PORT),
  environment_name: process.env.NODE_ENV,
  aws: {
    cloudWatch_group_name: process.env.CLOUDWATCH_GROUP_NAME,
    cloudWatch_stream_name: process.env.CLOUDWATCH_STREAM_NAME,
    access_key: process.env.AWS_ACCESS_KEY_ID,
    secret_key: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  },
});
