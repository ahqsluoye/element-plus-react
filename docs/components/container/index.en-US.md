---
title: Container
lang: en-US
---

<Meta></Meta>

# Container

Container components for scaffolding the basic structure of the page:

`<ElContainer>`: Wrapper container. When nested with `<ElHeader>` or `<ElFooter>`, all child elements will be arranged vertically. Otherwise, they are arranged horizontally.

`<ElHeader>`: Container for headers.

`<ElAside>`: Container for side sections.

`<ElMain>`: Container for main sections.

`<ElFooter>`: Container for footers.

:::info{title=TIP}

These components use flex for layout, so please make sure your browser supports it. Besides, the direct child elements of `<ElContainer>` must be one or more of the other four components. The parent element of the other four components must be an `<ElContainer>`.

:::

## Common Layouts

<style lang="scss">
@use '../../examples/container/common-layout.scss';
</style>

<code src="./layout-hm.tsx"></code>

<br>

<code src="./layout-hmf.tsx"></code>

<br>

<code src="./layout-am.tsx"></code>

<br>

<code src="./layout-ham.tsx"></code>

<br>

<code src="./layout-hamf.tsx"></code>

<br>

<code src="./layout-ahm.tsx"></code>

<br>

<code src="./layout-ahmf.tsx"></code>

## Example

<code src="./example.tsx"></code>

## Container API

### Container Properties

| Name      | Description                         | Type                                                | Default                                                                    |
| --------- | ----------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------- |
| direction | Layout direction for child elements | <Enum type="enum">'horizontal' \| 'vertical'</Enum> | vertical when nested with `ElHeader` or `ElFooter`; horizontal otherwise   |

## Header API

### Header Properties

| Name   | Description          | Type               | Default |
| ------ | -------------------- | ------------------ | ------- |
| height | Height of the header | `string` / `number` | 60px    |

## Aside API

### Aside Properties

| Name  | Description               | Type               | Default |
| ----- | ------------------------- | ------------------ | ------- |
| width | Width of the side section | `string` / `number` | 300px   |

## Footer API

### Footer Properties

| Name   | Description          | Type               | Default |
| ------ | -------------------- | ------------------ | ------- |
| height | Height of the footer | `string` / `number` | 60px    |