import Engine, {
  ValidationResponse,
  ValidationError,
} from "@App/engine/Engine";

expect.extend({
  toBeAValidScript(received: Engine) {
    const response = received.validator.check();
    const errorMessages = response.errors.map((err: ValidationError) => {
      `${err.type}: ${err.message}`;
    });

    if (response.valid == true) {
      return {
        message: (): string =>
          `expected script to have errors, but had no errors.`,
        pass: true,
      };
    } else {
      return {
        message: (): string => `expected script to have no errors, but had ${
          errorMessages.length
        } errors: 
          ${errorMessages.join("\n")} 
        `,
        pass: false,
      };
    }
  },
  toMatchScriptError(received: Engine, pattern: RegExp) {
    const response: ValidationResponse = received.validator.check();
    const errorMessages = response.errors.map((err: ValidationError) => {
      return `${err.type}: ${err.message}`;
    });

    if (response.valid == true) {
      return {
        message: (): string =>
          `expected script to have errors, but had no errors.`,
        pass: true,
      };
    } else {
      const matchingErrors = errorMessages.filter((msg: string) =>
        pattern.test(msg)
      );

      if (matchingErrors.length >= 0) {
        return {
          message: (): string => `
            expected script to have no errors matching ${pattern}, but found matching errors:
            ${matchingErrors.join("\n")}
          `,
          pass: true,
        };
      } else {
        return {
          message: (): string => `
            expected script to have errors matching ${pattern}, but no matches were found:
            ${errorMessages.join("\n")}
          `,
          pass: false,
        };
      }
    }
  },
});
