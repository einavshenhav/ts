import { v4 as uuidv4 } from 'uuid';

enum Protocol {
    UDP = "UDP", 
    TCP = "TCP",
    ICMP = "ICMP",
}

enum PacketSafety {
    LOW = "LOW",
    HIGH = "HIGH",
    NONE = "NONE",
}

interface PacketDetails {
    data: TCPData | UDPData | ICMPData
    protocol: Protocol,
    id: string,
}

interface TCPData {
    src: string, 
    dst: string, 
    sequence: number,
    text: string,
}

type UDPData = string;

interface ICMPData {
    action: string,
}

interface ParsedPacketDetails {
    content: string,
    safety: PacketSafety
}

interface Packet {
    packet: ParsedPacketDetails,
    contentLength: number,
}

const createPacket = <Type>(protocol: Protocol, data: Type): Packet => {
    const uuid: string = uuidv4();
    const packet = packetParser({ data, protocol, id: uuid })
    const contentLength = packet.content.length + packet.safety.length
    return {
        packet,
        contentLength
    };
};


const packetParser = <Type>(packet: PacketDetails): ParsedPacketDetails => {
    switch (packet.protocol) {
        case Protocol.UDP:
            return { content: String(packet.data), safety: PacketSafety.LOW };
        case Protocol.ICMP:
            return { content: `Action is ${packet.data.action}`, safety: PacketSafety.NONE };
        case Protocol.TCP:
            return {
                content: `From: ${packet.data.src}, To: ${packet.data.dst}, Text: ${packet.data.text}`,
                safety: PacketSafety.HIGH,
            };
    }
};


const tcpPacket = createPacket(Protocol.tcp, {src: "192.168.1.1", dst:
"192.168.1.255", text: "Hello"});
console.log(`Packet of protocol ${tcpPacket.protocol} with source
${tcpPacket.data.src}`);

const icmpPacket = createPacket(Protocol.icmp, { action: "PING" });
console.log(`Packet of protocol ${icmpPacket.protocol} with action
${icmpPacket.data.action}`);