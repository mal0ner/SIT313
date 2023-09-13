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

### Fixes

**Unique Keys for elements when using object.map() in react**:

https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js

When mapping over an array of objects, we need to place the key
property on their containing element.

instead of this:

```jsx
  {arr.map((item) => {
    <p key={item.id}>{item.field1}</p>
    <p key={item.id}>{item.field2}</p>
  })}
```

do this:

```jsx
{
  arr.map((item) => {
    <div key={item.id}>
      <p>{item.field1}</p>
      <p>{item.field2}</p>
    </div>;
  });
}
```

### Libraries or tools

**Date-fns**: Comprehensive and simple toolset for manipulating js dates. source: https://date-fns.org/
