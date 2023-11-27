home.commands.renderProductAtCart = (obj) => {
    return `
    <tr class="card-body">
        <td class="col-8 d-flex">
            <img src="../img${obj.img}" alt="">
            <h4>${obj.productName}</h4>
        </td>
        <td class="col-1">
            ${obj.price}
        </td>
        <td class="col-1">
            ${obj.quantity}
        </td>
        <td class="col-1">
            ${obj.price * obj.quantity}
        </td>
        <td class="col-1">
            <button class="btn btn-danger" data-id="${obj.id}"
               onclick="return confirm('Do you want to remove' + ${obj.productName} + '?')"><i
                    class="fa-solid fa-xmark"></i></button>
        </td>
    </tr>
    `
}
