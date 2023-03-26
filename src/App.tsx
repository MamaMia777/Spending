
import { useRef } from 'react'
import BarGraph from './components/barChart'
import data from '../data.json'
function App() {

  const totalSum = data.reduce(
    (total, current) => total + current.amount, 0
  )

  return (
    <>
      <div>
        <div className="bg-primary-red p-5 rounded-xl w-[400px] flex flex-row justify-between">
          <p className='text-[14px] text-[rgb(255,255,255)]'>My balance <br />
            <span className='text-[25px] font-bold'>$921.48</span>
          </p>
          <img src="/logo.svg" alt="logo" />
        </div>

        <div className="p-5 mt-10 bg-[rgb(255,255,255)] w-[400px] rounded-xl">
          <h2 className="font-bold mb-10 text-[28px]">Spending - Last 7 days</h2>
          {/* <BarGraph /> */}
          <BarGraph data={data} w={360} h={150} />
          <div className="flex mt-5 pt-5 flex-row justify-between border-t-[2px] border-primary-cyan">
            <p className='text-primary-cyan text-[14px]'>Total this month <br />
              <span className='font-bold text-[rgb(0,0,0)] text-[35px]'>${totalSum}</span>
            </p>

            <p className='text-right text-[14px] self-end'>+2.4%<br />
              <span className='text-primary-cyan  text-[14px] text-[hsl(27, 66%, 92%)]'>from last month</span>
            </p>

          </div>




        </div>

      </div>

    </>
  )
}

export default App
