export const formatterServerData = (data) => {
    return data.map(product => [product[0].dish, product[1]])
}
