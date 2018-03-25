interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'qMuM8QnAu5RWUUGm8n4O1YvzCNVsKZxO',
  domain: 'rakeshnns.auth0.com',
  callbackURL: 'http://localhost:4200/callback'
};
