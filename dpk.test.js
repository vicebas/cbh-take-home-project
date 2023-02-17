const { deterministicPartitionKey, MAX_PARTITION_KEY_LENGTH, TRIVIAL_PARTITION_KEY } = require("./dpk");
const crypto = require("crypto");

const generateBigString = (length) => {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let string = '';
  for (let i = 0; i < length; i++) {
    string += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return string;

};

describe("deterministicPartitionKey", () => {
  it("Returns the default TRIVIAL_PARTITION_KEY when given no input", () => {
    console.log(deterministicPartitionKey)
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe(TRIVIAL_PARTITION_KEY);
  });

  it("Returns the right key for a event", () =>{
    const event = 'testData'
    let checkKey = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
    if (checkKey.length > MAX_PARTITION_KEY_LENGTH) {
      checkKey = crypto.createHash("sha3-512").update(checkKey).digest("hex");
    }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(checkKey);
  })

  it("Returns the right key for the event with partitionKey", () =>{
    const event = { partitionKey: 'testData'}
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe('testData');
  })

  it("Returns a different key for the event with partitionKey greater than MAX_PARTITION_KEY_LENGTH", () =>{
    const event = { partitionKey: generateBigString(MAX_PARTITION_KEY_LENGTH+1)}
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).not.toBe(event.partitionKey);
  })

});
