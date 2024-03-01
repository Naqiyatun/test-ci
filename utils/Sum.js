export const Sum = (listAngka) => {
    let sum = 0;
    for (let i = 0; i < listAngka.length; i++ ) {
        sum += parseInt(listAngka[i]);
        // console.log('hrg', listAngka, listAngka[i])
    }
    return sum;
}  