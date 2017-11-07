import ExtendableError from './extendable-error'

export class SanityCheckError extends ExtendableError {}

export default (assertionResult: boolean, message: string) => {
  if (!assertionResult) {
    throw new SanityCheckError(message)
  }
}
