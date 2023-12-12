// localStorageMiddleware.js
import { loadUserSuccess } from "../actions/userActions";

const localStorageMiddleware = (storeAPI) => (next) => (action) => {
    const result = next(action);

    // Carregue os dados do localStorage após a ação CART_ADD_ITEM ser processada
    if (action.type === "CART_ADD_ITEM") {
        if (localStorage.getItem("cartItems")) {
            const cartItemsFromLocalStorage = JSON.parse(
                localStorage.getItem("cartItems")
            );
            storeAPI.dispatch({
                type: "CART_ADD_ITEM",
                payload: cartItemsFromLocalStorage,
            });
        }
    }

    return result;
};

export default localStorageMiddleware;