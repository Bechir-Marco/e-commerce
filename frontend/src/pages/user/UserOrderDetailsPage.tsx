import UserOrderDetailsPageComponent from './components/UserOrderDetailsPageComponent';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { loadScript } from '@paypal/paypal-js';


const getOrder = async (orderId:number) => {
  const { data } = await axios.get('/api/orders/user/' + orderId);
  return data;
};

const loadPayPalScript = (
  cartSubtotal: any,
  cartItems: any[],
  orderId: any,
  updateStateAfterOrder: (arg:any)=>void
) : void => {
  loadScript({
    'client-id':
      'AVkIoZU_GzbqBJ8xIPU4AZ9FJobym2tw2k9SS-3sBvCgGluwY9LMYpebKrUT1wmJgMcWlS6q-Broo2q5',
  })
    .then((paypal: any) => {
      paypal
        .Buttons(
          buttons(cartSubtotal, cartItems, orderId, updateStateAfterOrder)
        )
        .render('#paypal-container-element');
    })
    .catch((err) => {
      console.error('failed to load the PayPal JS SDK script', err);
    });
};

const buttons = (cartSubtotal: number, cartItems: any[], orderId: number, updateStateAfterOrder: (arg0: any) => any) => {
  return {
    createOrder: function (data:any, actions:any) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: cartSubtotal,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: cartSubtotal,
                },
              },
            },
            items: cartItems.map((product) => {
              return {
                name: product.name,
                unit_amount: {
                  currency_code: 'USD',
                  value: product.price,
                },
                quantity: product.quantity,
              };
            }),
          },
        ],
      });
    },
    onCancel: onCancelHandler,
    onApprove: function (data:any, actions:any) {
      return actions.order.capture().then(function (orderData:any) {
        var transaction = orderData.purchase_units[0].payments.captures[0];
        if (
          transaction.status === 'COMPLETED' &&
          Number(transaction.amount.value) === Number(cartSubtotal)
        ) {
          updateOrder(orderId)
            .then((data) => {
              if (data.isPaid) {
                updateStateAfterOrder(data.paidAt);
              }
            })
            .catch((er) => console.log(er));
        }
      });
    },
    onError: onErrorHandler,
  };
};

const onCancelHandler = function () {
  console.log('cancel');
};

const onErrorHandler = function (err:any) {
  console.log('error');
};

const updateOrder = async (orderId:number) => {
  const { data } = await axios.put('/api/orders/paid/' + orderId);
  return data;
};

const UserOrderDetailsPage = () => {
  const userInfo = useSelector((state:any) => state.userRegisterLogin.userInfo);

  const getUser = async () => {
    const { data } = await axios.get('/api/users/profile/' + userInfo._id);
    return data;
  };

  return (
    <UserOrderDetailsPageComponent
      userInfo={userInfo}
      getUser={getUser}
      getOrder={getOrder}
      loadPayPalScript={loadPayPalScript}
    />
  );
};

export default UserOrderDetailsPage;
