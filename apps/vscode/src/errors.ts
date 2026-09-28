import { stripVTControlCharacters } from "node:util";
import { ApiError } from "@repo/sdk/client";

export class UserCancelled extends Error {}

export function cleanText(text: string): string {
  return stripVTControlCharacters(text).replace(/opsh_pat_[^\s"'<>]+/g, "[redacted token]");
}

export function errorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 401)
      return "Your access token expired or was revoked. Run Openship: Update Access Token.";
    if (error.status === 403)
      return "This token cannot perform that operation. Check its permissions and the selected organization.";
  }
  return cleanText(error instanceof Error ? error.message : "The Openship request failed.");
}
