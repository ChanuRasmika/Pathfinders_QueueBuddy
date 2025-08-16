import { useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffffff;
  padding: 20px;
`

const LoginCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 48px 40px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  background-color: #ffffffff;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
`

const Title = styled.h1`
  font-size: 40px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
`

const Subtitle = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 0;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const FormTitle = styled.h2`
  font-size: 30px;
  font-weight: 780;
  color: #1f2937;
  margin: 0 0 24px 0;
`

const FormGroup = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
`

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  color: #1f2937;
  background-color: white;
  transition: border-color 0.2s ease;
  box-sizing: border-box;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`

const ForgotPasswordContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
`

const ForgotPasswordLink = styled.a`
  font-size: 14px;
  color: #3b82f6;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const LoginButton = styled.button`
  width: 100%;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: 24px;

  &:hover {
    background-color: #2563eb;
  }
`

const SignUpContainer = styled.div`
  text-align: center;
  font-size: 14px;
  color: #6b7280;
`

const SignUpLink = styled.a`
  color: #3b82f6;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login attempt:", { email, password })

    // ✅ Navigate to Home after login
    navigate("/home")
  }

  const handleForgotPassword = () => {
    console.log("Forgot password clicked")
  }

  return (
    <Container>
      <LoginCard>
        <Header>
          <Title>QueueBuddy</Title>
          <Subtitle>Sign in to your account</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          <FormTitle>Log In</FormTitle>

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>

          <ForgotPasswordContainer>
            <ForgotPasswordLink onClick={handleForgotPassword}>
              Forgot password?
            </ForgotPasswordLink>
          </ForgotPasswordContainer>

          <LoginButton type="submit">Log In</LoginButton>

          <SignUpContainer>
            {"Don't have an account? "}
            <SignUpLink onClick={() => navigate("/signup")}>Sign up</SignUpLink>
          </SignUpContainer>
        </Form>
      </LoginCard>
    </Container>
  )
}

export default Login
