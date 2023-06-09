export default () => ({
  port: parseInt(process.env.PORT),
  environment_name: process.env.NODE_ENV,
  api_version: process.env.API_VERSION,
  database: process.env.DATABASE_URL,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expiry: process.env.JWT_EXP,
  aws: {
    cloudWatch_group_name: process.env.CLOUDWATCH_GROUP_NAME,
    cloudWatch_stream_name: process.env.CLOUDWATCH_STREAM_NAME,
    access_key: process.env.AWS_ACCESS_KEY_ID,
    secret_key: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  },
  send_in_blue: {
    api_url: process.env.SEND_IN_BLUE_API_URL,
    sender_api_key: process.env.SEND_IN_BLUE_API_KEY,
    sender_name: process.env.SENDER_NAME,
    sender_email: process.env.SENDER_EMAIL,
  },
});
