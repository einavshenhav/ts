import { v4 as uuidv4 } from 'uuid';

const createPacket = <Type>(data: Type): { data: Type, id: string} => {
    const uuid: string = uuidv4();
    return {
        data,
        id: uuid,
    };
};

const tcpPacket = createPacket({
src: "192.168.1.1",
dst: "192.168.1.255",
text: "Hello",
});
console.log(`Packet source is: ${tcpPacket.data.src}`);

const udpPacket = createPacket({ action: "Hello world" });
console.log(`Packet action is: ${udpPacket.data.action }`);
