# sequential-async-foreach

First and foremost, nearly all credit should go to Sebastian Chopin and [his fine article on this topic](https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404).

I just used this function so frequently, that I needed ready access to it.

## Usage

```typescript
import { asyncForEach } from 'sequential-async-foreach';

await asyncForEach([1, 2, 3], async (number) => {
    await doTheAsyncThings(number);
});
```

Each task (1, 2, and 3) will happen in order, and 2 will not start executing until the conclusion of 1.
