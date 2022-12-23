export default function getHiddenAccount(account: string) {
    return `**** ${account.slice(-4)}`
}