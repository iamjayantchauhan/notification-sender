export const RESPONSE_MESSAGES = {
  common: {
    unauthorized: "Unauthorized",
  },
  user: {
    create: "User created successfully",
    remove: "User removed successfully",
    list: "Users retrieved successfully",
    single: "User retrieved successfully",
    failed: "User operation failed",
  },
  auth: {
    success: "Authenticated successfully",
    missingToken:
      "Missing authentication, Please add token in Authorization header",
    tokenExpired: "Unauthorized",
    notMatching: "Credentials are not matching",
  },
  notification: {
    list: {
      success: "Notifications retrieved successfully",
      fail: "Notification retrieval failed",
    },
    create: {
      success: "Notifications created successfully",
      fail: "Notification created failed",
    },
  },
};
