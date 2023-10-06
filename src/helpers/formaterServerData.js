export const formatterServerData = (data) => {
    if (data) {
        return data.map(product => [product[0].dish, product[1]])
    }
}
