export function responseHandler(success, status, title, detail) {
  return {
      success: success,
      errors: {
          status,
          title,
          detail
      }
  };
}