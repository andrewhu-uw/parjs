/**
 * @module parjs/internal/implementation/parsers
 */
/** */
import {ParjsAction} from "../../action";
import {ParsingState} from "../../state";
import {ReplyKind} from "../../../../reply";

/**
 * Created by User on 27-Nov-16.
 */

export class PrsPosition extends ParjsAction {

    isLoud = true;
    expecting = "anything";

    _apply(ps: ParsingState) {
        ps.value = ps.position;
        ps.kind = ReplyKind.Ok;
    }
}