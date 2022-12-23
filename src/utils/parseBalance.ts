export default function parseBalance(balance: number) : string {
    const str = balance.toString()
    if (balance < 1000) return str
    if (balance >= 1000 && balance < 10000) return `${str[0]} ${str.slice(1, str.length)}`
    if (balance >= 10000 && balance < 100000) return `${str.slice(0, 2)} ${str.slice(2, str.length)}`
    if (balance >= 100000 && balance < 1000000) return `${str.slice(0, 3)} ${str.slice(3, str.length)}`
    return str
}