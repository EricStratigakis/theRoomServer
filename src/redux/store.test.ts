import store from "./store";

test("store defenitions", () => {
  // mainly for documentation

  // should be used for all stores
  expect(store.dispatch).toBeDefined();
  expect(store.subscribe).toBeDefined();
  expect(store.getState).toBeDefined();
  expect(store.replaceReducer).toBeDefined();

  // for this specific implementation
  expect(store.getState().root).toBeDefined();
});
