/**
 * Created by lifeg on 09/12/2016.
 */
import {expectFailure, expectSuccess} from "../../helpers/custom-matchers";
import {Parjs} from "../../../lib";
import {ReplyKind} from "../../../lib/reply";
import {Es6} from "../../../lib/common/common";


let uState = {};

describe("basic string parsers", () => {

    describe("Parjs.anyChar", () => {
        let parser = Parjs.anyChar;
        let successInput = "a";
        let failInput = "";
        let tooLongInput = "ab";
        it("succeeds on single char", () => {
            expectSuccess(parser.parse(successInput, uState), successInput);
        });
        it("fails on empty input", () => {
            expectFailure(parser.parse(failInput, uState), ReplyKind.SoftFail);
        });
        it("fails on too long input", () => {
            expectFailure(parser.parse(tooLongInput, uState), ReplyKind.SoftFail);
        });
    });

    describe("Parjs.spaces1", () => {
        let parser = Parjs.spaces1;
        it("fails on empty input", () => {
            expectFailure(parser.parse(""), "Soft");
        });
        it("fails on other char", () => {
            expectFailure(parser.parse("a"), "Soft");
        });
        it("succeeds on single space", () => {
            expectSuccess(parser.parse(" "), " ");
        });
        it("succeeds on multiple spaces", () => {
            expectSuccess(parser.parse(Es6.strRepeat(" ", 5)), Es6.strRepeat(" ", 5));
        })
    });

    describe("Parjs.upper", () => {
        let parser = Parjs.upper;
        it("fails on empty input", () => {
            expectFailure(parser.parse(""), "Soft");
        });
        it("fails on other char", () => {
            expectFailure(parser.parse(","), "Soft");
        });
        it("succeeds on char", () => {
            expectSuccess(parser.parse("A"), "A");
        });
    });

    describe("Parjs.upper", () => {
        let parser = Parjs.lower;
        it("fails on empty input", () => {
            expectFailure(parser.parse(""), "Soft");
        });
        it("fails on other char", () => {
            expectFailure(parser.parse(","), "Soft");
        });
        it("succeeds on char", () => {
            expectSuccess(parser.parse("a"), "a");
        });
    });

    describe("Parjs.letter", () => {
        let parser = Parjs.lower;
        it("fails on empty input", () => {
            expectFailure(parser.parse(""), "Soft");
        });
        it("fails on other char", () => {
            expectFailure(parser.parse(","), "Soft");
        });
        it("succeeds on char", () => {
            expectSuccess(parser.parse("a"), "a");
        });
    });

    describe("Parjs.anyCharOf[abcd]", () => {
        let parser = Parjs.anyCharOf("abcd");
        let success = "c";
        let fail = "1";
        it("succeeds on single char from success", () => {
            expectSuccess(parser.parse(success), success);
        });
        it("fails on invalid single char", () => {
            expectFailure(parser.parse(fail), ReplyKind.SoftFail);
        });
        it("fails on too long input", () => {
            expectFailure(parser.parse("ab"), ReplyKind.SoftFail);
        });
        it("fails on empty input", () => {
            expectFailure(parser.parse(""), "Soft");
        })
    });

    describe("Parjs.noCharOf[abcd]", () => {
        let parser = Parjs.noCharOf("abcd");
        let success = "1";
        let fail = "a";
        it("success on single char not from list", () => {
            expectSuccess(parser.parse(success), success);
        });
        it("fails on single char from list", () => {
            expectFailure(parser.parse(fail), ReplyKind.SoftFail);
        });
        it("fails on too long input", () => {
            expectFailure(parser.parse("12"), ReplyKind.SoftFail);
        });
    });


    describe("Parjs.string(hi)", () => {
        let parser = Parjs.string("hi");
        let success = "hi";
        let fail = "bo";
        it("success", () => {
            expectSuccess(parser.parse(success), success);
        });
        it("fail", () => {
            expectFailure(parser.parse(fail), ReplyKind.SoftFail)
        });
        it("fail too long", () => {
            expectFailure(parser.parse(`${success}1`), ReplyKind.SoftFail);
        });
    });

    describe("Parjs.anyStringOf(hi, hello)", () => {
        let parser = Parjs.anyStringOf("hi", "hello");
        let success1 = "hello";
        let success2 = "hi";
        let fail = "bo";
        it("success1", () => {
            expectSuccess(parser.parse(success1), success1);
        });
        it("success2", () => {
            expectSuccess(parser.parse(success2), success2);
        });
        it("fail", () => {
            expectFailure(parser.parse(fail), ReplyKind.SoftFail)
        });
        it("fail too long", () => {
            expectFailure(parser.parse(`${success2}1`), ReplyKind.SoftFail);
        });
    });

    describe("Parjs.newline", () => {
        let parser = Parjs.newline;
        let unix = "\n";
        let winNewline = "\r\n";
        let macNewline = "\r";
        let badInput = "a";
        let empty = "";
        let tooLong1 = "\r\n1";
        let tooLong2 = "\n\r";
        let allNewlines = "\r\r\n\n\u0085\u2028\u2029";

        it("success unix newline", () => {
            expectSuccess(parser.parse(unix), unix)
        });
        it("success windows newline", () => {
            expectSuccess(parser.parse(winNewline), winNewline);
        });
        it("success on mac newline", () => {
            expectSuccess(parser.parse(macNewline), macNewline);
        });

        it("success on all newline string, incl unicode newline", () => {
            let unicodeNewline = Parjs.uniNewline.many();
            let result = unicodeNewline.parse(allNewlines);
            expect(result.kind).toBe(ReplyKind.Ok);
            if (result.kind !== ReplyKind.Ok) return;
            expect(result.value.length).toBe(allNewlines.length - 1);
        });

        it("fails on empty", () => {
            expectFailure(parser.parse(empty));
        });
        it("fails on bad", () => {
            expectFailure(parser.parse(badInput));
        });
        it("fails on too long 1", () => {
            expectFailure(parser.parse(tooLong1));
        });
        it("fails on too long 2", () => {
            expectFailure(parser.parse(tooLong2));
        });
    });

    describe("Parjs.rest", () => {
        let parser = Parjs.rest;
        let nonEmpty = "abcd";
        let empty = "";
        it("success on non-empty let input", () => {
            expectSuccess(parser.parse(nonEmpty));
        });
        it("success on empty input", () => {
            expectSuccess(parser.parse(empty));
        })
    });

    describe("Parjs.stringLen(3)", () => {
        let parser = Parjs.stringLen(3);
        let shortInput = "a";
        let goodInput = "abc";
        let longInput = "abcd";
        it("fails on too short input", () => {
            expectFailure(parser.parse(shortInput));
        });
        it("succeeds on good input", () => {
            expectSuccess(parser.parse(goodInput), goodInput);
        });
        it("fails on long input", () => {
            expectFailure(parser.parse(longInput));
        });
    });

    describe("Parjs.regexp", () => {
        describe("simple regexp", () => {
            let parser = Parjs.regexp(/abc/);
            it("succeeds on input", () => {
                expectSuccess(parser.parse("abc"), ["abc"]);
            });
            it("succeds using implicit", () => {
                expectSuccess(Parjs.string("abc").then(/abc/).parse("abcabc"), ["abc", ["abc"]]);
            });
            it("fails on bad input", () => {
                expectFailure(parser.parse("ab"), "Soft");
            });
            it("match starts in the proper location", () => {
                let p = Parjs.string("abc");
                expectSuccess(p.then(parser).parse("abcabc"), ["abc", ["abc"]]);
            });
            it("match ends in the proper location", () => {
                let p1 = Parjs.string("abc");
                let p2 = Parjs.regexp(/.{3}/);
                let p3 = Parjs.string("eeee");
                let r = p1.then([p2, p3]);
                expectSuccess(r.parse("abcabceeee"), ["abc", ["abc"], "eeee"]);
            });
        });

        describe("multi-match regexp", () => {
            let parser = Parjs.regexp(/(ab)(c)/);
            it("succeeds on input", () => {
                expectSuccess(parser.parse("abc"), ["abc", "ab", "c"]);
            });
            let parser2 = parser.then("de");
            it("chains correctly", () => {
                expectSuccess(parser2.parse("abcde"));
            });
        });
    })
});