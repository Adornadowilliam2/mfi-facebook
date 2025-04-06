import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Login from './Login';
import { insert, retrieve, update } from '../api/faq';
import { Box } from '@mui/system';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';

import $ from 'jquery';

export default function Home() {
    const user = useSelector((state) => state.auth.user);
    const [data, setData] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [editDialog, setEditDialog] = useState(null);
    const [addDialog, setAddDialog] = useState(false);
    const [selectedOption, setSelectedOption] = useState('general question');
    const [open, setOpen] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies();

    const options = [
        'general question',
        'short course',
        'dts program',
        'senior high',
        'gt foundation',
        'tesda-twsp',
        'others scholarship'
    ];
    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };
    const getFAQ = () => {
        retrieve(user).then((res) => {
            if (res?.ok) {
                setData(res.data);
            }
        });
    };

    useEffect(() => {
        getFAQ();
    }, []);


    const renderParagraphWithNewlines = (text) => {
        if (!text) return null;
        // Split text by \n and map each part to a <React.Fragment> with <br />
        return text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };




    const handleEdit = (id) => {
        const body = {
            question: editDialog.question,
            paragraph: editDialog.paragraph,
            enroll: editDialog.enroll,
            cta: editDialog.cta,
            program: editDialog.program
        };
        update(body, cookies.AUTH_TOKEN, id).then((res) => {
            if (res?.ok) {
                getFAQ();
                setEditDialog(null);
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        });
    };
    const handleAdd = () => {
        const body = {
            question: $('#question').val(),
            paragraph: $('#paragraph').val(),
            enroll: $('#enroll').val(),
            cta: $('#cta').val(),
            program: selectedOption
        };
        insert(body, cookies.AUTH_TOKEN).then((res) => {
            console.log(res);
            if (res?.ok) {
                getFAQ();
                setAddDialog(false);
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        });
    };

    const [showBtn, setShowBtn] = useState(false);
    const groupedData = data.reduce((acc, item) => {
        if (!acc[item.program]) {
            acc[item.program] = [];
        }
        acc[item.program].push(item);
        return acc;
    }, {});


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

    return (
        <>

            {user ? (
                <Box className='p-[2rem]'>
                    <Box sx={{ mb: 2 }}>
                        <Button color='info' variant='contained' onClick={() => setAddDialog(true)}>Add FAQ Question</Button>
                    </Box>
                    {Object.keys(groupedData).map((program, index) => (
                        <div key={index}>
                            <h3 className='uppercase text-black font-bold'>{program}</h3>
                            <ul>
                                {groupedData[program].map((item, itemIndex) => (
                                    <li key={itemIndex}>
                                        {itemIndex + 1}. {item.question}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}


                    <div>
                        {data.slice().reverse().map((item, index) => (
                            <Box key={item.id} id={'card' + index} className='bg-gray-50 mb-2'>
                                <h2
                                    className={`p-[10px] ${selectedIndex === index ? 'bg-green-400 text-black' : 'bg-blue-900 text-white'}`}
                                >
                                    {renderParagraphWithNewlines(item.question)}
                                </h2>
                                <Box className='p-2 text-black p'>
                                    <p className='text-lg mb-2'>
                                        {renderParagraphWithNewlines(item.paragraph)}
                                    </p>
                                    {item.enroll && (
                                        <p className="text-red-500 font-bold">{renderParagraphWithNewlines(item.enroll)}</p>
                                    )}
                                    {item.cta && <p>{item.cta}</p>}
                                </Box>
                                <Box>
                                    <Button color='warning' variant='contained' onClick={() => setEditDialog(item)}>
                                        Edit
                                    </Button>
                                </Box>
                            </Box>
                        ))}
                        <Dialog open={!!addDialog}>
                            <DialogTitle>Add FAQ Question</DialogTitle>
                            <DialogContent>
                                <TextField
                                    label="Question"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    required
                                    multiline
                                    minRows={2}
                                    maxRows={6}
                                    id='question'

                                />
                                <TextField
                                    label="Paragraph"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    required
                                    multiline
                                    minRows={4}
                                    maxRows={6}
                                    id='paragraph'
                                />
                                <TextField
                                    label="Enroll message"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    required
                                    multiline
                                    minRows={4}
                                    maxRows={6}
                                    id='enroll'
                                />
                                <TextField
                                    label="CTA"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    id='cta'
                                    required
                                />
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <InputLabel id="faq-select-label">FAQ Category</InputLabel>
                                    <Select
                                        labelId="faq-select-label"
                                        value={selectedOption}
                                        onChange={handleChange}
                                        label="FAQ Category"
                                    >
                                        {options.map((option, index) => (
                                            <MenuItem key={index} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </DialogContent>
                            <DialogActions>
                                <Button color='info' variant='contained' onClick={() => setAddDialog(false)}>Cancel</Button>
                                <Button color='success' variant='contained' onClick={() => handleAdd()}>Save</Button>
                            </DialogActions>
                        </Dialog>
                        {/* EDIt DIALOG */}
                        <Dialog open={!!editDialog}>
                            <DialogTitle>Edit FAQ Question</DialogTitle>
                            <DialogContent id="edit-form">
                                <TextField
                                    label="Question"
                                    variant="outlined"
                                    fullWidth
                                    value={editDialog?.question}
                                    onChange={(e) =>
                                        setEditDialog((prev) => ({
                                            ...prev,
                                            question: e.target.value,
                                        }))
                                    }
                                    sx={{ mt: 2 }}
                                    required
                                    multiline
                                    minRows={2}
                                    maxRows={6}
                                />
                                <TextField
                                    label="Paragraph"
                                    variant="outlined"
                                    fullWidth
                                    value={editDialog?.paragraph}
                                    onChange={(e) =>
                                        setEditDialog((prev) => ({
                                            ...prev,
                                            paragraph: e.target.value,
                                        }))
                                    }
                                    sx={{ mt: 2 }}
                                    required
                                    multiline
                                    minRows={4}
                                    maxRows={6}
                                />
                                <TextField
                                    label="Enroll message"
                                    variant="outlined"
                                    fullWidth
                                    value={editDialog?.enroll}
                                    onChange={(e) =>
                                        setEditDialog((prev) => ({
                                            ...prev,
                                            enroll: e.target.value,
                                        }))
                                    }
                                    sx={{ mt: 2 }}
                                    required
                                    multiline
                                    minRows={4}
                                    maxRows={6}
                                />
                                <TextField
                                    label="CTA"
                                    variant="outlined"
                                    fullWidth
                                    value={editDialog?.cta}
                                    onChange={(e) =>
                                        setEditDialog((prev) => ({
                                            ...prev,
                                            cta: e.target.value,
                                        }))
                                    }
                                    sx={{ mt: 2 }}
                                    required
                                />
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <InputLabel id="program-select-label">Program</InputLabel>
                                    <Select
                                        labelId="program-select-label"
                                        value={editDialog?.program || selectedOption}
                                        onChange={(e) =>
                                            setEditDialog((prev) => ({
                                                ...prev,
                                                program: e.target.value,
                                            }))
                                        }
                                        label="Program"
                                    >
                                        {options.map((option, index) => (
                                            <MenuItem key={index} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={() => setEditDialog(null)}
                                    color="primary"
                                    variant="contained"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => handleEdit(editDialog?.id)}
                                    color="warning"
                                    variant="contained"
                                >
                                    Edit
                                </Button>
                            </DialogActions>
                        </Dialog>

                        {/* Back to Top Button */}
                        {showBtn && (
                            <div className='bg-blue-900 fixed bottom-4 right-4'>
                                <Button
                                    sx={{ color: 'white', background: "#007bff" }}
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
                                <div>Course Inquiry: </div>
                                <br />
                                <hr />
                                <br />
                                <h1 className='font-bold'>Bulk Message Script</h1>
                                <br /><br />
                                <h2>Hey, future scholar! 👋</h2>
                                <p>Good news! We’ve got your details from the career talk you joined, and we’re super excited to have you in the loop! Thanks for your time and interest in our programs. </p>
                                <br />
                                <p>Our admissions are officially open, and if you’ve got questions or want to know more, hit us up anytime! 📲 Just message us at 0999-855-9880 (Smart) or 0945-398-7687 (Globe). We’re here to help you out! 💬</p>
                                <br />
                                <p>Let’s make your future happen! 🚀
                                </p>
                                <br />
                                <p>-MFI Polytechnic Institute Inc.</p>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpen(false)} color='primary' variant='contained'>
                                    Close
                                </Button>

                            </DialogActions>
                        </Dialog>

                    </div>
                </Box>
            ) : (
                <Login />
            )}
        </>
    );
}
