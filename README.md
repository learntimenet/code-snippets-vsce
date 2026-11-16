# Code Snippets

Clean, practical code snippets for React, JavaScript, TypeScript, CSS and Java.

Every snippet starts with `lt`. Type `lt` in a supported file to see them all, then press <kbd>Tab</kbd> to jump between placeholders.

## Contents

- [React](#react) (.jsx, .tsx)
- [JavaScript / TypeScript](#javascript--typescript) (.js, .jsx, .ts, .tsx)
- [CSS](#css) (.css, .scss, .less)
- [Java](#java) (.java)

## React

Available in: .jsx, .tsx

### `rfc` - React Function Component

React function component with named export

```jsx
export function MyComponent() {
  return (
    <div>

    </div>
  );
}
```

### `rfcp` - React Function Component with Props

React function component with destructured props

```jsx
export function MyComponent({ children }) {
  return (
    <div>

    </div>
  );
}
```

### `rafc` - React Arrow Component

React arrow function component with named export

```jsx
export const MyComponent = () => {
  return (
    <div>

    </div>
  );
};
```

### `us` - useState

useState hook

```jsx
const [state, setState] = useState(initialValue);
```

### `ue` - useEffect

useEffect hook with cleanup

```jsx
useEffect(() => {


  return () => {

  };
}, []);
```

### `ur` - useRef

useRef hook

```jsx
const ref = useRef(null);
```

### `um` - useMemo

useMemo hook

```jsx
const value = useMemo(() => {
  return ;
}, []);
```

### `ucb` - useCallback

useCallback hook

```jsx
const handler = useCallback(() => {

}, []);
```

### `uc` - useContext

useContext hook

```jsx
const value = useContext(MyContext);
```

### `ured` - useReducer

useReducer hook with reducer function

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'ACTION':
      return { ...state };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, initialState);
```

### `hook` - Custom Hook

Custom React hook

```jsx
export function useCustom() {
  const [value, setValue] = useState();



  return value;
}
```

### `ctx` - Context Provider

React context with provider and hook

```jsx
import { createContext, useContext, useState } from 'react';

const MyContext = createContext(null);

export function MyProvider({ children }) {
  const [value, setValue] = useState();

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
}

export function useMy() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMy must be used inside MyProvider');
  }
  return context;
}
```

### `map` - Map List

Render a list with map and key

```jsx
{items.map((item) => (
  <li key={item.id}></li>
))}
```

### `cond` - Conditional Render

Conditional render with ternary

```jsx
{condition ? <A /> : null}
```

### `fetch` - Fetch in useEffect

Fetch data in useEffect with loading and error state

```jsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const controller = new AbortController();

  fetch('/api/endpoint', { signal: controller.signal })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(setData)
    .catch((err) => {
      if (err.name !== 'AbortError') setError(err);
    })
    .finally(() => setLoading(false));

  return () => controller.abort();
}, []);
```

### `imr` - Import React Hooks

Import React hooks

```jsx
import { useState, useEffect } from 'react';
```

## JavaScript / TypeScript

Available in: .js, .jsx, .ts, .tsx

### `cl` - Console Log

console.log with label

```js
console.log('value:', value);
```

### `af` - Arrow Function

Arrow function

```js
const name = (params) => {

};
```

### `async` - Async Function

Async function with try/catch

```js
async function name(params) {
  try {

  } catch (error) {
    console.error(error);
  }
}
```

### `fj` - Fetch JSON

Fetch and parse JSON with async/await

```js
const response = await fetch('/api/endpoint');
if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}
const data = await response.json();
```

### `tc` - Try Catch

try/catch block

```js
try {

} catch (error) {

}
```

### `do` - Destructure Object

Object destructuring

```js
const {  } = object;
```

### `da` - Destructure Array

Array destructuring

```js
const [] = array;
```

### `im` - Import Named

Named import

```js
import {  } from 'module';
```

### `imd` - Import Default

Default import

```js
import name from 'module';
```

### `forof` - For Of Loop

for...of loop

```js
for (const item of items) {

}
```

### `amap` - Array Map

Array map

```js
const result = array.map((item) => );
```

### `afilter` - Array Filter

Array filter

```js
const result = array.filter((item) => );
```

### `areduce` - Array Reduce

Array reduce

```js
const result = array.reduce((acc, item) => {

  return acc;
}, initial);
```

### `promise` - Promise

New Promise

```js
new Promise((resolve, reject) => {

});
```

### `st` - Set Timeout

setTimeout

```js
setTimeout(() => {

}, 1000);
```

### `debounce` - Debounce

Debounce helper function

```js
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
```

### `class` - Class

ES6 class with constructor

```js
class myModule {
  constructor(params) {

  }
}
```

### `el` - Event Listener

addEventListener

```js
element.addEventListener('click', (event) => {

});
```

### `qs` - Query Selector

document.querySelector

```js
const el = document.querySelector('selector');
```

## CSS

Available in: .css, .scss, .less

### `flexc` - Flex Center

Center content with flexbox

```css
display: flex;
justify-content: center;
align-items: center;
```

### `flex` - Flex Row

Flex row with gap

```css
display: flex;
flex-direction: row;
gap: 1rem;
```

### `grid` - Grid Columns

Grid with equal columns

```css
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 1rem;
```

### `gridauto` - Grid Auto Fit

Responsive grid that wraps automatically

```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
gap: 1rem;
```

### `gridc` - Grid Center

Center content with grid

```css
display: grid;
place-items: center;
```

### `mq` - Media Query

Media query (min-width)

```css
@media (min-width: 768px) {

}
```

### `dark` - Dark Mode

prefers-color-scheme dark media query

```css
@media (prefers-color-scheme: dark) {

}
```

### `vars` - CSS Variables

Custom properties on :root

```css
:root {
  --color-primary: #3b82f6;
}
```

### `reset` - Reset

Modern CSS reset

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

html {
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
}

body {
  min-height: 100vh;
  font-family:
    system-ui,
    -apple-system,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans",
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji";
  line-height: 1.5;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  text-wrap: balance;
}

p {
  text-wrap: pretty;
}

ul[role="list"],
ol[role="list"] {
  list-style: none;
  padding: 0;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### `absc` - Absolute Center

Center with absolute positioning

```css
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
```

### `truncate` - Truncate Text

Single-line text truncation with ellipsis

```css
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
```

### `clamp` - Line Clamp

Multi-line text clamp

```css
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
overflow: hidden;
```

### `trans` - Transition

Transition

```css
transition: all 0.3s ease;
```

### `kf` - Keyframes

Keyframes animation

```css
@keyframes name {
  from {

  }
  to {

  }
}
```

### `sr` - Visually Hidden

Hide visually but keep for screen readers

```css
position: absolute;
width: 1px;
height: 1px;
padding: 0;
margin: -1px;
overflow: hidden;
clip: rect(0, 0, 0, 0);
white-space: nowrap;
border: 0;
```

### `shadow` - Box Shadow

Soft box shadow

```css
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
```

### `font` - Font Stack

System font stack

```css
font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
```

## Java

Available in: .java

### `main` - Main Class

Class with main method

```java
public class Main {

    public static void main(String[] args) {

    }
}
```

### `class` - Class

Public class with constructor

```java
public class Main {

    public Main() {

    }
}
```

### `record` - Record

Java record

```java
public record Main(String name) {}
```

### `interface` - Interface

Public interface

```java
public interface Main {

}
```

### `enum` - Enum

Public enum

```java
public enum Main {
    VALUE_ONE,
    VALUE_TWO
}
```

### `sout` - Print Line

System.out.println

```java
System.out.println();
```

### `method` - Method

Public method

```java
public void methodName() {

}
```

### `getset` - Getter and Setter

Private field with getter and setter

```java
private String name;

public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}
```

### `foreach` - For Each

Enhanced for loop

```java
for (String item : items) {

}
```

### `for` - For Loop

Indexed for loop

```java
for (int i = 0; i < length; i++) {

}
```

### `tc` - Try Catch

try/catch block

```java
try {

} catch (Exception e) {
    e.printStackTrace();
}
```

### `twr` - Try With Resources

try-with-resources block

```java
try (var resource = open()) {

} catch (Exception e) {
    e.printStackTrace();
}
```

### `stream` - Stream Filter Map

Stream filter, map and collect to list

```java
items.stream()
    .filter(item -> true)
    .map(item -> item)
    .toList();
```

### `switch` - Switch Expression

Switch expression

```java
var result = switch (value) {
    case A -> 1;
    default -> 0;
};
```

### `list` - List

New ArrayList

```java
List<String> list = new ArrayList<>();
```

### `map` - Map

New HashMap

```java
Map<String, Integer> map = new HashMap<>();
```

### `rest` - Spring REST Controller

Spring Boot REST controller

```java
@RestController
@RequestMapping("/api")
public class Main {

    @GetMapping
    public String getAll() {
        return ;
    }
}
```

### `test` - JUnit Test

JUnit 5 test method

```java
@Test
void shouldDoSomething() {

}
```

## License

[MIT](LICENSE.md)
