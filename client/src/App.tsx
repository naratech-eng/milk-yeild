
// import './App.css'
import MilkingListing from './components/lists/MilkingListing'
import { MilkingProvider } from './context/MilkingContext'

const App : React.FC = ()=> {
  

  return (
    <>
      <MilkingProvider>

        {/* <MilkingForm/> */}
          <h1 className=" flex text-center justify-center text-4xl py-5 mx-auto h-[60px]">Milk Yeild APP</h1>

        <MilkingListing />
      </MilkingProvider>
    </>
  )
}

export default App
