let UUID = {};

UUID.getUUIDv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

UUID.HASHLENGTH = 6;

UUID.getHash = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
    for (let i = 0; i < RDF4J.HASHLENGTH; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};

UUID.getHashDigits = (number) => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
    for (let i = 0; i < number; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};
