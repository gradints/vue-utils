# vue-utils

Useful utilities for Vue projects.

[![npm (scoped)](https://img.shields.io/npm/v/@gradin/vue-utils)](https://www.npmjs.com/package/@gradin/vue-utils)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@gradin/vue-utils)
![npm](https://img.shields.io/npm/dt/@gradin/vue-utils)

## Installation

```sh
# Using npm
npm install @gradin/vue-utils

# Using Yarn
yarn add @gradin/vue-utils
```

## Featurs

### Improved Vue Reactive

The `gReactive` function is a wrapper around Vue's `reactive` function that adds some useful features.
- **Reset**: The `reset` method resets the reactive object to its initial state.
- **Set**: The `set` method sets the reactive object to a new value, merging the new value with the existing value.

Example `reactive` vs `gReactive`

<details>
<summary>Show Codes</summary>

```typescript
  // before
  import { reactive } from 'vue';
  const form = reactive({
    name: '',
    sku: '',
    description: '',
    price: 0,
    category_id: <number|null> null,
  })

  const resetForm = () => {
    form.name = '';
    form.sku = '';
    form.description = '';
    form.price = 0;
    form.category_id = null;
  }

  const setFormForUpdate = (product: Product) => {
    form.name = product.name;
    form.sku = product.sku;
    form.description = product.description;
    form.price = product.price;
    form.category_id = product.category_id;
  }

  const submitForm = () => {
    axios.post('/api/products', form)
      .then(response => {
        // handle success
      })
  }

  // after
  import { gReactive } from '@gradin/vue-utils';
  const form = gReactive({ // almost the same as vue reactive
    name: '',
    sku: '',
    description: '',
    price: 0,
    category_id: <number|null> null,
  })
  form.reset(); // reset the form
  form.set(product); // set the form for update

  const submitForm = () => { // exactly the same as before
    axios.post('/api/products', form)
      .then(response => {
        // handle success
      })
  }
```
</details>