<p align="center">
  <img src="/src/images/avatar.webp" width="130" alt="Vincent's Next App logo" />
</p>

<h1 align="center">
  Vincent's Next App
</h1>

<h3 align="center">
  My personal website, a fully typesafe Progressive Web App
</h3>

<h3 align="center">
  Built with Next.js, Typescript, TailwindCSS, Prisma, and tRPC
</h3>

<h1 align="center">
  Still a Work-in-Progress (WIP)
</h1>

<div align="center">

[![CI](https://github.com/lvince95/my-next-app/actions/workflows/ci.yml/badge.svg)](https://github.com/lvince95/my-next-app/actions/workflows/ci.yml)

</div>

# [Live Demo](https://vincent-next.vercel.app)

#### Disclaimer:

This is just my attempt at exploring the best ways to build a fullstack web application using some of the best tools in the ecosystem with best practices in mind.

## Table of Contents:

- <a href="#about">Application Overview</a>
- <a href="#features">Features</a>
- <a href="#project-structure">Project Structure</a>
- <a href="#naming-convention">Naming Convention</a>
- <a href="#testing">Testing</a>

<h2 id="about">Application Overview</h2>

This is a fullstack application that consists of:

- [Next.js](https://nextjs.org)
- [TailwindCSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [Prisma](https://www.prisma.io)
- [tRPC](https://trpc.io)

<h2 id="features">Features</h2>

- ⚡ Full-stack React with Next.js
- ⚡ Database ingeration with Prisma
- ⚡ [Progressive Web App](https://web.dev/pwa-checklist/) with good Lighthouse scores
- 🧙‍♂️ E2E typesafety and advanced network response caching with tRPC
- 🧙‍♂️ Effortless local state management with [Zustand](https://github.com/pmndrs/zustand)
- 🧙‍♂️ Improved form experience with [React Hook Form](https://react-hook-form.com) with [Zod](https://zod.dev) as the schema validation library
- 🧙‍♂️ Fluid animations with [Framer Motion](https://www.framer.com/motion)
- 🧙‍♂️ Styled with TailwindCSS and [HeadlessUI](https://headlessui.com)
- 🎨 Clean code with ESLint + Prettier configured
- 🎨 Scalable and maintainable folder structure
- 💚 Pre-commit hooks with [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged) to catch errors before you commit
- 💚 CI setup using [GitHub Actions](https://github.com/features/actions):
  - ✅ Linting
  - ✅ Unit and Integration testing with [Jest](https://jestjs.io) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
  - ✅ Integration and E2E testing with [Cypress](https://www.cypress.io)

<h2 id="project-structure">Project Structure</h2>

Most of the code lives in the `src` folder and looks like this:

```sh
src
|
+-- components        # shared components used across the entire application
|
+-- features          # feature based modules
|
+-- hooks             # shared hooks used across the entire application
|
+-- lib               # re-exporting different libraries preconfigured for the application (if any)
|
+-- pages             # next.js pages configuration
|
+-- stores            # global state stores
|
+-- types             # base types used across the application
|
+-- utils             # shared utility functions
```

The main benefit of this folder structure is the use of the `features` folder. Grouping modules as features allows the application to be scaled in a more readable and maintainable way. For example, any code related to authentication will be stored in the `features/authentication` directory. This ensures that any code having any functionality related to authentication is kept inside its own features folder, separating it from other features. Any time a new feature is added, its own folder within the `features` folder will be created. Maintaining an application with this structure will be easier compared to applications that have a flat folder structure, with files that are unrelated to each other living in the same directory.

As for specific features, each feature could have the following structure:

```sh
src/features/example-feature
|
+-- components  # components scoped to a specific feature
|
+-- hooks       # hooks scoped to a specific feature
|
+-- stores      # state stores for a specific feature
|
+-- types       # typescript types for TS specific feature domain
|
+-- utils       # utility functions for a specific feature
|
+-- index.ts    # entry point for the feature, it should serve as the public API of the given feature
```

Everything from a feature should be exported from the `index.ts` file, which behaves as a public API of the feature.

Importing things from other features should be done in the following way:

`import {ExampleComponent} from "@/features/example-feature"`

and not

`import {ExampleComponent} from "@/features/example-feature/components/ExampleComponent`

This was inspired by how [NX](https://nx.dev/) handles libraries that are isolated but available to be used by the other modules. Think of a feature as a library or a module that is self-contained but can expose different parts to other features via its entry point.

<h2 id="naming-convention">Naming Convention</h2>

Variables will be named using `camelCase`

```sh
# Variable
const pageCount = 5

# File
index.ts
useCustomHook.ts
```

Component names will be named using `PascalCase`. This also includes component files.

```sh
# Functional Component Declaration
const ExampleComponent = () => { return <></> }

# Component file
ExampleComponent.tsx
Button.tsx
```

For a good reference, please check out the [Naming Cheatsheet](https://github.com/kettanaito/naming-cheatsheet)

<h2 id="testing">Testing</h2>

For this application, the testing tools used are:

- Jest and React Testing Library for unit and integration tests
- Cypress for integration and e2e tests

As more features get added in the future, [Mock Service Worker](https://mswjs.io) will be added to mock api responses so that the frontend testing is decoupled from the backend.

Example of Cypress e2e testing:

https://user-images.githubusercontent.com/25463595/217047832-3a900fce-d2ad-4c84-b76f-11fc55d0a11b.mp4
