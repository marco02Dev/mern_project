import { passwordPatternAttrs } from "../../config/password-pattern-attr.config";

export const getPasswordPatternAttrs = (name: string): { pattern?: string, title?: string } => {
    if (name === "password") {
      return passwordPatternAttrs;
    }
    return {}; 
};