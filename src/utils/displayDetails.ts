const displayDetails = (str: string) => {
    return str.length > 20 ? str.slice(0, 20) + '...' : str
}

export default displayDetails