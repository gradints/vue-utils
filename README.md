# vue-utils <!-- omit in toc -->

Useful utilities for Vue projects.

[![npm (scoped)](https://img.shields.io/npm/v/@gradin/vue-utils)](https://www.npmjs.com/package/@gradin/vue-utils)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@gradin/vue-utils)
![npm](https://img.shields.io/npm/dt/@gradin/vue-utils)

Table of Contents:
<!-- no toc --> 
- [Installation](#installation)
- [Features](#features)
  - [Improved Vue Reactive](#improved-vue-reactive)
  - [Watch Route Query and Params Changes](#watch-route-query-and-params-changes)
- [Development](#development)

## Installation 

```sh
# Using npm
npm install @gradin/vue-utils

# Using Yarn
yarn add @gradin/vue-utils
```

## Features

### Improved Vue Reactive

The `gReactive` function is a wrapper around Vue's `reactive` function that adds some useful features.
- **Reset**: The `reset` method resets the reactive object to its initial state.
- **Set**: The `set` method sets the reactive object to a new value, merging the new value with the existing value.

Example `reactive` vs `gReactive`:

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

### Watch Route Query and Params Changes

The `whenRouteChange` will allow you to do something changes but still on the same page. It is also triggered on the first mount of the component.

`whenRouteChange` accepts two arguments:
- `callback`: The function to be called when the route query or params changes.
- `watchSource`: Optional. A function that returns the value to be watched. If not provided, it will watch the entire route query and route params object.

| When                                                       | Triggered |
| :--------------------------------------------------------- | :-------: |
| Route query changed (e.g /products to /products?page=2)    |    Yes    |
| Route params changed (e.g /products/1 to /products/2)      |    Yes    |
| Script setup loaded (using `watch` with `immediate: true`) |    Yes    |
| Route name changed (e.g /products to /home)                |    No     |
| Also Route name changed (e.g /products to /product/1)      |    No     |

Usage:
```typescript
  import { whenRouteChange } from '@gradin/vue-utils';
  import { useRoute } from 'vue-router';
  import axios from 'axios';

  const route = useRoute();
  const products = ref<Product[]>([]);

  const getData = () => {
    const response = await axios.get('/api/products', {
      params: {
        page: route.query.page,
        search: route.query.search,
        category_id: route.query.category_id,
        sort: route.query.sort,
      }
    })
    products.value = response.data;
  }
  
  whenRouteChange(getData) // will call getData once at the beginning, and again when the route query or params changes.

  // or if you want just to track route query page
  const highlightMatchesSearch = () => { 
    //
  }
  whenRouteChange(
    () => {
      highlightMatchesSearch()
    },
    () => route.query.search
  )
```

## Development

To Deploy:

```sh
npm run build
npm publish
```