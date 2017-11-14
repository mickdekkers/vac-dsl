export type Command = {
  from: string
  to: string
  hash: string
  properties: {
    [key: string]: string | number
  }
}
