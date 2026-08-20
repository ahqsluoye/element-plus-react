---
title: Steps
lang: en-US
---

<Meta></Meta>

# Steps

A step-by-step navigation bar that guides users to complete tasks according to the process. The steps can be set according to the actual application scenario, and the number of steps cannot be less than 2.

## Basic Usage

Simple steps bar.

Set the `active` attribute with a `Number` to indicate the index of the step, starting from 0. When a fixed-width steps bar is needed, set the `space` attribute, which accepts `Number` in `px`. If not set, it will be auto-sized. Setting the `finishStatus` attribute can change the state of completed steps.

<code src="./basic.tsx"></code>

## Step Bar with Status

Each step shows its status.

<code src="./with-status.tsx"></code>

## Centered Steps Bar

Title and description can be centered.

<code src="./centered.tsx"></code>

## Step Bar with Description

Each step has a description.

<code src="./with-description.tsx"></code>

## Step Bar with Icon

Various custom icons can be used in the steps bar.

Set the icon through the `icon` attribute. For icon types, refer to the Icon component documentation.

<code src="./with-icon.tsx"></code>

## Vertical Steps Bar

Vertical steps bar.

Simply set the `direction` attribute to `vertical` in the `ElSteps` element.

<code src="./vertical.tsx"></code>

## Simple Steps Bar

Set `simple` to apply the simple style. Under this condition, `alignCenter` / `description` / `direction` / `space` will all be ignored.

<code src="./simple.tsx"></code>

## Steps API

### Steps Properties

| Name          | Description                                                                           | Type                                                                             | Default    |
| ------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------- |
| space         | Spacing of each step. Auto-sized if not set. Supports percentage.                     | `number` / `string`                                                              | ''         |
| direction     | Display direction                                                                     | <Enum type="enum">'vertical' \| 'horizontal'</Enum>                              | horizontal |
| active        | Set the current active step                                                           | `number`                                                                         | 0          |
| processStatus | Set the status of the current step                                                    | <Enum type="enum">'wait' \| 'process' \| 'finish' \| 'error' \| 'success'</Enum> | process    |
| finishStatus  | Set the status of the completed steps                                                 | <Enum type="enum">'wait' \| 'process' \| 'finish' \| 'error' \| 'success'</Enum> | finish     |
| alignCenter   | Center align                                                                          | `boolean`                                                                        | —          |
| simple        | Whether to apply simple style                                                         | `boolean`                                                                        | —          |

## Step API

### Step Properties

| Name        | Description                                                                                                  | Type                                                                                   | Default |
| ----------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | ------- |
| title       | Title                                                                                                        | `string` / `Component`                                                                 | ''      |
| description | Description text                                                                                             | `string` / `Component`                                                                 | ''      |
| icon        | Custom icon for the Step component. Also supports slot approach                                              | `string`                                                                               | —       |
| status      | Set the current step's status. If not set, the status will be determined by Steps                           | <Enum type="enum">'' \| 'wait' \| 'process' \| 'finish' \| 'error' \| 'success'</Enum> | ''      |