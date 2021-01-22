import store from '../store';

test(`store test`, () => {
    expect(store.getState).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.replaceReducer).toBeDefined();
    expect(store.dispatch).toBeDefined();
});
