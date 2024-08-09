
// import './App.css'
import MilkingForm from './components/MilkingForm.old'
import MilkingListing from './components/MilkingListing'

function App() {
  

  return (
    <>
      {/* <MilkingForm/> */}
        <h1 className=" flex text-center justify-center text-4xl py-5 mx-auto h-[60px]">Milk Yeild APP</h1>

      <MilkingListing milkingData={[]} />
    </>
  )
}

export default App
