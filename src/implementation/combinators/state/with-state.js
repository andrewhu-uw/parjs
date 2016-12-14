"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var action_1 = require("../../../base/action");
/**
 * Created by User on 21-Nov-16.
 */
var PrsWithState = (function (_super) {
    __extends(PrsWithState, _super);
    function PrsWithState(inner, reducer) {
        var _this = _super.call(this) || this;
        _this.inner = inner;
        _this.reducer = reducer;
        _this.displayName = "withState";
        _this.isLoud = inner.isLoud;
        _this.expecting = inner.expecting;
        return _this;
    }
    PrsWithState.prototype._apply = function (ps) {
        var _a = this, inner = _a.inner, reducer = _a.reducer;
        inner.apply(ps);
        if (!ps.isOk) {
            return;
        }
        ps.state = reducer(ps.state, ps.value);
    };
    return PrsWithState;
}(action_1.ParjsAction));
exports.PrsWithState = PrsWithState;
//# sourceMappingURL=with-state.js.map