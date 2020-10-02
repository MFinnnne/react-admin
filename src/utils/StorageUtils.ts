
import store from 'store';

const USER_KEY = 'user_key';

export default {
	saveUser(user: any) {
    // localStorage.setItem(USER_KEY, JSON.stringify(user));
    store.set(USER_KEY,user);
	},

	getUser(): any {
    // return JSON.parse(localStorage.getItem(USER_KEY) ?? '{}');
    return store.get(USER_KEY)||{};
	},

	removeUser() {
    // localStorage.removeItem(USER_KEY);
    store.remove(USER_KEY);
	},
};
