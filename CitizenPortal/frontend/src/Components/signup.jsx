

import { useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  padding: 20px;
`

const SignupCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 48px 40px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  background-color: #ffffffff;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
`

const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
`

const Subtitle = styled.p`
  font-size: px;
  color: #6b7280;
  margin: 0;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const FormTitle = styled.h2`
  font-size: 25px;
  font-weight: 600;
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

const SignupButton = styled.button`
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
    background-color: #3b82f6;
  }

  &:active {
    background-color: #3b82f6;
  }
`

const LoginContainer = styled.div`
  text-align: center;
  font-size: 14px;
  color: #6b7280;
`

const LoginLink = styled.a`
  color: #3b82f6;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const SignUp = ({ onSwitchToLogin }) => {
    const navigate = useNavigate();
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    // Handle signup logic here
    console.log("Signup attempt:", { firstName, lastName, email, password })
  }

  return (
    <Container>
      <SignupCard>
        <Header>
          <Title>Create Account</Title>
          <Subtitle>Sign up to get started</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          <FormTitle>Sign Up</FormTitle>

          <FormGroup>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </FormGroup>

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

          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </FormGroup>

          <SignupButton type="submit">Sign Up</SignupButton>

          <LoginContainer>
            Already have an account?  <LoginLink onClick={() => navigate("/login")}>Log in</LoginLink>
          </LoginContainer>
        </Form>
      </SignupCard>
    </Container>
  )
}

export default SignUp
