export default class PropertyValidator {
  constructor(validations) {
    this.validations = validations
  }

  validate(input) {
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
      { valid: true, msg: null }
    )
  }
}
