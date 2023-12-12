import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layouts/MetaData';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Payment = ({ history }) => {
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });

  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar o número do cartão
    if (cardInfo.cardNumber.length !== 16) {
      return toast.error('Número do cartão deve ter 16 dígitos');
    }

    // Validar a data de vencimento (formato MM/AA)
    const [month, year] = cardInfo.expiryDate.split('/');
    const today = new Date();
    const cardExpDate = new Date(`20${year}`, month - 1); // Criar data com o mês ajustado (Janeiro é 0)

    if (cardExpDate < today) {
      return toast.error('Data de vencimento do cartão é inválida');
    }

    // Validar o CVC
    if (cardInfo.cvc.length !== 3) {
      return toast.error('CVC do cartão deve ter 3 dígitos');
    }


   try {
  // Calcular o total do pedido
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axios.post('/api/v1/order/new', {
    orderItems: cartItems,
    shippingInfo,
    paymentInfo: {
      cardNumber: cardInfo.cardNumber,
      expiryDate: cardInfo.expiryDate,
      cvc: cardInfo.cvc,
    },
    totalPrice, // Adicionando o totalPrice ao payload
  }, config);

  toast.success('Pagamento aprovado');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingInfo');
  history.push('/');
  window.location.reload();

  // Limpar informações de pagamento do estado local
  setCardInfo({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });
} catch (error) {
  toast.error('Erro ao processar o pagamento');
}

};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardInfo({ ...cardInfo, [name]: value });
  };

  return (
    <Fragment>
      <MetaData title={'Pagamento'} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Numero do Cartão</label>
              <input
                type="text"
                id="card_num_field"
                className="form-control"
                name="cardNumber"
                value={cardInfo.cardNumber}
                onChange={handleChange}
                maxLength="16"
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Data de vencimento do Cartão (MM/AA)</label>
              <input
                type="text"
                id="card_exp_field"
                className="form-control"
                name="expiryDate"
                value={cardInfo.expiryDate}
                onChange={handleChange}
                maxLength="5"
                placeholder="MM/AA"
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">CVC do Cartão</label>
              <input
                type="text"
                id="card_cvc_field"
                className="form-control"
                name="cvc"
                value={cardInfo.cvc}
                onChange={handleChange}
                maxLength="3"
              />
            </div>

            <button type="submit" className="btn btn-block py-3">
              Pagar
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
