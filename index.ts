import { v4 as uuidv4 } from 'uuid';

enum Protocol {
    udp = "UDP", 
    tcp = "TCP",
    icmp = "ICMP"
}

interface Packet<Type> {
    data: Type,
    protocol: Protocol,
    id: string,
}

const createPacket = <Type>(protocol: Protocol, data: Type): Packet<Type> => {
    const uuid: string = uuidv4();
    return {
        data,
        protocol,
        id: uuid,
    };
};

const tcpPacket = createPacket(Protocol.tcp, {src: "192.168.1.1", dst:
"192.168.1.255", text: "Hello"});
console.log(`Packet of protocol ${tcpPacket.protocol} with source
${tcpPacket.data.src}`);

const icmpPacket = createPacket(Protocol.icmp, { action: "PING" });
console.log(`Packet of protocol ${icmpPacket.protocol} with action
${icmpPacket.data.action}`);