export let server;

const BIN_ID = '68d55e17d0ea881f408ab477';
const API_KEY = '$2a$10$0KWaxLWyxJL91wYMv6GKbuVTvrCyY/.fsmTIKoGAF8qjrUsoYm3Yy';

server = (x, y, z) => {
  async function registerUser(code, pass, userName) {
    try {
      // 1. পুরোনো ডাটা fetch করা
      let res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: {
          'X-Master-Key': API_KEY,
        },
      });
      let json = await res.json();
      let data = json.record || [];

      // 2. কোড আগেই আছে কিনা check করা
      let exists = data.find((item) => item.code === code);
      if (exists) {
        alert('This code registered in previous');
        return 'This code registered in previous';
      }

      // 3. নতুন object push করা
      let newUser = { code, pass, userName };
      data.push(newUser);

      // 4. Update back to JSONBin
      await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': API_KEY,
        },
        body: JSON.stringify(data),
      });
      alert('New user registered successfully!');
      return 'New user registered successfully!';
    } catch (err) {
      console.error(err);
      return 'Error in registering user.';
    }
  }

  // Example call:
  //  console.log(x, y, z);
  registerUser(x, y, z).then(console.log);
};
