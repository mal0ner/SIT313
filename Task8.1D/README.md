# SIT313 Assignment 7.1P: Login and Registration

Cameron Malone 218344989

## References

- ZOD SCHEMA EMAIL VALIDATION AGAINST BACKEND: https://stackoverflow.com/questions/75148276/email-validation-with-zod
- ZOD Password / Confirm Password checking. https://stackoverflow.com/questions/73695535/how-to-check-confirm-password-with-zod
- More ZOD password / form validation: https://articles.wesionary.team/react-hook-form-schema-validation-using-zod-80d406e22cd8
- Managing / Updating user profiles in Firebase: https://stackoverflow.com/questions/50000630/how-to-update-user-profile-in-firebase
- Generating custom embedded profile picture URLs with boring-avatars.js: https://github.com/boringdesigners/boring-avatars-service/blob/main/README.md
- Database Pagination: https://makerkit.dev/blog/tutorials/pagination-react-firebase-firestore
- Text search and pagination with firebase: https://medium.com/@ken11zer01/firebase-firestore-text-search-and-pagination-91a0df8131ef
- Loading Spinner in tailwind: https://www.braydoncoyer.dev/blog/how-to-create-an-animated-loading-spinner-with-tailwind-css
- Events from child to parent React: https://stackoverflow.com/questions/74864178/how-do-i-emit-events-from-a-child-component-to-a-parent-component-in-react
- Defining and using types for typesafety with Firebase and typescript: https://medium.com/swlh/using-firestore-with-typescript-65bd2a602945
- Define type for function callback in object typescript: https://stackoverflow.com/questions/29689966/how-to-define-type-for-a-function-callback-as-any-function-type-not-universal
- TypeScript function types: https://dmitripavlutin.com/typescript-function-type/
- Firestore query by array of object field value: https://stackoverflow.com/questions/54081799/firestore-to-query-by-an-arrays-field-value
- Firestore query on substring of property value: https://stackoverflow.com/questions/46568142/google-firestore-query-on-substring-of-a-property-value-text-search

### Fixes

**Unique Keys for elements when using object.map() in react**:

https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js

When mapping over an array of objects, we need to place the key
property on their containing element.

instead of this:

```jsx
  {arr.map((item) => (
    <p key={item.id}>{item.field1}</p>
    <p key={item.id}>{item.field2}</p>
  ))}
```

do this:

```jsx
{
  arr.map((item) => (
    <div key={item.id}>
      <p>{item.field1}</p>
      <p>{item.field2}</p>
    </div>;
  ));
}
```

**Type 'void' is not assignable to type '((event: MouseEvent<HTMLInputElement>)=>void) | undefined':**
This occurred as html `onClick={}` attributes expect a function, not a function call. We can fix like so:

```jsx
function doSomething(input) {
  return;
}
//wrong
<Button onClick={doSomething(props.input)}>Click me...</Button>

//right
<Button onClick={() => doSomething(props.input)}>Click me...</Button>
```

### Libraries or tools

`date-fns`: Comprehensive and simple toolset for manipulating js dates. source: https://date-fns.org/
