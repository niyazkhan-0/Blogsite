import { LoginCard } from "../components/"
import { useTitle } from './../hooks/useTitle';

export const SignUpPage = () => {
  useTitle("varify your self")
  return (
    <main>
      <LoginCard/>
    </main>
  )
}
