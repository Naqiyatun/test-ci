export const DateFormater = (string) => {
    const date = new Date(string)
    const dateFormatter = new Intl.DateTimeFormat('id', { day: 'numeric',  month: 'long', weekday: "long", year: "numeric" });

    if (date != 'Invalid Date') {
        return dateFormatter.format(date)
    } else {
        return string
    }
}

export const ShortDateFormater = (string) => {
    const date = new Date(string)
    const dateFormatter = new Intl.DateTimeFormat('id');

    return dateFormatter.format(date)
}

export const DateFormaterWithoutDay = (string) => {
    const date = new Date(string)
    const dateFormatter = new Intl.DateTimeFormat('id', { day: 'numeric', month: 'long', year: "numeric" });

    return dateFormatter.format(date)
}

export const DateTimeFormater = (string) => {
    const date = new Date(string)
    const dateFormatter = new Intl.DateTimeFormat('id', { day: 'numeric', month: 'long', year: "numeric", hour: '2-digit', minute: '2-digit' });

    return dateFormatter.format(date)
}

export const GetMonth = (string) => {
    const date = new Date(string)
    const dateFormatter = new Intl.DateTimeFormat('id', { month: 'numeric' });

    return dateFormatter.format(date)
}

export const GetYear = (string) => {
    const date = new Date(string)
    const dateFormatter = new Intl.DateTimeFormat('id', { year: 'numeric' });

    return dateFormatter.format(date)
}