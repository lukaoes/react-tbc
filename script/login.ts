export default async function Login(username: any, password: any) {
  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to login');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}
