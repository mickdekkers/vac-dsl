export type Command = {
  from: string
  to: string
  hash: string
  properties: {
    [name: string]: string | number
  }
}
