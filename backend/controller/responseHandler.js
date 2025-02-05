export function responseHandler(success, status, title, detail) {
  if( !success ){
    return {
      success: success,
      errors: { status, title, detail}
    };
  }return { success, status, title, detail }
    
}