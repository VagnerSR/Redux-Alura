import './App.css'
import Router from './routes'
import { createStandaloneToast } from '@chakra-ui/toast'

const { ToastContainer, toast } = createStandaloneToast();

function App() {

  return (
    <div className="App">
      <Router />
      <ToastContainer />
    </div>
  )
}

export default App
