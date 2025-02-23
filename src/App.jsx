import { Header } from "./components/Header"
import { Grid } from "./components/Grid"
import './App.css'

export function App() {
  return (
    <div>
      <Header/>

      <div className="grid-container">
        <Grid/>
      </div>
    </div>
  )
}