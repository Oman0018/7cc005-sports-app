const request = require('supertest'); // Import supertest for HTTP requests
const app = require('../app'); // Import the Express app
const connection = require('../config/db'); // Import database connection for cleanup

// Test suite for user-related routes
describe('User Routes', () => {
  // Cleanup the database before and after tests
  beforeAll((done) => {
    // Optionally, you can insert a dummy user into the database before the tests
    const query = 'DELETE FROM users WHERE username = "testuser"';
    connection.query(query, (err, results) => {
      if (err) throw err;
      done();
    });
  });

  afterAll((done) => {
    // Clean up the database after tests
    const query = 'DELETE FROM users WHERE username = "testuser"';
    connection.query(query, (err, results) => {
      if (err) throw err;
      done();
    });
  });

  // Test for user registration
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
        first_name: 'Test',
        last_name: 'User',
        role: 'user',
      });
    expect(response.status).toBe(201); // User should be created successfully
    expect(response.body).toHaveProperty('message', 'User registered successfully');
  });

  // Test for user login
  it('should log in a user and return a JWT token', async () => {
    // First, register the user (this could be refactored into a helper function)
    await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
        first_name: 'Test',
        last_name: 'User',
        role: 'user',
      });

    // Now, test login
    const response = await request(app)
      .post('/api/users/login')
      .send({
        username: 'testuser',
        password: 'password123',
      });

    expect(response.status).toBe(200); // Login should succeed
    expect(response.body).toHaveProperty('token'); // The response should contain a JWT token
  });

  // Test for login with incorrect credentials
  it('should return an error for incorrect login credentials', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        username: 'testuser',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(400); // Incorrect password should return 400
    expect(response.body).toHaveProperty('message', 'Invalid password');
  });

  // Test for accessing a protected route without authentication
  it('should return an error when accessing protected route without a token', async () => {
    const response = await request(app)
      .get('/api/users/profile') // Example protected route
      .send();

    expect(response.status).toBe(401); // No token should return 401 Unauthorized
    expect(response.body).toHaveProperty('message', 'Access denied. No token provided.');
  });

  // Test for accessing a protected route with a valid token
  it('should return user profile when accessing protected route with a valid token', async () => {
    // First, register and login the user to get a token
    const loginResponse = await request(app)
      .post('/api/users/login')
      .send({
        username: 'testuser',
        password: 'password123',
      });

    const token = loginResponse.body.token; // Get the JWT token from the response

    const profileResponse = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`); // Add the token to the Authorization header

    expect(profileResponse.status).toBe(200); // Successful access to the profile
    expect(profileResponse.body).toHaveProperty('username', 'testuser');
    expect(profileResponse.body).toHaveProperty('email', 'testuser@example.com');
  });
});
