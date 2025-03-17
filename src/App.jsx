import { useState, useEffect } from 'react';
import './App.css';
import { data } from './data';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function App() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showButton, setShowButton] = useState(false); // State to control button visibility

  // Scroll event handler
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowButton(true); // Show button if scrolled more than 100px
    } else {
      setShowButton(false); // Hide button if less than 100px
    }
  };

  // Hook to add scroll event listener when component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderBoldText = (text) => {
    const regex = /\[([^\]]+)\]/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
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
      <h1 className='text-3xl'>FAQ Script Scenario in Facebook comments</h1>
      <p>Click the link to go to the script on how to answer it</p>
      <ol className='mb-2 text-2xl'>
        {data.map((item, index) => (
          <li key={index}>
            <a
              className='text-blue-600 underline'
              href={'#card' + index}
              onClick={() => handleQuestionClick(index)}
            >
              {index + 1}. {item.question}
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
                {renderBoldText(item.paragraph)}
              </p>
              {item.enroll && (
                <p className="text-red-500 font-bold">{item.enroll}</p>
              )}
              {item.steps && (
                <ul>
                  {item.steps.map((step, stepIndex) => (
                    <li key={stepIndex}>{step}</li>
                  ))}
                </ul>
              )}
              {item.cta && <p>{item.cta}</p>}
              {item.alt && <p>{item.alt}</p>}
            </Box>
          </Box>
        ))}

        {/* Back to Top Button */}
        {showButton && (
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
          <DialogTitle>Script messenger</DialogTitle>
          <DialogContent>
            <h2>Could you kindly provide the following information for data purposes?</h2>
            <div>Full Name:</div>
            <div>Email Address:</div>
            <div>Contact Number:</div>
            <div>Course Inquiry: GT Foundation</div>
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
