# `@buuhv/react-context-api`

Creating a Context API has never been easier than it is now.
You no longer need to use Redux or Create a new structure for each project.
Using react-context-api you can create your structure in seconds.
Thanks to react-context-api you no longer need to declare a huge object for the return of your data from the reducer, react-context-api does it for you.


## Getting started

`npm install @buuhv/react-context-api --save`

## Usage

## Creating interfaces
```typescript
import { UseReducer, ActionProvider } from "@buuhv/react-context-api";

export interface SystemProvider {
    logged: boolean
}
export interface ContextsProps {
    system: SystemProvider
}
export interface Store extends UseReducer {
    store: ContextsProps
}
```

---

## Creating Providers
```typescript
import ContextAPI, { ActionProvider } from "@buuhv/react-context-api";
import { SystemProvider } from "../interfaces";

const initial = {
    logged: false
}

const systemProvider = (state = initial, action?: ActionProvider ): SystemProvider => {
    return ContextAPI.providerResult(state, action);
}

export default systemProvider;
```

---

## Creating Context API
```typescript
import ContextAPI, { combineReducers } from "@buuhv/react-context-api";
import systemProvider from "./providers/system";
import userProvider from "./providers/user";
import { Store } from "./interfaces";

const reducers = combineReducers({
    system: systemProvider,
    user: userProvider
});
export const contextApi = new ContextAPI(reducers);

/**
 * How to create a useContext
 */
const useContextAPI = (): Store => contextApi.useContext();
/**
 * How to create Provider or Consumer
 */
const Provider = contextApi.Provider;
const Consumer = contextApi.Consumer;

export {
    Provider,
    Consumer,
    useContextAPI
};

```

---

## Using
```typescript
import React, { useContext, useEffect, useMemo } from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import { contextApi, useContextAPI } from './reducers';//check your import path

function HomeScreen(props: RouteComponentProps): JSX.Element {
    const { store, dispatch } = useContextAPI();
    const handleTest = () => {
        dispatch({
            type: 'name',
            data: 'BuuhV',
            reducer: 'user'
        });
      }
    return(
        <div className='h-100 pt-5'>
            {store.user.name}
            <button className='btn btn-primary mt-5' onClick={handleTest}>Test</button>
        </div>
    );
}

export default withRouter(HomeScreen);
```

---

## Contributors

This module was extracted from `ReactJs` core. Please reffer to https://github.com/geeknection/react-context-api/contributors for the complete list of contributors.

## License
The library is released under the MIT licence. For more information see `LICENSE`.