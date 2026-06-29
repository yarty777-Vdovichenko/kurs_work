import ReactDOM from 'react-dom/client';
import App from './app/App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { SnackbarProvider } from './contexts/SnackbarProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <SnackbarProvider>
      <App/>
    </SnackbarProvider>
  </Provider>
);
