import React, { useState,useEffect } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import Loader from './Loader';
import ImageComponent from './ImageComponent';

const StoryTeller = () => {
  const [inputs, setInputs] = useState({ prompt: '', genre: '', character: '', setting:'' });
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [image, setImage] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  let speechSynthesisUtterance;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const generateStory = async () => {
    setLoading(true);
    setError('');
    const fullPrompt = `Character: ${inputs.character}, Genre: ${inputs.genre}, Setting: ${inputs.setting}, Prompt: ${inputs.prompt}`;
    try {
      const response = await axios.post('http://localhost:3000/generateStory', { prompt: fullPrompt });
      setStory(response.data.story.content);
      setImage(response.data.image);
    } catch (err) {
      setError('An error occurred while generating the story. Please try again.');
    }
    setLoading(false);
  };

  const continueStory = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/generateStory', { prompt: story });
      setStory(prevStory => prevStory + " " + response.data.story.content);
    } catch (err) {
      setError('An error occurred while generating the continuation. Please try again.');
    }
    setLoading(false);
  };

  const playAudio = () => {
    if (story) {
      speechSynthesisUtterance = new SpeechSynthesisUtterance(story);
      speechSynthesis.speak(speechSynthesisUtterance);
      setIsSpeaking(true);
      setIsPaused(false);
    }
  };

  
  const pauseAudio = () => {
    if (isSpeaking && !isPaused) {
      speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeAudio = () => {
    if (isSpeaking && isPaused) {
      speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stopAudio = () => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  };

  // Cleanup effect to stop audio when component unmounts
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <Container maxWidth="sm">
        {loading && <Loader />}
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          
        </Typography>
        <TextField
          label="Enter a prompt"
          name="prompt"
          multiline
          rows={3}
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          label="Genre"
          name="genre"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          label="Main Character"
          name="character"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
        fullWidth
        margin="normal"
        label="Setting"
        variant="outlined"
        onChange={handleChange}
        />
        <Box my={2}>
          <Button variant="contained" color="primary" onClick={generateStory} fullWidth>
            Generate Story
          </Button>
        </Box>
        {!loading && error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        {!loading && story && (
        <Box mt={2}>
            {image && <img src={image} alt="Story Illustration" />}
            <Typography variant="body1" className="story-text">{story}</Typography>
            <Button variant="contained" color="secondary" onClick={playAudio} fullWidth>
              Listen to Story
            </Button>
            <Box my={2} display="flex" justifyContent="space-between">
              <Button variant="outlined" color="primary" onClick={pauseAudio}>
                Pause
              </Button>
              <Button variant="outlined" color="primary" onClick={resumeAudio} disabled={!isPaused}>
                Resume
              </Button>
              <Button variant="outlined" color="secondary" onClick={stopAudio}>
                Stop
              </Button>
            </Box>
            <Box my={2}>
              <Button variant="contained" color="primary" onClick={continueStory} fullWidth>
                Continue Story
              </Button>
            </Box>
        </Box>
        )}
        {/* Add ImageComponent here when the story includes an image */}
      </Box>
    </Container>
  );
};

export default StoryTeller;
