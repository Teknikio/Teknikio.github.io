/// <reference path="../node_modules/pxt-core/built/pxtcompiler.d.ts"/>
var ts;
(function (ts) {
    var pxtc;
    (function (pxtc) {
        var extension;
        (function (extension) {
            pxtc.compilerHooks.postBinary = function (program, opts, res) {
                if (!opts.target.isNative)
                    return;
                var mbdal = res.outfiles["mbdal-binary.hex"];
                var mbcodal = res.outfiles["mbcodal-binary.hex"];
                if (!mbdal || !mbcodal)
                    return;
                var outp = "";
                wrapHex(mbdal, 0x00, [0x99, 0x01, 0xc0, 0xde]);
                wrapHex(mbcodal, 0x0D, [0x99, 0x03, 0xc0, 0xde], true);
                outp += ":00000001FF\n";
                res.outfiles["binary.hex"] = outp;
                function hex2str(bytes) {
                    return ts.pxtc.hexfile.hexBytes([bytes.length - 3].concat(bytes)) + "\n";
                }
                function paddingString(len) {
                    var r = "";
                    var len0 = len;
                    while (len >= 44) {
                        r += hex2str([0x00, 0x00, 0x0C,
                            0x42, 0x42, 0x42, 0x42,
                            0x42, 0x42, 0x42, 0x42,
                            0x42, 0x42, 0x42, 0x42,
                            0x42, 0x42, 0x42, 0x42]);
                        len -= 44;
                    }
                    if (len >= 12) {
                        var numBytes_1 = (len - 11) >> 1;
                        var bytes = [0x00, 0x00, 0x0C];
                        for (var i = 0; i < numBytes_1; ++i)
                            bytes.push(0x42);
                        var add = hex2str(bytes);
                        r += add;
                        len -= add.length;
                    }
                    while (len--)
                        r += "\n";
                    pxtc.U.assert(r.length == len0);
                    return r;
                }
                function addBlock(blk) {
                    if (blk.length > 512) {
                        console.log("TOO big!", blk);
                        pxtc.U.oops("block too big");
                    }
                    outp += blk + paddingString(512 - blk.length);
                }
                function wrapHex(inpHex, dataType, deviceType, keepSrc) {
                    if (keepSrc === void 0) { keepSrc = false; }
                    var blk = "";
                    var upperAddr = 0;
                    var prevAddr = 0;
                    var currAddr = 0;
                    for (var _i = 0, _a = inpHex.split(/\r?\n/); _i < _a.length; _i++) {
                        var line = _a[_i];
                        if (!line)
                            continue;
                        var parsed = ts.pxtc.hexfile.parseHexRecord(line);
                        switch (parsed.type) {
                            case 0x00:
                                currAddr = (upperAddr << 16) | parsed.addr;
                                if ((currAddr >> 10) != (prevAddr >> 10))
                                    flush();
                                prevAddr = currAddr;
                                addData(hex2str([parsed.addr >> 8, parsed.addr & 0xff, dataType]
                                    .concat(parsed.data)));
                                break;
                            case 0x01:
                                //addData(hex2str([0x00, 0x00, 0x01]))
                                flush();
                                if (keepSrc)
                                    break;
                                else
                                    return;
                            case 0x04:
                                upperAddr = ((parsed.data[0] << 8) | parsed.data[1]) << 16;
                                break;
                            case 0x03:
                            case 0x05:
                                // ignore
                                break;
                            case 0x0E:
                                // src record
                                addData(hex2str([parsed.addr >> 8, parsed.addr & 0xff, 0x0E]
                                    .concat(parsed.data)));
                                break;
                            default:
                                pxtc.U.oops("unknown hex record type: " + line);
                                break;
                        }
                    }
                    flush();
                    function addData(newData) {
                        if (blk.length + newData.length > 512)
                            flush();
                        if (blk == "") {
                            blk = hex2str([0x00, 0x00, 0x04, upperAddr >> 24, (upperAddr >> 16) & 0xff])
                                + hex2str([0x00, 0x00, 0x0A].concat(deviceType));
                        }
                        blk += newData;
                    }
                    function flush() {
                        if (blk)
                            addBlock(blk);
                        blk = "";
                    }
                }
            };
        })(extension = pxtc.extension || (pxtc.extension = {}));
    })(pxtc = ts.pxtc || (ts.pxtc = {}));
})(ts || (ts = {}));
