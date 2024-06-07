import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "./reset.scss"

import {RootStoreProvider} from "./core/store/RootStoreProvider.tsx";
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ChakraProvider>
        <RootStoreProvider>
            <App/>
        </RootStoreProvider>
    </ChakraProvider>,
);
