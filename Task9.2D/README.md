# SIT313 Assignment 6.1HD: Devlink Marketplace

Cameron Malone 218344989

## Build and Run:

Development Server:

```bash
# Task9.2D/
pnpm run dev
```

Stripe Payment Intent Server (In another terminal window):

```bash
# Task9.2D/src/server/
node paymentServer.js
```

## References

- Firebase / Firestore Pagination custom hook with react: https://github.com/CSFrequency/react-firebase-hooks/issues/13
- React Firebase Hooks Library: https://github.com/CSFrequency/react-firebase-hooks
- Best practices for storing fetched data: https://stackoverflow.com/questions/64377310/common-ways-to-store-fetched-data-for-a-react-app
- Using Events for passing data up the component tree: https://www.freecodecamp.org/news/pass-data-between-components-in-react/
- Stripe JS Redirect only if necessary: https://github.com/vercel/next.js/discussions/33846
- creating a mock paymentIntent for Stripe: https://stripe.com/docs/api/payment_intents/create?lang=node
- Stripe JS and React Integration: https://www.youtube.com/watch?v=e-whXipfRvg
- Stripe Official Docs on react integration: https://stripe.com/docs/stripe-js/react
- Stripe and Firebase integration (PAID SOLUTION, not used): https://www.youtube.com/watch?v=xi3F2Zv91UE
