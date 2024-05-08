import React, { useState } from 'react';

const App = () => {
  const [selectedColor, setSelectedColor] = useState('red'); // Initial state for selected color

  // Define a custom theme object based on the selected color
  const theme = {
    colors: {
      background: selectedColor,
      text: selectedColor === 'green' ? 'darkgreen' : `dark${selectedColor}`,
      button: selectedColor === 'green' ? 'darkgreen' : `dark${selectedColor}`,
    },
  };

  // Function to handle color change
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    <ThemeProvider theme={theme}>
      <ThemeApp selectedColor={selectedColor} handleColorChange={handleColorChange} />
    </ThemeProvider>
  );
};

const ThemeApp = ({ selectedColor, handleColorChange }) => {
  const theme = useTheme();

  return (
    <div>
      <Header>Color Theme Changer</Header>
      <Select
        label="Select Color"
        options={[
          { value: 'red', label: 'Red' },
          { value: 'green', label: 'Green' },
          { value: 'blue', label: 'Blue' },
        ]}
        value={selectedColor}
        onChange={(event) => handleColorChange(event.target.value)}
      />
      <Button>Submit</Button>
      <style jsx>{`
        div {
          background-color: ${theme.colors.background};
          color: ${theme.colors.text};
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
      `}</style>
    </div>
  );
};

export default App;
