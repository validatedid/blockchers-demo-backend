# Diploma Backend

Development is still in progress.

Latest status:

To run this application in development mode:

1. `cp .env.dist .env`
2. `npm install`
3. `npm run start:dev`

To run this application into a production:

1. `docker-compose build`
2. `docker-compose up`

Swagger documentation for APIs can be found on: http://localhost:9000/universities/api-docs/

`/universities/bachelor-vp` and `/universities/master-vp` are used as callback URLs on what the wallet needs when one creates a presentation it is the subscriberURL

```
{
    “requester”: “did:ebsi:0xc9A8940Ab318d4d4631a86DcF9E0b9A3594214E5",
    “credentialTypeRequest”: “[[‘VerifiableCredential’, ‘EssifVerifiableID’]]“,
    “subscriberURL”: “/universities/bachelor-vp or /universities/master-vp”,
    “redirectURL”: “https://app.ebsi.xyz/demo/flemish-gov/issue-diploma”
}
```

Depending on the use case, `/universities/masters` or `/universities/bachelors` needs to be called. Both APIs require:

- Eva's bearer token in the Authorization
- Eva's DID in the body as JSON format: `{"did": "evadidgoeshere"}`
