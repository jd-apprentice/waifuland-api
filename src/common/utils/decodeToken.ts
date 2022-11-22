// External Modules
import jwt_decode from "jwt-decode";

/**
 * @description Decodes a token
 * @param { string } token - The token to decode
 * @returns { string } Decodes a token
 */

export const decodeToken = (token: string): string => jwt_decode(token);
