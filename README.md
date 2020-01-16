# Diploma Backend

Development is still in progress.  

Latest status:  

Swagger documentation for APIs can be found on : http://localhost:3222/universities/api-docs/ 
after running `npm install` and `npm  run start:dev`

`/universities/bachelor-vp`  
 and   
`/universities/master-vp` are used as callback url on what the Wallet needs when one creates a presentation it is the subscriberURL    
```
{
    “requester”: “did:ebsi:0xc9A8940Ab318d4d4631a86DcF9E0b9A3594214E5",
    “credentialTypeRequest”: “[[‘VerifiableCredential’, ‘EssifVerifiableID’]]“,
    “subscriberURL”: “/universities/bachelor-vp or /universities/master-vp”,
    “redirectURL”: “https://app.ebsi.xyz/demo/flemish-gov/issue-diploma”
}
```

Depending on the use case  
`/universities/masters` or  
`/universities/bachelors` needs to be called. Both APIs require:  
- EVA bearer token in the Authorization  
- EVA DID in the body under json format {“did”: “evadidgoeshere”}  

