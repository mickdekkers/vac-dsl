export type Validation = [(input: any) => boolean, string]
export type ValidationResult = {
  valid: boolean
  msg: string | null
}

export default class PropertyValidator {
  constructor(public validations: Validation[]) {}

  validate(input: any): ValidationResult {
    return this.validations.reduce(
      (acc, validation) => {
        if (acc.valid) {
          const [predicate, msg] = validation
          const valid = predicate(input)

          if (!valid) {
            acc.valid = false
            acc.msg = msg
          }
        }

        return acc
      },
      <ValidationResult>{ valid: true, msg: null }
    )
  }
}
