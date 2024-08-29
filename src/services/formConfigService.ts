// Fetch form config

export const loadFormConfig = async () => {
  // Import the formConfig.json file
  try {
    const response = await fetch('/formConfig.json');
    if (!response.ok) {
      throw new Error('Failed to load config - Network Response Error');
    }
    const config = await response.json();
    return config;
  } catch (error) {
    console.error('Failed to load form config:', error);
    throw error;
  }
};