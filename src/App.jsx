import { useState, useEffect } from 'react';
import './App.css';
import { data } from './data';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function App() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showBtn, setShowBtn] = useState(false); 


  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowBtn(true); 
    } else {
      setShowBtn(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const changeBoldText = (text) => {
    const regex = /\[([^\]]+)\]/g;

    return text.split(regex).map((part, index) => {
      if (index % 2 !== 0) {
        return <span key={index} className="font-bold">{part}</span>;
      }
      return part;
    });
  };

  const handleQuestionClick = (index) => {
    setSelectedIndex(index);
  };

  const [open, setOpen] = useState(false);

  return (
    <Box className='p-[2rem]'>
      <h1 className='text-3xl  bg-gray-700 text-white p-2'>FAQ Script Scenario in Facebook comments</h1>
      <p className='p-2'>Click the link to go to the script on how to answer it</p>
      <ol className='mb-2 text-2xl'>
        {data.map((item, index) => (
          <li key={index}>
            <a
              className='text-blue-600 '
              href={'#card' + index}
              onClick={() => handleQuestionClick(index)}
            >
              {index + 1}. <span className='underline'>{item.question}</span>
            </a>
          </li>
        ))}
      </ol>
      <Box>
        {data.map((item, index) => (
          <Box key={index} id={'card' + index} className='bg-gray-50 mb-2'>
            <h2
              className={`p-[10px] ${selectedIndex === index ? 'bg-green-300 text-black' : 'bg-blue-900 text-white'}`}
            >
              {item.question}
            </h2>
            <Box className='p-2 text-black'>
              <p className='text-lg mb-2'>
                {changeBoldText(item.paragraph)}
              </p>
              {item.enroll && (
                <p className="text-red-500 font-bold">{item.enroll}</p>
              )}
              {item.steps && (
                <>
                  {item.steps.map((step, stepIndex) => (
                    <div key={stepIndex}>{step}</div>
                  ))}
                </>
              )}
              {item.cta && <p>{item.cta}</p>}
              {item.alt && <p>{item.alt}</p>}
            </Box>
          </Box>
        ))}

        {/* Back to Top Button */}
        {showBtn && (
          <div className='bg-blue-900 fixed bottom-4 right-4'>
            <Button
              sx={{ color: 'white' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to Top
            </Button>
          </div>
        )}

        <div className='bg-green-900 fixed bottom-4 left-4'>
          <Button sx={{ color: 'white' }} onClick={() => setOpen(true)}>Open Message Script</Button>
        </div>

        <Dialog open={!!open}>
          <DialogTitle className='font-bold'>Script messenger</DialogTitle>
          <DialogContent>
            <h2>Could you kindly provide the following information for data purposes?</h2>
            <div>Full Name:</div>
            <div>Email Address:</div>
            <div>Contact Number:</div>
            <div>Course Inquiry: GT Foundation</div>
            <br />
            <hr />
            <br />
            <h1 className='font-bold'>Bulk Message Script</h1>
            <br /><br />
            <h2>Hey, future scholar! 👋</h2>
            <p>Good news! We’ve got your details from the career talk you joined, and we’re super excited to have you in the loop! Thanks for your time and interest in our programs. </p>
            <p>Our admissions are officially open, and if you’ve got questions or want to know more, hit us up anytime! 📲 Just message us at 0999-855-9880 (Smart) or 0945-398-7687 (Globe). We’re here to help you out! 💬</p>
            <p>Let’s make your future happen! 🚀
            </p>
            <p>-MFI Polytechnic Institute Inc.</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color='primary' variant='contained'>
              Close
            </Button>

          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default App;
