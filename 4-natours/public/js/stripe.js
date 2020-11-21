import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51HpJoRLyrkAPfDunr9LyZkDwjxJB1Tjspl4f2WeqVfUU5gV7w1gDU6XvFSIqFsRLqwPLl5qC7uqSkGhtkdd6g6TE000iOhvHOk'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from endpoint
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    console.log(session);

    // 2) Create checkout form + process + charge credid card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.error(err);
    showAlert('error', err);
  }
};
