import { ObjectId } from "mongodb";
const myObjectId = new ObjectId("625add3d78fb449f9d9fe2ee");

const orders = Array.from({ length: 22 }).map((_, idx) => {
    const  day = 20;
    let hour, subtotal;

    if (idx < 10) {
        hour = "0" + idx;
        subtotal = 100;
    } else if (idx > 16 && idx < 21) {
        hour = idx.toString(); // Convert to string
        subtotal = 100 + 12 * idx;
    } else {
        hour = idx.toString(); // Convert to string
        subtotal = 100;
    }

    return {
        user: myObjectId,
        orderTotal: {
            itemsCount: 3,
            cartSubtotal: subtotal,
        },
        cartItems: [
            {
                name: "Product name",
                price: 34,
                image: { path: "/images/tablets-category.png" },
                quantity: 3,
                count: 12,
            },
        ],
        paymentMethod: "PayPal",
        isPaid: false,
        isDelivered: false,
        createdAt: `2022-03-${day}T${hour}:12:36.490+00:00`,
    };
});


export default  orders;