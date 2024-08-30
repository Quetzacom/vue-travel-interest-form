### Development Notes -- Cory Hanson ###
20240829

Node 20 LTS
Vue 3.4x
Configured to use: Vite, Pinia, and Vitest

Using TypeScript.
Adding SCSS pre-processor.


The Plan:

Form 
- name
- phone
- interest: Mountains || Oceans || Deserts
- description
- travel (methods?): Car, Bus, Train

Form States:
Unsubmitted | Submitted


# Components:
- TravelInterestForm
  - **FormInput** - used for text, tel, number input forms
  - **FormTextArea** - textArea
  - **FormSelect** - Custom Dropdown (I should have just done a regular one)
  - **FormCheckBoxes** - checkbox group
  - **FormInfo** - placeholder for unsupported configs

  - **ValidationMessage** - common subcomponent to form element components

  - **Icon Components:** 
    -- IconCircle
    -- IconDeserts
    -- IconMountains
    -- IconOceans
      (Used on FormSelect Dropdown List)


# Services:
- **formConfigService** -- Retrieve formConfig.json

# Store:
- **useFormStore** -- based on formConfig
  - form config data
  - form data
  - validation data
  - isReadyToSubmit state
  - isSubmitted state

# Config File:
**public/formConfig.json**



# vue-travel-interest-form

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

