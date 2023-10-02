# SIT313 Assignment 10.1P: Devlink Marketplace

Cameron Malone 218344989

## References

- Custom Typing for React forms typescript: https://claritydev.net/blog/typescript-typing-form-events-in-react

## Fixes

**Post Request Not receiving Body Field:**
_Source_: https://stackoverflow.com/questions/39842013/fetch-post-with-body-data-not-working-params-empty

I was receiving an undefined object in the body of POST reqs made to the `/sign-up`
endpoint despite the values being defined client-side. Solution was to properly define
the `body-parser` middleware with:

```js
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json());
```
