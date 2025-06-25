"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var createPacket = function (data) {
    var uuid = (0, uuid_1.v4)();
    return {
        data: data,
        id: uuid,
    };
};
var tcpPacket = createPacket({
    src: "192.168.1.1",
    dst: "192.168.1.255",
    text: "Hello",
});
console.log("Packet source is: ".concat(tcpPacket.data.src));
var udpPacket = createPacket({ action: "Hello world" });
console.log("Packet action is: ".concat(udpPacket.data.action));
