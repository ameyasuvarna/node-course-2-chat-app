var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'Admin';
    var text = 'test message';
    var message = generateMessage(from, text);
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from, text});
  });
});

describe('generateLocationMessage', () => {
  it('should genrate correct location object', () => {
    var from = 'Harsha'
    var latitude = 15;
    var longitude = 19;
    var url = 'https://www.google.com/maps?q=15,19'
    var message = generateLocationMessage(from, latitude, longitude);
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from, url});
  });
});
