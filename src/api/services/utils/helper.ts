export const getCodeRandom = (length: number = 12): string => {
    const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charactersLength = characters.length
    const result = [];

    for (let i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }

    return result.join('');
}

