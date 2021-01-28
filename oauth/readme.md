# OAuth related artifacts

This section contains artifacts that can be used in the context of OAuth.

## Introspect

File: **oauth-api-introspect-proxy.yaml**

Sometimes the OAuth provider doesn't provide an introspect URL or doesn't provide all the token validation/revocation policies.
In that case, using an API Connect API as proxy provides a lot flexibility because all the required security policies can be implemented in such API definition.

Another use case is when the access token is a JWT token and you would like to validate on the gateway the signature of the token as well as the claims.
The OAuth 2.0 specification defines how external keys can be fetch from an OAuth 2.0 authorization server. The server can expose metadata which may provide the jwks uri: the referenced document contains the signing key(s) the client uses to validate signatures from the authorization server.

The API function is to validate the access token and return to the gateway a response back that tells if the token is still active and if it is the case for what scopes.

The payload returned should be in the form:
```json
{"active":"true","scope":"scope1 scope2"}
```

The example provided here performs the following:

- Extract the access token from the introspect call
- call the authorization server to fetch the JWK keys that will be used to validate the JWT signature
- validate the JWT signature
- create the response to the gateway using the JWT claims

If the JWT signature fails, an error is sent back to the gateway that will reject the access.

# Resources.  
I have writen some articles on OAuth in my [blog](https://prichelle.github.io/tags/#oauth)
