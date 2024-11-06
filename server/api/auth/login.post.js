export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const MOCK_USER = {
    username: 'admin',
    password: 'password'
  }

  if (body.username === MOCK_USER.username && 
      body.password === MOCK_USER.password) {
    return {
      token: 'mock_token',
      user: {
        username: body.username,
        role: 'admin'
      }
    }
  }

  throw createError({
    statusCode: 401,
    message: 'Invalid credentials'
  })
})
