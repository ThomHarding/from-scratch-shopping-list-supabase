export function renderItem(item) {
    let itemDiv = document.createElement('div');
    let quantityPara = document.createElement('p');
    let namePara = document.createElement('p');
    if (item.is_bought === true) {
        itemDiv.classList.add('complete');
    } else {
        itemDiv.classList.add('incomplete');
    }
    itemDiv.classList.add('item');
    quantityPara.textContent = item.amount;
    namePara.textContent = item.item_name;
    itemDiv.append(quantityPara, namePara);
    return itemDiv;
}