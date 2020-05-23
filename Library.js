const path = require('path');
const url = require('url');
var fs = require('fs');
var querystring = require('querystring');

const NodeRSA = require('node-rsa');
const crypto = require('crypto');

var request = require('request');
process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;
const http = require('http')

const PROPOSAL_STORAGE = "storage/proposals/"
const BLOCK_STORAGE = "storage/block/"
const KEY_STORAGE = "storage/keys/"

/*
@name CompareObjects
@description
*/
class CompareObjects {
  constructor(obj1, obj2){
    let verdict = true
    Object.keys(obj1).forEach(el => {
      console.log("iteration:"+el)
      if(obj1[el] == obj2[el]){

      }else{
        verdict = false
      }
    })
    return verdict
  }
}

/*
@name GetBlockByID
@description
*/
class GetBlockByID {
  constructor(callback){
    const options = {
      hostname: '127.0.0.1',
      //hostname: '3.85.184.28',
      port: 8081,
      path: '/API/block/get/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength("TESTSTRING"),
        'User-Agent': "0",
        'Origin': "127.0.0.1:8082"
      },
      body: "TESTSTRING",
      insecureHTTPParser: true
    };

    const req = http.request(options, (res) => {
      res.setEncoding('utf8');

      res.on('data', (chunk) => {
        //console.log(`BODY: ${ chunk.toString('utf8')}`);
        //event.sender.send('latest_proposal_call_reply', { "Result":  chunk.toString('utf8') });
        callback( chunk.toString('utf8') )

      });

      res.on('end', () => {
        //console.log('No more data in response.');
      });
    });

    req.on('error', (e) => {
      if (e.message != "Parse Error"){
        console.log(e)
        console.error(`Parse Error: ${e.message}`);
      }
    });
    req.write("TESTSTRING");
    req.end();
  }
}

/*
@name GetLatestProposal
@description
*/
class GetLatestProposal {
  constructor(node_address, port, callback){
    console.log("NODE ADDRESS: "+node_address+":"+port)
    const options = {
      hostname: node_address,
      //hostname: '3.85.184.28',
      port: port,
      path: '/API/proposal/latest/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength("TESTSTRING"),
        'User-Agent': "NOT_USED",
        'Origin': "127.0.0.1:8082"
      },
      body: "TESTSTRING",
      insecureHTTPParser: true
    };

    const req = http.request(options, (res) => {
      //console.log("SAHJKHSAJSJSK")
      //console.log(`STATUS: ${res.statusCode}`);
      //console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');

      res.on('data', (chunk) => {
        //console.log(`BODY: ${ chunk.toString('utf8')}`);

        //event.sender.send('latest_proposal_call_reply', { "Result":  chunk.toString('utf8') });
        callback( chunk.toString('utf8') )

      });

      res.on('end', () => {
        //console.log('No more data in response.');
      });
    });

    req.on('error', (e) => {
      if (e.message != "Parse Error"){
        console.log(e)
        console.error(`Parse Error: ${e.message}`);
      }
    });
    req.write("TESTSTRING");
    req.end();
  }
}

/*
@name SubmitTransaction
@description
*/
class SubmitTransaction {
  constructor(state, callback){
    console.log("SubmitTransaction, NODE ADDRESS: ")
    console.log(state)

    let address_parts = state.global_state.global_state_ip_address.split(":")
    let transaction_type = state.txtype

    if (transaction_type == "ouput") {
      // TODO: hash the public key given
    }

    new Sign((function(signature){
      console.log("SIG CALLBACK: "+ signature)

      //let tx_segment =

      const options = {
        hostname: address_parts[0],
        //hostname: '3.85.184.28',
        port: address_parts[1],
        path: '/transaction/submit/output/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength("TESTSTRING"),
          'User-Agent': "NOT_USED",
          'Origin': "127.0.0.1:8082"
        },
        body: "TESTSTRING",
        insecureHTTPParser: true
      };

      const req = http.request(options, (res) => {
        //console.log("SAHJKHSAJSJSK")
        //console.log(`STATUS: ${res.statusCode}`);
        //console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');

        res.on('data', (chunk) => {
          //console.log(`BODY: ${ chunk.toString('utf8')}`);
          //event.sender.send('latest_proposal_call_reply', { "Result":  chunk.toString('utf8') });
          callback( chunk.toString('utf8') )
        });

        res.on('end', () => {
          //console.log('No more data in response.');
        });
      });

      req.on('error', (e) => {
        if (e.message != "Parse Error"){
          console.log(e)
          console.error(`Parse Error: ${e.message}`);
        }
      });
      req.write("TESTSTRING");
      req.end();


    }))


  }
}

/*
@name Sync
@description hold interval for fetching data
*/
class Sync {
  node_address = ""

  constructor(arg){
    console.log("Sync invoked")
    console.log(arg)
    this.node_address = arg.global_state_ip_address_interim
  }

  start_proposal_sync_interval(){
    console.log("start_proposal_sync_interval: "+this.node_address)

    let address_split = this.node_address.split(":")
    let node_address = address_split[0]
    let node_port = address_split[1]

    if (node_address != ""){
      setInterval((function(){

        new GetLatestProposal(node_address, node_port, (function(proposal_string){

          let proposal = JSON.parse(proposal_string)

          console.log(proposal)
          console.log(typeof(proposal))

          //TODO: error handling on parsing JSON
          new StoreProposal( proposal, function(write_result){
            console.log("DONE Writing: "+proposal.proposal_id+" - "+write_result)
          } )

        }))

      }), 30000)
    } else {
      console.error("Node Address is blank")
    }

  }

}

/*
@name
@description
*/
class StoreProposal {
  constructor(proposal){
    WriteProposal(proposal, function(result){
      console.log("StoreProposal: "+result)
    })
  }
}


/*
@name SavePrivateKey
@description
*/
class SavePrivateKey {
  constructor(key, callback){

    let PRIVATEKEY = key

    SavePrivKey(PRIVATEKEY, function(result){
      const hash = crypto.createHash('sha256');
      console.log(result)
      hash.update(result);
      console.log(hash)
      let hash_result = hash.digest('hex')
      hash.end()
      callback(hash_result)
    })
  }
}

/*
@name SavePrivKey
@description
*/
function SavePrivKey(private_key, callback){
  console.log("SavePrivKey: "+private_key)
  fs.writeFile(KEY_STORAGE+"private_key", private_key, function(err) {
    if(err) {
        return console.log(err);
        callback("ERROR")
    }
    console.log("The file was saved!");
    callback("SUCCESS")
  });
}


/*
@name SavePublicKey
@description
*/
class SavePublicKey {
  constructor(key, callback){

    let PUBLICKEY = key

    SavePubKey(PUBLICKEY, function(result){
      const hash = crypto.createHash('sha256');
      console.log(result)
      hash.update(result);
      console.log(hash)
      let hash_result = hash.digest('hex')
      hash.end()
      callback(hash_result)

    })
  }
}

/*
@name SavePubKey
@description
*/
function SavePubKey(public_key, callback){
  console.log("SavePubKey: "+public_key)
  fs.writeFile(KEY_STORAGE+"public_key", public_key, function(err) {
    if(err) {
        return console.log(err);
        callback("ERROR")
    }
    console.log("The public key was saved!");
    callback("SUCCESS")
  });
}


/*
@name Sign
@description
*/
class Sign {
  constructor(callback){
    SignMessage(function(signature){
      console.log("Signature inside SIGN: "+signature)
      callback(signature)
    })
  }
}


/*
@name SignMessage
@description
*/
function SignMessage(callback){

  // TODO: read private key
  let private_key = fs.readFileSync(KEY_STORAGE + "private_key").toString()
  console.log("READ PRIVATE KEY: "+private_key)

  //CONSTRUCT Key
  // const key = new NodeRSA('-----BEGIN RSA PRIVATE KEY-----\n'+
  //                   'MIIBOQIBAAJAVY6quuzCwyOWzymJ7C4zXjeV/232wt2ZgJZ1kHzjI73wnhQ3WQcL\n'+
  //                   'DFCSoi2lPUW8/zspk0qWvPdtp6Jg5Lu7hwIDAQABAkBEws9mQahZ6r1mq2zEm3D/\n'+
  //                   'VM9BpV//xtd6p/G+eRCYBT2qshGx42ucdgZCYJptFoW+HEx/jtzWe74yK6jGIkWJ\n'+
  //                   'AiEAoNAMsPqwWwTyjDZCo9iKvfIQvd3MWnmtFmjiHoPtjx0CIQCIMypAEEkZuQUi\n'+
  //                   'pMoreJrOlLJWdc0bfhzNAJjxsTv/8wIgQG0ZqI3GubBxu9rBOAM5EoA4VNjXVigJ\n'+
  //                   'QEEk1jTkp8ECIQCHhsoq90mWM/p9L5cQzLDWkTYoPI49Ji+Iemi2T5MRqwIgQl07\n'+
  //                   'Es+KCn25OKXR/FJ5fu6A6A+MptABL3r8SEjlpLc=\n'+
  //                   '-----END RSA PRIVATE KEY-----');

  const key = new NodeRSA(private_key)

  let buf = Buffer.from('TEST', 'utf8')
  //key.importKey(private_key, 'pkcs8');
  let signature = key.sign(buf, "base64", )

  console.log("Signature: "+signature)

  /*
  buffer — {buffer} — data for check, same as encrypt method.
  signature — {string} — signature for check, result of sign method.
  source_encoding — {string} — same as for encrypt method.
  signature_encoding — {string} — encoding of given signature. May be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
  */
  let verify = key.verify(buf, signature, "base64", "base64")

  console.log("VERIFICATION: "+verify)

  callback(signature)

}

/*
@name ReadProposal
@description read single proposal from disk
*/
function ReadProposal(proposal_id, callback){
  //var obj = JSON.parse(fs.readFileSync('file', 'utf8'));
  fs.readFile(PROPOSAL_STORAGE+proposal_id+'.proposal', 'utf8', function (err, data) {
    if (err) throw err;
    callback(data)
  });
}

function WriteProposal(proposal, callback){
  fs.writeFile(PROPOSAL_STORAGE+proposal.proposal_id+'.proposal', JSON.stringify(proposal), function(err) {
    if(err) {
        return console.log(err);
        callback("ERROR")
    }
    console.log("The file was saved!");
    callback("SUCCESS")
  });
}

/*
@name GetHighestProposalFromDisk
@description
*/
function GetHighestProposalFromDisk(callback){
  //iterate over reach
    // parse each file name

  fs.readdir(PROPOSAL_STORAGE, function(err, filenames) {

    if (err) {
      //onError(err);
      console.log(err)
      return;
    }

    var largest_proposal_id = -1
    var largest_proposal = {}

    filenames.forEach(function(filename) {

      //console.log("reading proposal: "+filename)

      try {
        let content = fs.readFileSync(PROPOSAL_STORAGE + filename).toString()

        try {

          let parsed_content = JSON.parse(content)
          //console.log(parsed_content)

          if (err) {
            console.log(err)
            return;
          }

          if (parsed_content["proposal_id"] > largest_proposal_id){
            largest_proposal_id = parsed_content["proposal_id"]
            largest_proposal = JSON.stringify(parsed_content)
          }else{
            //console.log("proposal_id NOT greater: "+parsed_content["proposal_id"]+ " --- largest: "+largest_proposal_id)
          }

        }catch(e2){
          console.error(e2)
        }

      }catch(e){
        console.error(e)
      }

    })


    console.log("largest_proposal")
    console.log(largest_proposal_id)
    console.log("=========================")
    callback(largest_proposal)

  });

}



module.exports = {
  CompareObjects,
  GetLatestProposal,
  SubmitTransaction,
  Sync,
  ReadProposal,
  WriteProposal,
  GetHighestProposalFromDisk,
  SavePublicKey,
  SavePrivateKey
}
