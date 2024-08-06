const api = {
  authentication: {
    token: () => '/api/auth/token/',
    refreshToken: () => '/api/auth/refresh/',
    register: () => '/api/auth/register/',
    profile: () => '/api/auth/profile/',
  },
  chat: {
    chat: () => '/api/messages/',
    getConversations: () => '/api/conversations/',
    getConversation: (conversationId: string) => `/api/conversations/${conversationId}/`,
  }
}

export default api;
