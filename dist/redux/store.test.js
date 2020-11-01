"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __importDefault(require("./store"));
test("store defenitions", () => {
    // mainly for documentation
    // should be used for all stores
    expect(store_1.default.dispatch).toBeDefined();
    expect(store_1.default.subscribe).toBeDefined();
    expect(store_1.default.getState).toBeDefined();
    expect(store_1.default.replaceReducer).toBeDefined();
    // for this specific implementation
    expect(store_1.default.getState().root).toBeDefined();
});
//# sourceMappingURL=store.test.js.map