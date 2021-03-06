/**
 * @module parjs
 *
 *
 */ /** */


import {LoudParser} from "./loud";
import {AnyParser} from "./any";

/**
 * @private
 * Should not be used from user code. Used to implement implicit parser literals.
 * @type {symbol}
 */
export const convertibleSymbol = Symbol("ParjsConvertibleLiteral");

/**
 * A literal type which is implicitly convertible to a parser.
 * This normally includes the `string` and `RegExp` types.
 */
export type ConvertibleLiteral<T> = {
    [convertibleSymbol](): LoudParser<T>

}

declare global {
    interface String {
        [convertibleSymbol](): LoudParser<string>
    }

    interface RegExp {
        [convertibleSymbol](): LoudParser<string>;
    }
}

/**
 * A {@link LoudParser} or a literal value convertible to a {@link LoudParser}.
 */
export type ImplicitLoudParser<T> = LoudParser<T> | ConvertibleLiteral<T>;

/**
 * A {@link AnyParser} or a literal value convertible to a {@link AnyParser}
 */
export type ImplicitAnyParser = AnyParser | ConvertibleLiteral<any>;

